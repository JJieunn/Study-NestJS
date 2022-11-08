import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
export class SignInUserDTO {

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches( /^[a-zA-Z0-9.*^!@#]+$/, {message: "Password_Unavailable"})
  readonly password: string;
}