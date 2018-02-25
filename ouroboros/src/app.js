import express from 'express';
import logger from 'morgan';
import tridentRoutes from './endpoints/trident';
import populousRoutes from './endpoints/populous';
import javelinRoutes from './endpoints/javelin';

const app = express();
app.disable('x-powered-by');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(express.json());

// Routes
app.use('/gapf', tridentRoutes);
app.use('/tickets', javelinRoutes);
app.use('/users', populousRoutes);

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

const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
