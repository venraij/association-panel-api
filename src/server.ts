import express, {Application} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/router';
import { Sequelize } from 'sequelize-typescript';
import { Voter } from './models/voter';
import { Organizer } from './models/organizer';
import http from 'http';

const spec = {
  definition: {
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
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  apis: ['**/*.ts'], // files containing annotations as above
};

const app: Application = express();
const port = parseInt(process.env.PORT) || 8080; // default port to listen
const host = process.env.HOST || 'localhost';
const swaggerSpec = swaggerJSDoc(spec);

app.use(express.json());
app.disable('x-powered-by');

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: 'swagger.json',
        persistAuthorization: true,
      },
    }),
);

app.use('/', routes);

export async function start(sequelize: Sequelize): Promise<void> {
  try {
    const server = http.createServer(app);

    sequelize.addModels([
      Voter,
      Organizer,
    ]);

    await sequelize.sync();
    return new Promise((resolve) => {
      server.listen(port, host.toString(), () => {
        console.log(`Server is running on http://${host}:${port}/docs`);
        resolve();
      });
    });
  } catch (e) {
    console.error(e);
  }
}

