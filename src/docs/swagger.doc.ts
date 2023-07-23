import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { version } from '../../package.json';

/**
 * Swagger doc builder
 */
export class SwaggerDoc {
  /**
   * Configure summary for API Tags
   */
  setupDocs = (app: INestApplication) => {
    const title = 'Teste Onfly';
    const description = `Teste Onfly`;
    //tags must be order manually
    //order by A-Z
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag('Autenticação', 'auth')
      .addTag('Despesas', 'despesas')
      .addTag('Usuários', 'usuarios')

      //use api key
      .addSecurity('ApiKeyAuth', {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'Security Token',
      })

      .build();
    const document = SwaggerModule.createDocument(app, config);
    //customize swagger
    // const favicon = 'https://icon-library.com/images/rest-api-icon/rest-api-icon-26.jpg';
    const cssFile = path.join(
      __dirname,
      '../../assets/swagger/theme-material.css',
    );
    const options = {
      // explorer: false, //must be disable manually,
      customCss: fs.readFileSync(cssFile, { encoding: 'utf-8' }),
      // customfavIcon: favicon,
      customSiteTitle: 'Teste Onfly',
    };

    SwaggerModule.setup('docs', app, document, options);
    // generate swagger json
    // fs.writeFileSync('./swagger-docs.json', JSON.stringify(document))
  };
}
