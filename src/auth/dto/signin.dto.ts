import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    user_email: string;

    @IsString()
    @IsNotEmpty()
    user_password: string;
}