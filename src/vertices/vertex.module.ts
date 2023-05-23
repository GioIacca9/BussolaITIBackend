import { Module } from '@nestjs/common';
import { VertexService } from './vertex.service';
import { VertexController } from './vertex.controller';
import { MapModule } from 'src/maps/map.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vertex } from './entities/vertex.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [MapModule, TypeOrmModule.forFeature([Vertex]), ServicesModule],
  providers: [VertexService],
  controllers: [VertexController],
  exports: [TypeOrmModule],
})
export class VertexModule {}
