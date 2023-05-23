import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapService } from 'src/maps/map.service';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { UpdateVertexDto } from './dto/update-vertex.dto';
import { Vertex } from './entities/vertex.entity';
import { Map } from 'src/maps/entities/map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class VertexService {
  constructor(
    private mapService: MapService,
    @InjectRepository(Vertex) private vertexRepository: Repository<Vertex>,
    @InjectRepository(Service) private servicesRepository: Repository<Service>
  ) {}

  static notFoundError: string = 'Il vertice richiesto non è stato trovato';
  static serviceNotFoundError: string =
    'Il servizio menzionato non è stato trovato';

  async create(mapId: string, createVertexDto: CreateVertexDto) {
    let services: Service[] = [];
    try {
      for (let serviceId of createVertexDto.services) {
        services.push(
          await this.servicesRepository.findOneByOrFail({ id: serviceId })
        );
      }
    } catch (e) {
      return new HttpException(
        VertexService.serviceNotFoundError,
        HttpStatus.BAD_REQUEST
      );
    }

    let newlyCreatedVertex = await this.vertexRepository.save(
      new Vertex(
        createVertexDto.x,
        createVertexDto.y,
        createVertexDto.floor,
        undefined,
        services
      )
    );

    return newlyCreatedVertex.id;
  }

  async findAll() {
    return await this.vertexRepository.find({
      relations: {
        services: true,
      },
    });
  }

  async findOne(id: number, mapId: string) {
    return await this.vertexRepository.findOneByOrFail({ id });
  }

  async findByService(serviceId: number, mapId: string) {
    let requestedService: Service;
    try {
      requestedService = await this.servicesRepository.findOneByOrFail({
        id: serviceId,
      });
    } catch (e) {
      return new HttpException(
        VertexService.serviceNotFoundError,
        HttpStatus.BAD_REQUEST
      );
    }

    let vertices: Vertex[] = await this.vertexRepository.find({
      relations: {
        services: true,
      },
    });
    let serviceProviders: Vertex[] = [];
    for (const vertex of vertices) {
      for (const service of vertex.services) {
        if (JSON.stringify(service) == JSON.stringify(requestedService)) {
          serviceProviders.push(vertex);
        }
      }
    }

    return serviceProviders;
  }

  async update(id: number, mapId: string, updateVertexDto: UpdateVertexDto) {
    // eseguendo vertexRepository.update non viene controllato se l'entità esiste già, quindi lo facciamo «manualmente» prima
    let entityToRemove = await this.vertexRepository.findOneByOrFail({ id });
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
    let entityToRemove = await this.vertexRepository.findOneByOrFail({ id });
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
    let entityToRemove = await this.vertexRepository.findOneByOrFail({ id });
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
