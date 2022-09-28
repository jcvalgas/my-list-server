import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const allowedOrigins = process.env.IP_LIST.split (',') || '';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: allowedOrigins,
    },
  });
  
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ToDo')
    .setDescription('API de lista de tarefas')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('user')
    .addTag('todo')
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port || 3333);
}
bootstrap();
