import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    user_first_name: string;

    @IsOptional()
    @IsString()
    user_last_name: string;

    @IsEmail()
    @IsString()
    user_email: string;

    @IsPhoneNumber()
    @IsString()
    user_phone_number: string;

    @IsStrongPassword()
    @IsString()
    user_password: string;
}