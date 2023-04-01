import { Injectable } from '@nestjs/common';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';
import { Edge } from './entities/edge.entity';

@Injectable()
export class EdgeService {
  create(createEdgeDto: CreateEdgeDto) {
    return;
  }

  findAll() {
    return [new Edge(1, 7, 10), new Edge(2, 1, 8)];
  }

  findOne(id: number) {
    return new Edge(6, 4, 2);
  }

  update(id: number, updateEdgeDto: UpdateEdgeDto) {
    return new Edge(5, 14, 7);
  }

  remove(id: number) {
    return;
  }
}
