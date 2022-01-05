import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
      .setTitle('Kora API')
      .setDescription('API para aplicacion de compra y venta')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(3000);
}
bootstrap();
