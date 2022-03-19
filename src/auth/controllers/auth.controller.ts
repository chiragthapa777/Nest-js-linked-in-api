import { AuthService } from './../services/auth.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @UsePipes(new ValidationPipe())
    @Post('register')
    register(@Body() user:UserDto): Promise<User>{
        return this.authService.registerAccount(user)
    }

    @Post('login')
    login(@Body() user: User):Promise<{token:string}>{
        return this.authService.login(user)
    }
}
