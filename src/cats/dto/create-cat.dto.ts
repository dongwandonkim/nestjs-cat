import { IsString, IsEmail, MinLength } from 'class-validator';

export class createCatDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  species: string;
}
