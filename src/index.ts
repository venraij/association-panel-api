import express, {Application} from 'express';
import swaggerUi from 'swagger-ui-express';

// import Router from './routes';

const app: Application = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(express.json());
app.use(express.static('public'));

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/swagger.json',
      },
    }),
);

// define a route handler for the default home page
app.get( '/', ( req, res ) => {
  res.send( 'Hello world!' );
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );

// app.use(Router);
