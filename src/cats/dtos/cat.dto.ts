import { Expose } from 'class-transformer';

export class CatDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
