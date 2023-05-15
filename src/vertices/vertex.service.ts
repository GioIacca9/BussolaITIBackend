import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapService } from 'src/maps/map.service';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { UpdateVertexDto } from './dto/update-vertex.dto';
import { Vertex } from './entities/vertex.entity';
import { Map } from 'src/maps/entities/map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VertexService {
  constructor(
    private mapService: MapService,
    @InjectRepository(Vertex) private vertexRepository: Repository<Vertex>
  ) {}

  static notFoundError: string = 'Il vertice richiesto non è stato trovato';

  async create(mapId: string, createVertexDto: CreateVertexDto) {
    let newlyCreatedVertex = await this.vertexRepository.save(
      new Vertex(createVertexDto.x, createVertexDto.y, createVertexDto.floor)
    );

    return newlyCreatedVertex.id;
  }

  async findAll() {
    return await this.vertexRepository.find();
  }

  async findOne(id: number, mapId: string) {
    return await this.vertexRepository.findOneBy({ id });
  }

  async update(id: number, mapId: string, updateVertexDto: UpdateVertexDto) {
    // eseguendo vertexRepository.update non viene controllato se l'entità esiste già, quindi lo facciamo «manualmente» prima
    let entityToRemove = await this.vertexRepository.findOneBy({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(
        VertexService.notFoundError,
        HttpStatus.NOT_FOUND
      );
    }

    this.vertexRepository.update(
      { id },
      new Vertex(updateVertexDto.x, updateVertexDto.y, updateVertexDto.floor)
    );
  }

  async replace(id: number, mapId: string, createVertexDto: CreateVertexDto) {
    let entityToRemove = await this.vertexRepository.findOneBy({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(
        VertexService.notFoundError,
        HttpStatus.NOT_FOUND
      );
    }

    try {
      this.vertexRepository.remove(entityToRemove);
    } catch (e) {
      throw new HttpException(
        "Si è verificato un problema interno al server durante la rimozione dell'entità",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    this.vertexRepository.save(
      new Vertex(
        createVertexDto.x,
        createVertexDto.y,
        createVertexDto.floor,
        id
      )
    );
  }

  async remove(id: number, mapId: string) {
    let entityToRemove = await this.vertexRepository.findOneBy({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(
        VertexService.notFoundError,
        HttpStatus.NOT_FOUND
      );
    }

    try {
      this.vertexRepository.remove(entityToRemove);
    } catch (e) {
      throw new HttpException(
        "Si è verificato un problema interno al server durante la rimozione dell'entità",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
