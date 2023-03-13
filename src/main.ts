import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { readFile, writeFile } from 'node:fs';

async function bootstrap() {
  const projectName = 'Bussola ITI'; // Nota: provvisiorio

  // Legge il file contenente i dati
  readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code == 'ENOENT') {
        console.log(
          'Il file "data.json" non è stato trovato, verrà creato alla radice del progetto'
        );
        writeFile('./data.json', '{}', (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
        return;
      }
      console.error(err);
      return;
    }
    console.log(`Dati caricati correttamente:\n${data}`);
  });

  const app = await NestFactory.create(AppModule);

  // Configurazione della documentazione per l'API
  const config = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription(`L\'API del progetto "${projectName}"`)
    .setVersion('0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: `${projectName} - API`,
  });

  await app.listen(3000);
}
bootstrap();
