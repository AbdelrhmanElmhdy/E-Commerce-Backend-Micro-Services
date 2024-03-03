import { IsAlpha, IsEmail, IsStrongPassword, Length } from 'class-validator';

class RegisterRequestBody {
  @IsAlpha()
  @Length(3, 40)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 })
  password: string;
}

export default RegisterRequestBody;
