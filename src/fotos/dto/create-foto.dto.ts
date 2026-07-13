/* src/fotos/dto/create-foto.dto.ts: */
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFotoDto {
  @IsString()
  @IsNotEmpty()
  urlFoto: string;

  @IsInt()
  @Min(1)
  UsuarioFK: number;
}
