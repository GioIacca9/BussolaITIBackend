import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EdgeService } from './edge.service';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('maps/:mapId/edges')
@ApiTags('Archi') // Categoria per la documentazione
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  /**
   * Crea un nuovo arco
   * @param createVertexDto L'oggetto arco
   * @returns Niente
   */
  @Post()
  create(@Param('mapId') mapId: string, @Body() createEdgeDto: CreateEdgeDto) {
    return this.edgeService.create(mapId, createEdgeDto);
  }

  /**
   * Trova tutti gli archi
   * @returns Un'array contentente tutti gli archi
   */
  @Get()
  findAll(@Param('mapId') mapId: string) {
    return this.edgeService.findAll(mapId);
  }

  /**
   * Trova un arco specifico
   * @param id L'ID dell'arco
   * @returns L'oggeto arco
   */
  @Get(':id')
  findOne(@Param('mapId') mapId: string, @Param('id') id: number) {
    return this.edgeService.findOne(id, mapId);
  }

  /**
   * Aggiorna un arco e ritorna la nuova versione
   * @param id L'ID dell'arco
   * @param updateVertexDto L'oggetto arco (parziale) con i nuovi dati
   * @returns L'oggetto arco aggiornato
   */
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Param('mapId') mapId: string,
    @Body() updateEdgeDto: UpdateEdgeDto
  ) {
    return this.edgeService.update(id, mapId, updateEdgeDto);
  }

  /**
   * Rimuove un arco specifico
   * @param id L'ID del arci
   * @returns Niente
   */
  @Delete(':id')
  remove(@Param('id') id: number, @Param('mapId') mapId: string) {
    return this.edgeService.remove(id, mapId);
  }
}
