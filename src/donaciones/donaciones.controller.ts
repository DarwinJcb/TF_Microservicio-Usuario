/* src/donaciones/donaciones.controller.ts: */
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
import { DonacionesService } from './donaciones.service';
import { CreateDonacionDto } from './dto/create-donacion.dto';
import { UpdateDonacionDto } from './dto/update-donacion.dto';

@Controller('donaciones')
export class DonacionesController {
  constructor(private readonly donacionesService: DonacionesService) {}

  @Post()
  create(@Body() createDonacionDto: CreateDonacionDto) {
    return this.donacionesService.create(createDonacionDto);
  }

  @Get()
  findAll() {
    return this.donacionesService.findAll();
  }

  @Get('donante/:idUsuario')
  findByDonante(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.donacionesService.findByDonante(idUsuario);
  }

  @Get('receptor/:idUsuario')
  findByReceptor(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.donacionesService.findByReceptor(idUsuario);
  }

  @Get('transmision/:idTransmision')
  findByTransmision(
    @Param('idTransmision', ParseIntPipe)
    idTransmision: number,
  ) {
    return this.donacionesService.findByTransmision(idTransmision);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.donacionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDonacionDto: UpdateDonacionDto,
  ) {
    return this.donacionesService.update(id, updateDonacionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.donacionesService.remove(id);
  }
}
