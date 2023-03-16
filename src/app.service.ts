import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Benvenuto. Per consultare la documentazione dell'api puoi andare su /api";
  }
}
