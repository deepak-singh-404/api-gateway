import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { WHITELIST_ORIGINS } from "./config/cors";
import { ERROR_MESSAGES } from "./constant/api.message";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");

  const config = new DocumentBuilder()
    .setTitle('Api Collection')
    .setVersion('1.0')
    .addTag('Moglix-Online')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Enable cors
  // app.enableCors()
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || WHITELIST_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(ERROR_MESSAGES.NOT_ALLOWED_BY_CORS));
      }
    },
  });

  await app.listen(process.env.PORT);

  console.log("BOOTSTRAP DETAILS: ", {
    PORT: process.env.PORT,
    SERVER: "UP",
  });
}
bootstrap();
