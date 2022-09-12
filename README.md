Key Considerations:
- Client really doesn't want to get IP-banned. May need to research this before any real progress can be made.
- Cheerio and Axios is recommended from research but familiarity with syntax from JSDOM and Superagent are higher. At the very least I want to use Superagent since JSDOM is a library I haven't actually used(?) but has DOM manipulation syntax (queryselector)

MVP:
- [X] Setup/test scraping data from 1 page
- [X] Scrape relevant data from page
- [X] Allow for multi-page scraping
- [ ] Setup delay/timers for scraping app/Search for ways to lessen chance of getting IP banned
- [ ] Setup database or JSON file
- [ ] Create functionality for writing scraped data to storage
- [ ] Scrape data from 2nd section
- [ ] Create logic to compare the two datasets and create 3rd dataset from it
- [ ] Explore possibility of exporting data in other formats (Excel spreadsheet)

Stretch:
- [ ] Create front-end to allow other ways for user to view/manipulate data
- [ ] Research including other APIs with relevant or useful data
- [ ] Research use of puppeteer or playwright/ScrapingAntClient might be easier to use and may help being blocked