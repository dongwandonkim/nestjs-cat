import { CatDto } from './dto/cat.dto';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { Serialize } from './interceptors/serialize.interceptor';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CatsService } from './cats.service';
import { createCatDto } from './dto/create-cat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatDto,
  })
  @Post('signup')
  @Serialize(CatDto)
  signUp(@Body() body: createCatDto) {
    return this.catService.signup(body);
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload img';
  }
}
