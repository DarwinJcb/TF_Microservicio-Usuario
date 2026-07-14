/* src/transmisiones/transmisiones.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransmisionesController } from './transmisiones.controller';
import { TransmisionesService } from './transmisiones.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransmisionesController],
  providers: [TransmisionesService],
})
export class TransmisionesModule {}
