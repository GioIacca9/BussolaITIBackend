import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { ApiTags } from '@nestjs/swagger';
import { Map } from './entities/map.entity';

@Controller('maps')
@ApiTags('Mappa') // Categoria per la documentazione
export class MapController {
  constructor(private readonly mapService: MapService) {}

  /**
   * Crea una nuova mappa
   * @param createMapDto Mappa da creare
   * @returns L'ID della mappa
   */
  @Post()
  async create(@Body() createMapDto: CreateMapDto): Promise<string> {
    return await this.mapService.create(createMapDto);
  }

  @Get()
  async findAll(): Promise<Map[]> {
    return await this.mapService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Map> {
    return await this.mapService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
    return this.mapService.update(id, updateMapDto);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() createMapDto: CreateMapDto) {
    return this.mapService.replace(id, createMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapService.remove(id);
  }
}
