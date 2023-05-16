import { Injectable } from '@nestjs/common';
import { Vertex } from 'src/vertices/entities/vertex.entity';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from 'src/edges/entities/edge.entity';
import Graph from 'node-dijkstra';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>,
    @InjectRepository(Vertex) private vertexRepository: Repository<Vertex>
  ) {}

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

  async findOne(startVertexId: number, endVertexId: number): Promise<Route> {
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

    console.log(graph);

    let path = graph.path(startVertexId, endVertexId, {
      cost: true,
    }) as { path: string[]; cost: number }; // Dato che abbiamo dato l'opzione «cost» sopra, il tipo sarà sempre questo, ma TypeScript non lo sa

    return {
      vertices: path.path.map(Number),
      cost: path.cost,
    };
  }

  remove(id: string) {
    return;
  }
}
