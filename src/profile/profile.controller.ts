import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../middleware/guard/jwt.guard';
import { ProfileRequest } from '../request';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get()
  profile(@ProfileRequest() user: User) {
    return this.profileService.getUserProfile(user);
  }

  // @Post('create')
  // @UseGuards(JwtGuard)
  // create() {

  // }
}
