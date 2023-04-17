import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { Vertex } from 'src/vertices/entities/vertex.entity';
import { Route } from './entities/route.entity';

@Injectable()
export class RouteService {
  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll(): Route[] {
    return [
      new Route([
        new Vertex('testMacAddress', 20, 40, 2),
        new Vertex('testMacAddress', 50, 30, 2),
      ]),
      new Route([
        new Vertex('testMacAddress', 25, 40, 4),
        new Vertex('testMacAddress', 14, 48, 0),
      ]),
    ];
  }

  findOne(id: string) {
    return new Route([
      new Vertex('testMacAddress', 25, 40, 4),
      new Vertex('testMacAddress', 14, 48, 0),
    ]);
  }

  remove(id: string) {
    return;
  }
}
