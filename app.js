import express from 'express';
import ScrapeRoute from './scrape/scrape.js';

const app = express();

// Global Middleware
app.use(express.json());
app.use(express.static('public'));

// Route  Middleware

app.use("/scrape", ScrapeRoute);

// Basic route
app.use('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

export default app;