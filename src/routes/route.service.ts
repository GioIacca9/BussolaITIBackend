import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';

@Injectable()
export class RouteService {
  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll() {
    return `This action returns all route`;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
