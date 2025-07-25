import express from 'express';

export function createServer() {
  const app = express();

  // Example API route
  app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
  });

  return app;
}
