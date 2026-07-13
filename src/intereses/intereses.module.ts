/* src/intereses/intereses.module.ts: */
import { Module } from '@nestjs/common';
import { InteresesService } from './intereses.service';
import { InteresesController } from './intereses.controller';

@Module({
    providers: [InteresesService],
    controllers: [InteresesController]
})
export class InteresesModule { }
