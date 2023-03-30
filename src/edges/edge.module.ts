import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeController } from './edge.controller';

@Module({
  controllers: [EdgeController],
  providers: [EdgeService],
})
export class EdgeModule {}
