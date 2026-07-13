/* src/musicas/musicas.module.ts: */
import { Module } from '@nestjs/common';
import { MusicasService } from './musicas.service';
import { MusicasController } from './musicas.controller';

@Module({
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule { }
