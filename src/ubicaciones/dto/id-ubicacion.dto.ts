import { IsInt, Min } from 'class-validator';

export class IdUbicacionDto {
  @IsInt()
  @Min(1)
  IdUbicacion: number;
}
