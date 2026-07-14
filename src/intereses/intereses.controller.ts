/* src/intereses/intereses.controller.ts */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInteresDto } from './dto/create-interes.dto';
import { UpdateInteresDto } from './dto/update-interes.dto';
import { InteresesService } from './intereses.service';

@Controller('intereses')
export class InteresesController {
  constructor(private readonly interesesService: InteresesService) {}

  @Post()
  create(@Body() createInteresDto: CreateInteresDto) {
    return this.interesesService.create(createInteresDto);
  }

  @Get()
  findAll() {
    return this.interesesService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.interesesService.findByUsuario(idUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.interesesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInteresDto: UpdateInteresDto,
  ) {
    return this.interesesService.update(id, updateInteresDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interesesService.remove(id);
  }
}
