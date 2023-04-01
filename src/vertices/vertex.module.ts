import { Module } from '@nestjs/common';
import { VertexService } from './vertex.service';
import { VertexController } from './vertex.controller';
import { MapModule } from 'src/maps/map.module';

@Module({
  imports: [MapModule],
  controllers: [VertexController],
  providers: [VertexService],
})
export class VertexModule {}
