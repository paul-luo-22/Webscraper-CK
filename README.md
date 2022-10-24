Included are static HTML pages used for testing (so I can minimalize any load on their server during development)
In the end JSON was easier to convert than SQLite so data was just stored as JSON. If a front-end was to be created then a database may be more convenient.

Key Considerations:
- Client really doesn't want to get IP-banned. May need to research this before any real progress can be made.
- Cheerio and Axios is recommended from research but familiarity with syntax from JSDOM and Superagent are higher.
  -index(old).js has some of the code from attempts to use superagent/axios. Site needs a persistent session for multiple pages however and superagent/axios loads each URL with a new session by default.

MVP:
- [X] Setup/test scraping data from 1 page
- [X] Scrape relevant data from page
- [X] Allow for multi-page scraping
- [X] Setup delay/timers for scraping app/Search for ways to lessen chance of getting IP banned
- [X] Setup database or JSON file
- [X] Create functionality for writing scraped data to storage
- [X] Scrape data from 2nd section
- [X] Create logic to compare the two datasets and create 3rd dataset from it
- [X] Explore possibility of exporting data in other formats (Excel spreadsheet)

Stretch:
- [ ] Create front-end to allow other ways for user to view/manipulate data
- [ ] Research including other APIs with relevant or useful data
- [X] Research use of puppeteer or playwright
- [ ] ScrapingAntClient might be easier to use and may help being blocked (Tried using API for scraping but wouldn't play nice with puppeteer)