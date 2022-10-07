import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../../src/middleware/guard/jwt.guard';
import { ProfileRequest } from '../../src/request';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtGuard)
  profile(@ProfileRequest() user: User) {
    return this.profileService.getUserProfile(user);
  }

  @Post('create')
  @UseGuards(JwtGuard)
  create() {
    
  }
}
