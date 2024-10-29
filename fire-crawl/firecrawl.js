import FirecrawlApp from '@mendable/firecrawl-js';
import { firecrawlSecretKey } from '../config/config.js';

const app = new FirecrawlApp({apiKey: firecrawlSecretKey});

// {
//     "message": "Scrape started successfully",
//     "data": {
//         "success": true,
//         "id": "2f4535bb-d456-41ac-9a29-ccffd60ae63a",
//         "url": "https://api.firecrawl.dev/v1/batch/scrape/2f4535bb-d456-41ac-9a29-ccffd60ae63a"
//     }
// }
export const startAsyncBatchScrape = async (urls) => {
    const crawlResponse = await app.asyncBatchScrapeUrls(urls, { formats: ['markdown', 'html'] });

    if (!crawlResponse.success) {
       throw new Error(`Failed to crawl: ${crawlResponse.error}`)
    }
    
    return crawlResponse;
}

export const checkForAsyncBatchScrapingStatus = async (id) => {
    const batchScrapeStatusResponse = await app.checkBatchScrapeStatus(id);

    return batchScrapeStatusResponse;
}
