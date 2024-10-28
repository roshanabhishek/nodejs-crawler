import { Router } from "express";
import { getGoogleApiSearchResult } from "../google-apis/google.js";
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

        res.json({ message: 'Scrape started successfully', data: topSearchUrls });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

export default ScrapeRouter;