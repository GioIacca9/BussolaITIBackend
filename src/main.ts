import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { readFile, writeFile } from 'node:fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const projectName = 'Bussola ITI'; // Nota: provvisiorio

  const app = await NestFactory.create(AppModule);

  // Configurazione della documentazione per l'API
  const config = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription(`L'API del progetto "${projectName}"`)
    .setVersion('0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: `${projectName} - API`,
  });

  // Rimozione dei parametri presenti nelle richieste, ma non nel DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
