/* src/fotos/fotos.controller.ts: */
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
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { FotosService } from './fotos.service';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post()
  create(@Body() createFotoDto: CreateFotoDto) {
    return this.fotosService.create(createFotoDto);
  }

  @Get()
  findAll() {
    return this.fotosService.findAll();
  }

  @Get('usuario/:idUsuario')
  findByUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.fotosService.findByUsuario(idUsuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fotosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFotoDto: UpdateFotoDto,
  ) {
    return this.fotosService.update(id, updateFotoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fotosService.remove(id);
  }
}
