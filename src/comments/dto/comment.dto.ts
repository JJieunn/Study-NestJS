import { IsString, IsNumber, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class commentDTO {

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  readonly comment: string;
}