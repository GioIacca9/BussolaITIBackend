import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeController } from './edge.controller';
import { MapModule } from 'src/maps/map.module';
import { Edge } from './entities/edge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EdgeController],
  providers: [EdgeService],
  imports: [MapModule, TypeOrmModule.forFeature([Edge])],
  exports: [TypeOrmModule],
})
export class EdgeModule {}
