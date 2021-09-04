import { JwtStrategy } from './jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Cat } from 'src/cats/cats.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'cookieAndCream',
      signOptions: { expiresIn: '1y' },
    }),
    TypeOrmModule.forFeature([Cat]),
  ],

  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
