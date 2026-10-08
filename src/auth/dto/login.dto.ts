import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  /**
   * Admin email — must exist in dbo.Users with IsActive = true
   * @example "admin@aseza.com"
   */
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty()
  email: string;

  /**
   * Admin password (at least 6 characters)
   * @example "P@ssw0rd123"
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;
}
