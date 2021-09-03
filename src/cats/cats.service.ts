import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createCatDto } from './dtos/create-cat.dto';
import { Cat } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepo: Repository<Cat>) {}
  async signup(catDto: createCatDto) {
    const { email } = catDto;
    const isCatExist = await this.catRepo.find({ email });
    if (isCatExist.length) throw new BadRequestException('email in use');

    const hashedPassword = await bcrypt.hash(catDto.password, 10);

    const cat = this.catRepo.create(catDto);
    cat.password = hashedPassword;

    return this.catRepo.save(cat);
  }
}
