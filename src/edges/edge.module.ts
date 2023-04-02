import { Module } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { EdgeController } from './edge.controller';
import { MapModule } from 'src/maps/map.module';

@Module({
  controllers: [EdgeController],
  providers: [EdgeService],
  imports: [MapModule],
})
export class EdgeModule {}
