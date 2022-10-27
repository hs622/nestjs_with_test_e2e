import { Injectable } from '@nestjs/common';
import { Bookmark, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, bookmark: Bookmark) {
    const bookmarkResponse = await this.prisma.bookmark.create({
      data: {
        userId: user.id,
        title: bookmark.title,
        description: bookmark.description,
        link: bookmark.link,
        published: bookmark.published,
      },
    });

    return bookmarkResponse;
  }
}
