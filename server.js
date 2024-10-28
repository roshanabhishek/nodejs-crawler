import http from 'http';

import app from './app.js';
import { port } from './config/config.js';

const server = http.createServer(app);

server.listen(port, () => {
  console.info(`Server running on port ${port}`)
});