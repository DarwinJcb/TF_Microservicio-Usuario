/* src/transmisiones/transmisiones.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaUsuariosModule } from '../prisma-usuarios/prisma-usuarios.module';
import { TransmisionesController } from './transmisiones.controller';
import { TransmisionesService } from './transmisiones.service';

@Module({
  imports: [PrismaUsuariosModule],
  controllers: [TransmisionesController],
  providers: [TransmisionesService],
})
export class TransmisionesModule {}
