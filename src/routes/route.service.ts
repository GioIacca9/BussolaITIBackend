import { Injectable } from '@nestjs/common';
import { Vertex } from 'src/vertices/entities/vertex.entity';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from 'src/edges/entities/edge.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>
  ) {}

  findAll(): Route[] {
    return [
      {
        vertices: [new Vertex(1, 20, 40), new Vertex(0, 50, 30)],
      },
      {
        vertices: [new Vertex(240, 25, 40), new Vertex(10, 14, 48)],
      },
    ];
  }

  findOne(id: string) {
    return { vertices: [new Vertex(44, 25, 40), new Vertex(55, 14, 48)] };
  }

  remove(id: string) {
    return;
  }
}
