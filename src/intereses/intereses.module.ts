/* src/intereses/intereses.module.ts */
import { Module } from '@nestjs/common';
import { PrismaUsuariosModule } from '../prisma-usuarios/prisma-usuarios.module';
import { InteresesController } from './intereses.controller';
import { InteresesService } from './intereses.service';

@Module({
  imports: [PrismaUsuariosModule],
  controllers: [InteresesController],
  providers: [InteresesService],
})
export class InteresesModule {}
