/* src/fotos/dto/id-foto.dto.ts: */
import { IsInt, Min } from 'class-validator';

export class IdFotoDto {
  @IsInt()
  @Min(1)
  IdFoto: number;
}
