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
  constructor(
    private readonly routeService: RouteService,
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>
  ) {}

  @Get()
  findAll(): Route[] {
    return this.routeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Route {
    return this.routeService.findOne(id);
  }
}
