import { UserEntity } from 'src/auth/models/user.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Observable, from, switchMap } from 'rxjs';
import { User } from '../models/user.interface';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  // hashPassword(password:string):Observable<string>{
  //     return from(bcrypt.hash(password,12))
  // }

  async registerAccount(user: User): Promise<User> {
    try {
      let { firstName, lastName, email, password } = user;
      let checkEmail=this.userRepository.findOne({
        where:{
          email
        }
      })
      if(checkEmail) throw new ForbiddenException({error:"User with this email already exists"})
      password = await this.hashPassword(password);
      let newUser = await this.userRepository.save({
        firstName,
        lastName,
        email,
        password,
      });
      return newUser;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async validateUser(email: string, password: string) :Promise<User> {
    let validAcc = await this.userRepository.findOne(
      { email },
      { select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'] },
    );
    if (!validAcc) throw new ForbiddenException('Invalid email or password');
    let validPass = await bcrypt.compare(password, validAcc.password);
    if (!validPass) throw new ForbiddenException('Invalid email or password');
    delete validAcc.password
    return validAcc;
  }

  async login(user: User) : Promise<{token:string}>{
    const {email, password}=user
    let validUser=await this.validateUser(email,password)
    let payload={...validUser}
    let token = this.jwtService.sign({user:payload})
    return {token}
  }
}
