import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config'; 


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)


  const config = new DocumentBuilder()
    .setTitle('CHAT APP BACKEND')
    .setDescription('backend for chat application')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<string>('PORT') || 3000
  await app.listen(port)
  ;
}
bootstrap();
   