import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('sign-in')
    signIn(@Body() signInDto : SignInDto){
        console.log(signInDto);
        return [];
    }
    
    @Post('sign-up')
    async signUp(@Body() signUpDto : SignUpDto){
        return await this.authService.createUser(signUpDto);
    }
}
