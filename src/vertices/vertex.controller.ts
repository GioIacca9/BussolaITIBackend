import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { VertexService } from './vertex.service';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { UpdateVertexDto } from './dto/update-vertex.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('maps/:mapId/vertices')
@ApiTags('Vertici') // Categoria per la documentazione
export class VertexController {
  constructor(private readonly vertexService: VertexService) {}

  /**
   * Crea un nuovo vertice
   * @param createVertexDto L'oggetto vertice
   * @returns Niente
   */
  @Post()
  async create(
    @Param('mapId') mapId: string,
    @Body() createVertexDto: CreateVertexDto
  ) {
    return await this.vertexService.create(mapId, createVertexDto);
  }

  /**
   * Trova tutti i vertici
   * @returns Un'array contentente tutti i vertici
   */
  @Get()
  findAll(@Param('mapId') mapId: string) {
    return this.vertexService.findAll();
  }

  /**
   * Trova un vertice specifico
   * @param id L'ID del vertice
   * @returns L'oggeto vertice
   */
  @Get(':id')
  findOne(@Param('id') id: number, @Param('mapId') mapId: string) {
    return this.vertexService.findOne(id, mapId);
  }

  /**
   * Aggiorna un vertice e ritorna la nuova versione
   * @param id L'ID del vertice
   * @param updateVertexDto L'oggetto vertice (parziale) con i nuovi dati
   * @returns L'oggetto vertice aggiornato
   */
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Param('mapId') mapId: string,
    @Body() updateVertexDto: UpdateVertexDto
  ) {
    return this.vertexService.update(id, mapId, updateVertexDto);
  }

  /**
   * Rimpiazza un vertice e ritorna la nuova versione
   * @param id L'ID del vertice
   * @param updateVertexDto L'oggetto vertice (parziale) con i nuovi dati
   * @returns L'oggetto vertice aggiornato
   */
  @Put(':id')
  replace(
    @Param('id') id: number,
    @Param('mapId') mapId: string,
    @Body() createVertexDto: CreateVertexDto
  ) {
    return this.vertexService.replace(id, mapId, createVertexDto);
  }

  /**
   * Rimuove un vertice specifico
   * @param id L'ID del vertice
   * @returns Niente
   */
  @Delete(':id')
  remove(@Param('id') id: number, @Param('mapId') mapId: string) {
    return this.vertexService.remove(id, mapId);
  }
}
