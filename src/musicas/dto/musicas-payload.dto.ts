/* src/musicas/dto/musicas-payload.dto.ts */
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min, ValidateNested } from 'class-validator';
import { UpdateMusicaDto } from './update-musica.dto';

export class IdMusicaPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdMusica: number;
}

export class IdUsuarioMusicasPayloadDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  IdUsuario: number;
}

export class ActualizarMusicaPayloadDto extends IdMusicaPayloadDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateMusicaDto)
  datosMusica: UpdateMusicaDto;
}
