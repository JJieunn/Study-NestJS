import { IsNotEmpty, IsString, IsNumber, MinLength, MaxLength } from 'class-validator';

export class CreatePostDTO {

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1500)
  readonly content: string;

  readonly image_url?: string;
}