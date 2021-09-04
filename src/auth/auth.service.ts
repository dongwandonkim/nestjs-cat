import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cats/cats.entity';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Cat) private catRepo: Repository<Cat>,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catRepo.findOne({ email: email });
    if (!cat) throw new BadRequestException('User information is not valid');

    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordCorrect) throw new UnauthorizedException('wrong password');

    const payload = { email, sub: cat.id };

    return { token: this.jwtService.sign(payload) };
  }
}
