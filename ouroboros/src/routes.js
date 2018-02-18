import { Router } from 'express';

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
    res.json({ message: "index"});
});

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    res.status(500);
    res.json({error: "Title not found"});
    return;
  }

  res.json({ message: title});
});

export default routes;
