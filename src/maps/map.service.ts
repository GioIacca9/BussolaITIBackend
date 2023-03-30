import { Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { Map } from './entities/map.entity';
import { Edge } from 'src/edges/entities/edge.entity';
import { Vertex } from 'src/vertices/entities/vertex.entity';

@Injectable()
export class MapService {
  // I seguenti metodi restituiscono valori fittizi a scopo di test

  create(createMapDto: CreateMapDto) {
    return;
  }

  findAll() {
    return [
      new Map(
        'Segato',
        [new Edge(1, 7, 10), new Edge(2, 1, 8)],
        [new Vertex(1, 20, 50, 3), new Vertex(2, 10, 130, 2)]
      ),
      new Map(
        'Brustolon',
        [new Edge(1, 4, 10), new Edge(2, 1, 32)],
        [new Vertex(1, 25, 30, 3), new Vertex(2, 10, 130, 2)]
      ),
    ];
  }

  findOne(id: string) {
    return new Map(
      'Segato',
      [new Edge(1, 7, 10), new Edge(2, 1, 8)],
      [new Vertex(1, 20, 50, 3), new Vertex(2, 10, 130, 2)]
    );
  }

  update(id: string, updateMapDto: UpdateMapDto) {
    return new Map(
      'Segato',
      [new Edge(1, 7, 10), new Edge(2, 1, 8)],
      [new Vertex(1, 20, 50, 3), new Vertex(2, 10, 130, 2)]
    );
  }

  remove(id: string) {
    return;
  }
}
