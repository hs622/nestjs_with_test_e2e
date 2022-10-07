import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as argon from 'argon2';
import { Register, Login } from './schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(RegisterReq: Register) {
    const hash = await argon.hash(RegisterReq.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: RegisterReq.firstName,
          lastName: RegisterReq.lastName,
          email: RegisterReq.email,
          hash,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');

      throw error;
    }
  }

  async login(LoginReq: Login) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: LoginReq.email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid Credentials.');

    const pwdMatches = await argon.verify(user.hash, LoginReq.password);
    if (!pwdMatches) throw new ForbiddenException('Invalid Credentials');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
