import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { appendFile } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.REDIS,
  //     options: {
  //       host: 'redis'
  //     },
  //   }
  // )
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'redis'
    },
  })
  await app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();