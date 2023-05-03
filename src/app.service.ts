import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfoMessage(): string {
    return "Benvenuto. Per consultare la documentazione dell'api puoi andare su /docs";
  }
}
