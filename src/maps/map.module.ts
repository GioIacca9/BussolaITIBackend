import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { AppModule } from 'src/app.module';

@Module({
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
