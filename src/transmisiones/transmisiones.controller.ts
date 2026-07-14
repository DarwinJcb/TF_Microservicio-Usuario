/* src/transmisiones/transmisiones.controller.ts: */
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
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';
import { TransmisionesService } from './transmisiones.service';

@Controller('transmisiones')
export class TransmisionesController {
  constructor(private readonly transmisionesService: TransmisionesService) {}

  @Post()
  create(@Body() createTransmisionDto: CreateTransmisionDto) {
    return this.transmisionesService.create(createTransmisionDto);
  }

  @Get()
  findAll() {
    return this.transmisionesService.findAll();
  }

  @Get('live')
  findLive() {
    return this.transmisionesService.findLive();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.transmisionesService.findByUsuario(idUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transmisionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransmisionDto: UpdateTransmisionDto,
  ) {
    return this.transmisionesService.update(id, updateTransmisionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transmisionesService.remove(id);
  }
}
