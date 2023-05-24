import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Vertex } from 'src/vertices/entities/vertex.entity';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from 'src/edges/entities/edge.entity';
import Graph from 'node-dijkstra';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>,
    @InjectRepository(Vertex) private vertexRepository: Repository<Vertex>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ) {}

  static notFoundError: string =
    'Non è stato possibile calcolare un percorso tra i due punti';

  async findAll(): Promise<Route[]> {
    return [
      {
        vertices: [1, 3],
        cost: undefined,
      },
      {
        vertices: [6, 5],
        cost: undefined,
      },
    ];
  }

  async findOne(startVertexId: string, endVertexId: string): Promise<Route> {
    let allVertices: Vertex[] = await this.vertexRepository.find();
    const graph: Graph = new Graph();

    for (const vertex of allVertices) {
      const edgesWithVertexAsStart = await this.edgeRepository.findBy({
        startVertexId: vertex.id,
      });
      let neighbors = {};
      for (const edge of edgesWithVertexAsStart) {
        neighbors[edge.endVertexId] = edge.weight;
      }
      graph.addNode(vertex.id.toString(), neighbors);
    }

    let path = graph.path(startVertexId, endVertexId, {
      cost: true,
    }) as { path: string[]; cost: number }; // Dato che abbiamo dato l'opzione «cost» sopra, il tipo sarà sempre questo, ma TypeScript non lo sa

    if (!path.path) {
      throw new HttpException(
        RouteService.notFoundError,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return {
      vertices: path.path.map(Number),
      cost: path.cost,
    };
  }

  async findByService(
    startVertexId: number,
    serviceId: number
  ): Promise<Route> {
    let allVertices: Vertex[] = await this.vertexRepository.find({
      relations: {
        services: true,
      },
    });
    const graph: Graph = new Graph();
    let serviceOfferers: Vertex[] = [];
    let routesToServiceOfferers: Route[] = [];

    for (const vertex of allVertices) {
      if (vertex.id != startVertexId && !vertex.services) {
        continue;
      }
      for (const service of vertex.services) {
        if (
          JSON.stringify(service) ==
          JSON.stringify(
            await this.serviceRepository.findOneBy({ id: serviceId })
          )
        ) {
          serviceOfferers.push(vertex);
        }
        continue;
      }
    }

    for (const serviceOfferer of serviceOfferers) {
      try {
        routesToServiceOfferers.push(
          await this.findOne(
            startVertexId.toString(),
            serviceOfferer.id.toString()
          )
        );
      } catch {
        // TODO: Gestire l'errore, causato dall'inesistenza di un collegamento tra i due vertici
      }
    }

    let minCost: number = Math.min(
      ...routesToServiceOfferers.map((item) => item.cost)
    );

    return routesToServiceOfferers.filter((item) => item.cost === minCost)[0];
  }

  remove(id: string) {
    return;
  }
}
