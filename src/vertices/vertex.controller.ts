import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VertexService } from './vertex.service';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { UpdateVertexDto } from './dto/update-vertex.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@Controller('maps/:id/vertices')
@ApiTags('Vertici') // Categoria per la documentazione
export class VertexController {
  constructor(private readonly vertexService: VertexService) {}

  /**
   * Crea un nuovo vertice
   * @param createVertexDto L'oggetto vertice
   * @returns Niente
   */
  @Post()
  create(@Body() createVertexDto: CreateVertexDto) {
    return this.vertexService.create(createVertexDto);
  }

  /**
   * Trova tutti i vertici
   * @returns Un'array contentente tutti i vertici
   */
  @Get()
  findAll() {
    return this.vertexService.findAll();
  }

  /**
   * Trova un vertice specifico
   * @param id L'ID del vertice
   * @returns L'oggeto vertice
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vertexService.findOne(+id);
  }

  /**
   * Aggiorna un vertice e ritorna la nuova versione
   * @param id L'ID del vertice
   * @param updateVertexDto L'oggetto vertice (parziale) con i nuovi dati
   * @returns L'oggetto vertice aggiornato
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVertexDto: UpdateVertexDto) {
    return this.vertexService.update(+id, updateVertexDto);
  }

  /**
   * Rimuove un vertice specifico
   * @param id L'ID del vertice
   * @returns Niente
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vertexService.remove(+id);
  }
}
