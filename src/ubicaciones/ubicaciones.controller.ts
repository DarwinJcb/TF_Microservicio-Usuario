/* src/ubicaciones/ubicaciones.controller.ts: */
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
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { UbicacionesService } from './ubicaciones.service';

@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @Post()
  create(@Body() createUbicacionDto: CreateUbicacionDto) {
    return this.ubicacionesService.create(createUbicacionDto);
  }

  @Get()
  findAll() {
    return this.ubicacionesService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.ubicacionesService.findByUsuario(idUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ubicacionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUbicacionDto: UpdateUbicacionDto,
  ) {
    return this.ubicacionesService.update(id, updateUbicacionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ubicacionesService.remove(id);
  }
}
