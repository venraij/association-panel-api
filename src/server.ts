import express, {Application} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/router';
import { Sequelize } from 'sequelize-typescript';
import http from 'http';
import helmet from 'helmet';
import { migrator } from './utils/umzug';
import bodyParser from 'body-parser';
import { config } from '../config.js';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');

const spec: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'Voting Api',
      description: 'Api for easy and secure voting.',
      version: '0.0.1',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    basePath: '/v1',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['**/*.ts'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(spec);

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: 'swagger.json',
        persistAuthorization: true,
      },
      explorer: true,
    }),
);

app.use('/', routes);

export async function start(sequelize: Sequelize): Promise<void> {
  try {
    const server = http.createServer(app);

    sequelize.addModels([__dirname + '/../dist/db/models/*.js']);

    await migrator.up();

    return new Promise((resolve) => {
      server.listen(config.port, config.host.toString(), () => {
        console.log(`Server is running on http://${config.host}:${config.port}/docs`);
        resolve();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

