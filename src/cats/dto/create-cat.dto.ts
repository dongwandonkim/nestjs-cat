import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class createCatDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'myPassword',
    description: 'password',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'john doe',
    description: 'name',
    required: true,
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'russian blue',
    description: 'species',
    required: true,
  })
  @IsString()
  species: string;
}
