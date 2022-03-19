import { AuthService } from './../services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('register')
    register(@Body() user:User): Promise<User>{
        return this.authService.registerAccount(user)
    }

    @Post('login')
    login(@Body() user: User):Promise<{token:string}>{
        return this.authService.login(user)
    }
}
