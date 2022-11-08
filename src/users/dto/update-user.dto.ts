import { IsString, MinLength } from 'class-validator'
export class UpdateUserDTO {

  @IsString()
  readonly password?: string;

  @IsString()
  readonly nickname?: string;

  @IsString()
  readonly phone_number?: string;
}