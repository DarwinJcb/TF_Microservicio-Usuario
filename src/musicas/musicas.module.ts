/* src/musicas/musicas.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaUsuariosModule } from '../prisma-usuarios/prisma-usuarios.module';
import { MusicasController } from './musicas.controller';
import { MusicasService } from './musicas.service';

@Module({
  imports: [PrismaUsuariosModule],
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule {}
