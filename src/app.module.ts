import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdgeModule } from './edge/edge.module';

@Module({
  imports: [EdgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
