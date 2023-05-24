import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { EdgeModule } from 'src/edges/edge.module';
import { VertexModule } from 'src/vertices/vertex.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [EdgeModule, VertexModule, ServicesModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
