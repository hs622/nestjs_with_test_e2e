import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CheckJwtAuthService } from '../middleware/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, CheckJwtAuthService],
})
export class AuthModule {}
