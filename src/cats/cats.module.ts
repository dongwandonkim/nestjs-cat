import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './cats.entity';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    AuthModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
