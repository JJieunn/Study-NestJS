import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator'
export class CreateUserDTO {

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches( /^[a-zA-Z0-9.*^!@#]+$/, {message: "Password_Unavailable"})
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(12)
  readonly nickname: string;

  @IsString()
  @Matches(/^010-[0-9]{4}-[0-9]{4}$/g, {message: "Phone_Number_Unavailable"})
  readonly phone_number: string;
}