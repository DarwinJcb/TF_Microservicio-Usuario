/* tf_microservicio-usuarios/src/fotos/fotos.module.ts */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FotosController } from './fotos.controller';
import { FotosService } from './fotos.service';

@Module({
  imports: [PrismaModule],
  controllers: [FotosController],
  providers: [FotosService],
})
export class FotosModule {}
