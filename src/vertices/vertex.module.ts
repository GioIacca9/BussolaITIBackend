import { Module } from '@nestjs/common';
import { VertexService } from './vertex.service';
import { VertexController } from './vertex.controller';
import { MapModule } from 'src/maps/map.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vertex } from './entities/vertex.entity';

@Module({
  imports: [MapModule, TypeOrmModule.forFeature([Vertex])],
  providers: [VertexService],
  controllers: [VertexController],
  exports: [TypeOrmModule],
})
export class VertexModule {}
