import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapService } from 'src/maps/map.service';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { UpdateVertexDto } from './dto/update-vertex.dto';
import { Vertex } from './entities/vertex.entity';
import { Map } from 'src/maps/entities/map.entity';

@Injectable()
export class VertexService {
  constructor(private mapService: MapService) {}

  static notFoundError: string = 'Il vertice richiesto non è stato trovato';
  static alreadyExistsError: string =
    'Esiste già un vertice con lo stesso identificativo';

  async create(mapId: string, createVertexDto: CreateVertexDto) {
    if (await this.exists(createVertexDto.id, mapId)) {
      throw new Error(VertexService.alreadyExistsError);
    }
    (await this.mapService.findOne(mapId)).vertices.push(createVertexDto);
    this.mapService.writeSaveFile();
  }

  async findAll(mapId: string) {
    return (await this.mapService.findOne(mapId)).vertices;
  }

  async exists(id: string, mapId: string) {
    try {
      await this.findOne(id, mapId);
      return true;
    } catch (_e) {
      // Viene lanciata un'HttpException se il vertice non esiste
      return false;
    }
  }

  async findOne(id: string, mapId: string) {
    let vertices = (await this.mapService.findOne(mapId)).vertices;
    let vertex = vertices.find((vertex: Vertex) => {
      return vertex.id == id;
    });
    if (!vertex) {
      throw new HttpException(
        VertexService.notFoundError,
        HttpStatus.NOT_FOUND
      );
    }
    return vertex;
  }

  async update(id: string, mapId: string, updateVertexDto: UpdateVertexDto) {
    let mapIndex = (await this.mapService.findAll()).findIndex((map: Map) => {
      return map.id == mapId;
    });
    if (mapIndex == -1) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    let vertices = (await this.mapService.findOne(mapId)).vertices;
    let index = vertices.findIndex((vertex: Vertex) => {
      return vertex.id == id;
    });
    if (index != -1) {
      this.mapService.data[mapIndex].vertices[index] = {
        ...this.mapService.data[mapIndex].vertices[index],
        ...updateVertexDto,
      }; // "Unisco" i due oggetti, vedi "JS Object Spread"
      this.mapService.writeSaveFile();
      return;
    }
    throw new HttpException(VertexService.notFoundError, HttpStatus.NOT_FOUND);
  }

  async replace(id: string, mapId: string, createVertexDto: CreateVertexDto) {
    let mapIndex = (await this.mapService.findAll()).findIndex((map: Map) => {
      return map.id == mapId;
    });
    if (mapIndex == -1) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    let vertices = (await this.mapService.findOne(mapId)).vertices;
    let index = vertices.findIndex((vertex: Vertex) => {
      return vertex.id == id;
    });
    if (index != -1) {
      this.mapService.data[mapIndex].vertices[index] = createVertexDto;
      this.mapService.writeSaveFile();
      return;
    }
    throw new HttpException(VertexService.notFoundError, HttpStatus.NOT_FOUND);
  }

  async remove(id: string, mapId: string) {
    let mapIndex = (await this.mapService.findAll()).findIndex((map: Map) => {
      return map.id == mapId;
    });
    if (mapIndex == -1) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    let vertices = (await this.mapService.findOne(mapId)).vertices;
    let index = vertices.findIndex((vertex: Vertex) => {
      return vertex.id == id;
    });
    if (index != -1) {
      this.mapService.data[mapIndex].vertices.splice(index, 1);
      this.mapService.writeSaveFile();
      return;
    }
    throw new HttpException(VertexService.notFoundError, HttpStatus.NOT_FOUND);
  }
}
