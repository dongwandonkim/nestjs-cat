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
  ],

  providers: [AuthService, Cat],
})
export class AuthModule {}
