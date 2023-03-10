import { Injectable } from '@nestjs/common';
import { CreateEdgeDto } from './dto/create-edge.dto';
import { UpdateEdgeDto } from './dto/update-edge.dto';

@Injectable()
export class EdgeService {
  create(createEdgeDto: CreateEdgeDto) {
    return 'This action adds a new edge';
  }

  findAll() {
    return `This action returns all edge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edge`;
  }

  update(id: number, updateEdgeDto: UpdateEdgeDto) {
    return `This action updates a #${id} edge`;
  }

  remove(id: number) {
    return `This action removes a #${id} edge`;
  }
}
