import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Bookmark {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  descrption: string;

  @IsString()
  link: string;

  @IsBoolean()
  published: boolean;
}
