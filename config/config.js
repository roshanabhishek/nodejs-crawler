import { config } from 'dotenv';

config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;
const firecrawlSecretKey = process.env.FIRECRAWL_SECRET_KEY;
const googleSearchRESTURL = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_KEY}`;

export  {
 port,
 env,
 firecrawlSecretKey,
 googleSearchRESTURL,
};