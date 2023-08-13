import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type','Authorization'],
      credentials: true,
    }),
  );

  await app.listen(PORT, () =>
    console.log(`Server is now going on port ${PORT}`),
  );
}
start();
