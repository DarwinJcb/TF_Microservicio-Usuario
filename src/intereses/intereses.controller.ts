/* src/intereses/intereses.controller.ts: */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteresesService } from './intereses.service';
import { CreateInteresDto } from './dto/create-interes.dto';
import { UpdateInteresDto } from './dto/update-interes.dto';

@Controller('intereses')
export class InteresesController {
  constructor(private readonly interesesService: InteresesService) { }

  @Post()
  create(@Body() createInteresDto: CreateInteresDto) {
    return this.interesesService.create(createInteresDto);
  }

  @Get()
  findAll() {
    return this.interesesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interesesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntereseDto: UpdateInteresDto) {
    return this.interesesService.update(+id, updateIntereseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interesesService.remove(+id);
  }
}
