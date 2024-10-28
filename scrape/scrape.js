import { Router } from "express";
import { getGoogleApiSearchResult } from "../google-apis/google.js";
const ScrapeRouter = Router();

ScrapeRouter.post("/", async function (req, res) {
    try {
        const { search_text } = req.body;
        if (!search_text) {
          throw new Error('Search text is required');
        }
        // Google Search for URLs
        const searchResponse = await getGoogleApiSearchResult(search_text);
        const topSearchUrls = searchResponse.items.map(item => item.link);

        res.json({ message: 'Scrape started successfully', data: topSearchUrls });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

export default ScrapeRouter;