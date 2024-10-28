import express from 'express';

const app = express();

// Global Middleware
app.use(express.json());
app.use(express.static('public'));

// Route  Middleware

// Basic route
app.use('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

export default app;