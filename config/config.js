import { config } from 'dotenv';

config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;
const firecrawlSecretKey = process.env.FIRECRAWL_SECRET_KEY;

export  {
 port,
 env,
 firecrawlSecretKey,
};