import { config } from 'dotenv';

config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;
const firecrawlSecretKey = process.env.FIRECRAWL_SECRET_KEY;
const googleSearchRESTURL = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_KEY}`;
const awsCrawlBucketName = process.env.AWS_CRAWL_BUCKET_NAME;
const redisHostName = process.env.REDIS_HOST_NAME;
const redisPostNumber = process.env.REDIS_PORT_NUMBER;
const redisPassword = process.env.REDIS_PASSWORD;

export  {
 port,
 env,
 firecrawlSecretKey,
 googleSearchRESTURL,
 awsCrawlBucketName,
 redisHostName,
 redisPassword,
 redisPostNumber,
};