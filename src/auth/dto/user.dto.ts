import { IsEmail, IsNotEmpty, IsString, Length,  } from "class-validator"

export class UserDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string
    
    @IsString()
    @Length(4)
    password:string
}