/* src/intereses/dto/id-interes.dto.ts: */
import { IsInt, Min } from 'class-validator';

export class IdInteresDto {
  @IsInt()
  @Min(1)
  IdInteres: number;
}
