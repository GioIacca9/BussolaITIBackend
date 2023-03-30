import { Module } from '@nestjs/common';
import { VertexService } from './vertex.service';
import { VertexController } from './vertex.controller';

@Module({
  controllers: [VertexController],
  providers: [VertexService],
})
export class VertexModule {}
