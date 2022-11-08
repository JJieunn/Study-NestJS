import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true // req로 보내는 값을 우리가 원하는 실제 타입으로 변환해준다.
  }))
  await app.listen(3000);
}
bootstrap();
