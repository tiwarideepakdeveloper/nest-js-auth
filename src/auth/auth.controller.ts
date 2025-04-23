import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Get('profile')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('user:read')
    async userProfile(@Req() req){
        return req.user;
    }

    @Post('sign-in')
    async signIn(@Body() signInDto : SignInDto){
        return await this.authService.signInUser(signInDto);
    }
    
    @Post('sign-up')
    async signUp(@Body() signUpDto : SignUpDto){
        return await this.authService.createUser(signUpDto);
    }
}
