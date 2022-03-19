import { JwtGuard } from './guards/jwt.guard';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserEntity } from './models/user.entity';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory:()=>({
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:"1d"}
      })
  }),
   TypeOrmModule.forFeature([UserEntity])
],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
