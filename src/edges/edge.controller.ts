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
import { Edge } from './entities/edge.entity';
import { Vertex } from 'src/vertices/entities/vertex.entity';

@Controller('maps/:mapId/edges')
@ApiTags('Archi') // Categoria per la documentazione
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  /**
   * Crea un nuovo arco
   * @param createVertexDto L'oggetto arco
   * @returns L'ID dell'arco appena creato
   */
  @Post()
  async create(
    @Param('mapId') mapId: string,
    @Body() createEdgeDto: CreateEdgeDto
  ): Promise<number> {
    return await this.edgeService.create(mapId, createEdgeDto);
  }

  /**
   * Trova tutti gli archi
   * @returns Un'array contentente tutti gli archi
   */
  @Get()
  async findAll(@Param('mapId') mapId: string): Promise<Edge[]> {
    return await this.edgeService.findAll(mapId);
  }

  /**
   * Trova un arco specifico
   * @param id L'ID dell'arco
   * @returns L'oggeto arco richiesto
   */
  @Get(':id')
  async findOne(
    @Param('mapId') mapId: string,
    @Param('id') id: number
  ): Promise<Edge> {
    return await this.edgeService.findOne(id, mapId);
  }

  /**
   * Aggiorna un arco e ritorna la nuova versione
   * @param id L'ID dell'arco
   * @param updateVertexDto L'oggetto arco (parziale) con i nuovi dati
   * @returns Niente
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
   * @param id L'ID del archi
   * @returns Niente
   */
  @Delete(':id')
  remove(@Param('id') id: number, @Param('mapId') mapId: string) {
    return this.edgeService.remove(id, mapId);
  }
}
