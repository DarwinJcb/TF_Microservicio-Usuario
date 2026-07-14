/* src/fotos/fotos.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaUsuariosModule } from '../prisma-usuarios/prisma-usuarios.module';
import { FotosController } from './fotos.controller';
import { FotosService } from './fotos.service';

@Module({
  imports: [PrismaUsuariosModule],
  controllers: [FotosController],
  providers: [FotosService],
})
export class FotosModule {}
