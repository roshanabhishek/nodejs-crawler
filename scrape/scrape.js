import { Router } from "express";
import { getGoogleApiSearchResult } from "../google-apis/google.js";
import { checkForAsyncBatchScrapingStatus, startAsyncBatchScrape } from "../fire-crawl/firecrawl.js";

const ScrapeRouter = Router();

const getSearchWithKeyWords = (searchText) => {
    return `${searchText} product key feature pricing customers`;
}

ScrapeRouter.post("/", async function (req, res) {
    try {
        const { search_text } = req.body;
        if (!search_text) {
          throw new Error('Search text is required');
        }
        // Google Search for URLs
        const searchTextWithKeyWords = getSearchWithKeyWords(search_text);

        const searchResponse = await getGoogleApiSearchResult(searchTextWithKeyWords);
        const topSearchUrls = searchResponse.items.map(item => item.link);

        const batchScrapingPostStartedResponse = await startAsyncBatchScrape(topSearchUrls)
        res.json({ message: 'Scrape started successfully', data: batchScrapingPostStartedResponse });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

ScrapeRouter.get("/status", async function (req, res) {
  try {
      const { batch_id } = req.body;
      if (!batch_id) {
        throw new Error('Batch ID is required');
      }

      const statusCheck = await checkForAsyncBatchScrapingStatus(batch_id)
      res.json({ message: 'Scrape status', data: statusCheck });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

export default ScrapeRouter;