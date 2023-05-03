import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: `${projectName} - API`,
    customCss: `.swagger-ui .topbar { display: none }`, // Rimozione della barra col branding Swagger/OpenAPI
    customfavIcon: "https://segatobrustolon.edu.it/images/logoSegato.png", // Impostazione del logo della scuola come icona del sito della documentazione
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
