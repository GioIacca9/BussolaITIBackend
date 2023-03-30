import { Injectable } from '@nestjs/common';
import { CreateVertexDto } from './dto/create-vertex.dto';
import { UpdateVertexDto } from './dto/update-vertex.dto';
import { Vertex } from './entities/vertex.entity';

@Injectable()
export class VertexService {
  // I seguenti metodi restituiscono valori fittizi a scopo di test

  create(createVertexDto: CreateVertexDto) {
    return;
  }

  findAll() {
    return [new Vertex(1, 20, 50, 3), new Vertex(2, 10, 130, 2)];
  }

  findOne(id: number) {
    return new Vertex(1, 20, 50, 3);
  }

  update(id: number, updateVertexDto: UpdateVertexDto) {
    return new Vertex(1, 15, 70, 1);
  }

  remove(id: number) {
    return;
  }
}
