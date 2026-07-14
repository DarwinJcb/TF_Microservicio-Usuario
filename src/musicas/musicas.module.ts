/* tf_microservicio-usuarios/src/musicas/musicas.module.ts */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MusicasController } from './musicas.controller';
import { MusicasService } from './musicas.service';

@Module({
  imports: [PrismaModule],
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule {}
