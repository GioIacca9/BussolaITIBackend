import { Controller, Get, Param } from '@nestjs/common';
import { RouteService } from './route.service';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from 'src/edges/entities/edge.entity';
import { Route } from './entities/route.entity';

@Controller('maps/:id/routes')
@ApiTags('Itinerario') // Categoria per la documentazione
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  async findAll(): Promise<Route[]> {
    return await this.routeService.findAll();
  }

  @Get(':startVertexId/:endVertexId')
  async findOne(
    @Param('startVertexId') startVertexId: number,
    @Param('endVertexId') endVertexId: number
  ): Promise<Route> {
    return await this.routeService.findOne(startVertexId, endVertexId);
  }
}
