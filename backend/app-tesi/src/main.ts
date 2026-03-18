import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === 'http://localhost:4200' ||
        origin === 'https://progetto-tesi-rc1u.vercel.app'
      ) {
        callback(null, true);
      } else {
        callback(new Error('CORS non permesso'));
      }
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
