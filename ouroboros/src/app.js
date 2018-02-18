import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.disable('x-powered-by');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

// Catch 404 and return 'Not found' message
app.use((req, res) => {
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

export default app;
