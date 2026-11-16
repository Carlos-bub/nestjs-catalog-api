// Autores: Carlos Henrique, Mateus Henrique, Rithiellen Kariny, Gustavo Rodrigues
// Classe Principal em TypeScript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getJwtSecret } from './users/jwt.config';

async function bootstrap() {
  getJwtSecret();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
