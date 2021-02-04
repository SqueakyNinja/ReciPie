import express from 'express';
import apiRouter from './routes/api.routes';
import cors from 'cors';
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

const handle500s: express.ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Something went wrong!' });
};

app.use(handle500s);

export default app;
