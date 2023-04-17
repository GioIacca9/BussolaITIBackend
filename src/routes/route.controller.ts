import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('maps/:id/routes')
@ApiTags('Itinerario') // Categoria per la documentazione
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  findAll() {
    return this.routeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }
}
