import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { EdgeModule } from 'src/edges/edge.module';

@Module({
  imports: [EdgeModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
