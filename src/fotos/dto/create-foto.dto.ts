/* src/fotos/dto/create-foto.dto.ts: */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFotoDto {
  @IsString()
  @IsNotEmpty()
  urlFoto: string;

  @IsInt()
  UsuarioFK: number;
}
