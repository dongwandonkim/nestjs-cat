import { CatDto } from './dtos/cat.dto';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { Serialize } from './interceptors/serialize.interceptor';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CatsService } from './cats.service';
import { createCatDto } from './dtos/create-cat.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  @Serialize(CatDto)
  signUp(@Body() body: createCatDto) {
    return this.catService.signup(body);
  }
  @Post()
  login() {
    return 'login';
  }

  @Post()
  logout() {
    return 'logout';
  }
  @Post()
  uploadCatImg() {
    return 'upload img';
  }
}
