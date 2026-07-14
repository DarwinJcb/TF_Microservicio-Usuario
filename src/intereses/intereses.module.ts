/* src/intereses/intereses.module.ts */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { InteresesController } from './intereses.controller';
import { InteresesService } from './intereses.service';

@Module({
  imports: [PrismaModule],
  controllers: [InteresesController],
  providers: [InteresesService],
})
export class InteresesModule {}
