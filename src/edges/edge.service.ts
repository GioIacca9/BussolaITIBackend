import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapService } from 'src/maps/map.service';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';
import { Edge } from './entities/edge.entity';
import { Map } from 'src/maps/entities/map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EdgeService {
  constructor(
    private mapService: MapService,
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>
  ) {}

  private static notFoundError: string = "L'arco richiesto non è stato trovato";

  async create(mapId: string, createEdgeDto: CreateEdgeDto) {
    let newlyCreatedEdge = await this.edgeRepository.save(
      new Edge(
        createEdgeDto.startVertexId,
        createEdgeDto.endVertexId,
        createEdgeDto.weight
      )
    );

    return newlyCreatedEdge.id;
  }

  async findAll(mapId: string) {
    return await this.edgeRepository.find();
  }

  async findOne(id: number, mapId: string) {
    return await this.edgeRepository.findOneBy({ id });
  }

  async update(id: number, mapId: string, updateEdgeDto: UpdateEdgeDto) {
    // eseguendo edgeRepository.update non viene controllato se l'entità esiste già, quindi lo facciamo «manualmente» prima
    let entityToRemove = await this.edgeRepository.findOneBy({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
    }

    this.edgeRepository.update(
      { id },
      new Edge(
        updateEdgeDto.startVertexId,
        updateEdgeDto.endVertexId,
        updateEdgeDto.weight
      )
    );
  }

  async replace(id: number, mapId: string, createEdgeDto: CreateEdgeDto) {
    let entityToRemove = await this.edgeRepository.findOneBy({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
    }

    try {
      this.edgeRepository.remove(entityToRemove);
    } catch (e) {
      throw new HttpException(
        "Si è verificato un problema interno al server durante la rimozione dell'entità",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    this.edgeRepository.save(
      new Edge(
        createEdgeDto.startVertexId,
        createEdgeDto.endVertexId,
        createEdgeDto.weight,
        id
      )
    );
  }

  async remove(id: number, mapId: string) {
    let entityToRemove = await this.edgeRepository.findOneBy({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(EdgeService.notFoundError, HttpStatus.NOT_FOUND);
    }

    try {
      this.edgeRepository.remove(entityToRemove);
    } catch (e) {
      throw new HttpException(
        "Si è verificato un problema interno al server durante la rimozione dell'entità",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
