import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CatDto {
  @ApiProperty({
    example: '1',
    description: 'id',
    required: true,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'test@test@com',
    description: 'email',
    required: true,
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: 'john doe',
    description: 'name',
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'russian blue',
    description: 'species',
    required: true,
  })
  @Expose()
  species: string;
}
