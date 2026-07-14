/* tf_microservicio-usuarios/src/donaciones/donaciones.module.ts: */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DonacionesController } from './donaciones.controller';
import { DonacionesService } from './donaciones.service';

@Module({
  imports: [PrismaModule],
  controllers: [DonacionesController],
  providers: [DonacionesService],
})
export class DonacionesModule {}
