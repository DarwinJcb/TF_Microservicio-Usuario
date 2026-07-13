/* src/intereses/intereses.module.ts: */
import { Module } from '@nestjs/common';
import { InteresesService } from './intereses.service';
import { InteresesController } from './intereses.controller';

@Module({
  controllers: [InteresesController],
  providers: [InteresesService],
})
export class InteresesModule { }
