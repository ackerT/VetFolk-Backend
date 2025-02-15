import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app)); 
  app.enableCors({ origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002', 'http://3.147.203.142'],});
  await app.listen(3008);
}
bootstrap();
