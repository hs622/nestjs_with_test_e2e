import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../middleware/guard/jwt.guard';
import { Bookmark } from './schema';

@Controller('bookmark')
export class BookmarkController {
  @Get()
  get(@Body() bookmarkId?: number) {
    console.log({
      bookmarkId,
    });

    return 'bookmarks';
  }

  @Post('create')
  @UseGuards(JwtGuard)
  store(@Body() bookmarkValidation: Bookmark) {
    console.log({
      bookmarkValidation,
    });

    return bookmarkValidation;
  }

  @Patch('update')
  @UseGuards(JwtGuard)
  update(@Body() bookmarkValidation: Bookmark) {
    console.log({
      bookmarkValidation,
    });

    return bookmarkValidation;
  }

  @Delete('remove')
  @UseGuards(JwtGuard)
  destory(@Body() bookmarkId?: number) {
    console.log({
      bookmarkId,
    });

    return bookmarkId;
  }
}
