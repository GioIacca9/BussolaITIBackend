import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapService } from 'src/maps/map.service';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';
import { Edge } from './entities/edge.entity';
import { Map } from 'src/maps/entities/map.entity';

@Injectable()
export class EdgeService {
  constructor(private mapService: MapService) {}

  private static notFoundError: string = "L'arco richiesto non è stato trovato";

  async create(mapId: string, createEdgeDto: CreateEdgeDto) {
    (await this.mapService.findOne(mapId)).edges.push(createEdgeDto);
    this.mapService.writeSaveFile();
  }

  async findAll(mapId: string) {
    return (await this.mapService.findOne(mapId)).edges;
  }

  async findOne(id: string, mapId: string) {
    let edges = (await this.mapService.findOne(mapId)).edges;
    let edge = edges.find((edge: Edge) => {
      return edge.id == id;
    });
    if (!edge) {
      throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
    }
    return edge;
  }

  async update(id: string, mapId: string, updateEdgeDto: UpdateEdgeDto) {
    let mapIndex = (await this.mapService.findAll()).findIndex((map: Map) => {
      return map.id == mapId;
    });
    if (mapIndex == -1) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    let edges = (await this.mapService.findOne(mapId)).edges;
    let index = edges.findIndex((edge: Edge) => {
      return edge.id == id;
    });
    if (index != -1) {
      this.mapService.data[mapIndex].edges[index] = {
        ...this.mapService.data[mapIndex].edges[index],
        ...updateEdgeDto,
        id: this.mapService.data[mapIndex].edges[index].id, // Per evitare di cambiare l'id
      }; // "Unisco" i due oggetti, vedi "JS Object Spread"
      this.mapService.writeSaveFile();
      return;
    }
    throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
  }

  async replace(id: string, mapId: string, createEdgeDto: CreateEdgeDto) {
    let mapIndex = (await this.mapService.findAll()).findIndex((map: Map) => {
      return map.id == mapId;
    });
    if (mapIndex == -1) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    let edges = (await this.mapService.findOne(mapId)).edges;
    let index = edges.findIndex((edge: Edge) => {
      return edge.id == id;
    });
    if (index != -1) {
      this.mapService.data[mapIndex].edges[index] = {
        ...createEdgeDto,
        id: this.mapService.data[mapIndex].edges[index].id, // Per evitare di cambiare l'id
      }; // "Unisco" i due oggetti, vedi "JS Object Spread"
      this.mapService.writeSaveFile();
      return;
    }
    throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
  }

  async remove(id: string, mapId: string) {
    let mapIndex = (await this.mapService.findAll()).findIndex((map: Map) => {
      return map.id == mapId;
    });
    if (mapIndex == -1) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    let edges = (await this.mapService.findOne(mapId)).edges;
    let index = edges.findIndex((edge: Edge) => {
      return edge.id == id;
    });
    if (index != -1) {
      this.mapService.data[mapIndex].edges.splice(index, 1);
      this.mapService.writeSaveFile();
      return;
    }
    throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
  }
}
