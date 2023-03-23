import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdgeModule } from './edge/edge.module';
import { VertexModule } from './vertex/vertex.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [EdgeModule, VertexModule, RouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
