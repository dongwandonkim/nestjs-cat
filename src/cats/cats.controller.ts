import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login-request.dto';
import { AuthService } from '../auth/auth.service';
import { CatDto } from './dto/cat.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from './interceptors/serialize.interceptor';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CatsService } from './cats.service';
import { createCatDto } from './dto/create-cat.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentCat } from './decorators/cat.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private catService: CatsService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: '내정보' })
  @ApiBearerAuth('JWT-auth')
  @Serialize(CatDto)
  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentCat() cat: CatDto) {
    return cat;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatDto,
  })
  @Post('/signup')
  @Serialize(CatDto)
  signUp(@Body() body: createCatDto) {
    return this.catService.signup(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogin(body);
  }

  @ApiOperation({ summary: '사진 업로드' })
  @UseInterceptors(FilesInterceptor('image'))
  @Post('/upload')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return 'upload img';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  test() {
    return '하이';
  }
}
