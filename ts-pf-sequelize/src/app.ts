import express from 'express';
import 'express-async-errors';
import * as middlewares from './middlewares';
import routes from './routes';

const app = express();

// request middlewares
app.use(express.json());
app.use(middlewares.corsMiddleware);

// use case middlewres
app.use(routes);

// response middlewares
app.use(middlewares.errorHandlerMiddleware);

export default app;
