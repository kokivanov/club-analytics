import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Validator } from './@common/validators/validatorpipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );
  
  app.useGlobalPipes(new Validator())
  app.useBodyParser('json') 
  app.enableCors()
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()))
  await app.listen(3012);
}
bootstrap();
