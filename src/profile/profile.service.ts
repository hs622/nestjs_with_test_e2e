import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(user: any) {
    const getProfile = await this.prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });
    return getProfile;
  }
}
