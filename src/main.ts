import '@shared/extensions';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { loadConfig } from '@infra/config/load.config';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { initializeMiddlewares } from './core/middlewares/app.middleware';
//logger
const logger = new Logger('Main');

//load config from env file
loadConfig();

/**
 * Start app
 */
async function bootstrap() {
  //core init
  await new AppService().onInit();
  // create app
  const app = await NestFactory.create(AppModule);
  //config middlwares
  initializeMiddlewares(app);
  //start app
  await app.listen(process.env.PORT, () =>
    // logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(
      `API running port ${process.env.PORT} environment: ${process.env.NODE_ENV}`,
    ),
  );
}
//run app
bootstrap();
