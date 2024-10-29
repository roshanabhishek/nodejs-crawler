import { Router } from "express";
import { getGoogleApiSearchResult } from "../google-apis/google.js";
import { checkForAsyncBatchScrapingStatus, startAsyncBatchScrape } from "../fire-crawl/firecrawl.js";
import { uploadFileToS3 } from "../aws-s3/awsFileUpload.js";
import { getFromRedis, saveToRedis } from "../redis/redis.js";

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

        // either batch processing id or file
        const data = await getFromRedis(search_text);
        let apiResponseData = null;
        if(data) {
          apiResponseData = data
        } else {
          const searchTextWithKeyWords = getSearchWithKeyWords(search_text);

          // Google Search for URLs
          const searchResponse = await getGoogleApiSearchResult(searchTextWithKeyWords);
          const topSearchUrls = searchResponse.items.map(item => item.link);

          const batchScrapingPostStartedResponse = await startAsyncBatchScrape(topSearchUrls)
          apiResponseData = batchScrapingPostStartedResponse;
          saveToRedis(search_text, batchScrapingPostStartedResponse.id)
        }
        res.json({ message: 'Scrape started successfully', data: apiResponseData });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

ScrapeRouter.get("/status", async function (req, res) {
  try {
      const { search_text } = req.body;
      if (!search_text) {
        throw new Error('search text is required');
      }
      let apiResponseData = null;

      // either batch processing id or file
      const data = await getFromRedis(search_text);

      if(data) {
        // is a s3 URL
        if(data.includes('amazonaws.com')) {
          apiResponseData = data;
        } else {
          const statusCheckResponse = await checkForAsyncBatchScrapingStatus(data)
          if(statusCheckResponse.completed) {
            const compileMarkDownToSingle = statusCheckResponse.data.map(each => each.markdown).join('\n');

            const responeToS3 = uploadFileToS3(search_text, 'response.txt', JSON.stringify(statusCheckResponse, null, 2))
            const mdFileToS3 = uploadFileToS3(search_text, 'crawl_data.md', compileMarkDownToSingle)
            const [_, mdFileUrl] = await Promise.all([responeToS3, mdFileToS3])

            await saveToRedis(search_text, mdFileUrl)
            apiResponseData = mdFileUrl;
          } else {
            apiResponseData = statusCheckResponse;
          }
        }
      } else {
        throw new Error('search text is not valid');
      }

      res.json({ message: 'Scrape status', data: apiResponseData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

export default ScrapeRouter;