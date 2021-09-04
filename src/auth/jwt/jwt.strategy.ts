import { Cat } from './../../cats/cats.entity';
import { Payload } from './jwt.payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Cat) private catRepo: Repository<Cat>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'cookieAndCream',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catRepo.findOne({ id: payload.sub });
    if (!cat) throw new UnauthorizedException('접근 오류');
    return cat;
  }
}
