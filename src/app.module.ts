import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdgeModule } from './edges/edge.module';
import { VertexModule } from './vertices/vertex.module';
import { RouteModule } from './routes/route.module';
import { MapModule } from './maps/map.module';

@Module({
  imports: [MapModule, EdgeModule, VertexModule, RouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
