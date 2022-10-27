import { Module } from '@nestjs/common';
import { CheckJwtAuthService } from '../middleware/jwt';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, CheckJwtAuthService],
})
export class BookmarkModule {}
