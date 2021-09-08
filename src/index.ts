import express, {Application} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/router';

const spec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'P2P Voting Api',
      version: '0.0.1',
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
const port = process.env.PORT || 8080; // default port to listen
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

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );
