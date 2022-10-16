const cheerio = require('cheerio')

const puppeteer = require('puppeteer')

const sellURL = `https://www.cardkingdom.com/purchasing/mtg_singles`
const buyURL = `https://www.cardkingdom.com/catalog/search`
const cards = []
const buyCards = []
let pageNum = 2
let buyPageNum = 2
const combinedCardsArr = []
let counter = 0

async function scrapeURL(url, url2) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    if (
      req.resourceType() == 'stylesheet' ||
      req.resourceType() == 'font' ||
      req.resourceType() == 'image'
    ) {
      req.abort()
    } else {
      req.continue()
    }
  })
  //Disabling CSS + Images from https://www.scrapehero.com/how-to-increase-web-scraping-speed-using-puppeteer/

  try {
    await page.goto(url)
    await page.click(`.perPage`)
    await page.select(`.perPage`, '100')
    await page.waitForTimeout(1000)

    let pageData = await page.evaluate(() => {
      return { html: document.documentElement.innerHTML }
    })
    let $ = await cheerio.load(pageData.html)

    // await page.screenshot({ path: 'screenshot.png', fullPage: true })

    $(`.itemContentWrapper`, pageData.html).each((i, res) => {
      const cardName = $(`.productDetailTitle`, res).text().trim()
      const cardSellPrice = $(`.usdSellPrice`, res)
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, '')
      cards.push({ id: i, cardName, cardSellPrice })
    })

    await page.waitForTimeout(1000)

    for (let i = 0; i < 1; i++) {
      await page.goto(url + '?page=' + pageNum)

      let pageData = await page.evaluate(() => {
        return { html: document.documentElement.innerHTML }
      })

      $ = await cheerio.load(pageData.html)

      await page.screenshot({ path: 'screenshot2.png', fullPage: true })

      $(`.itemContentWrapper`, pageData.html).each((i, res) => {
        const cardName = $('.productDetailTitle', res).text().trim()
        const cardSellPrice = $('.usdSellPrice', res)
          .text()
          .trim()
          .substring(1)
          .replace(/,/g, '')
        cards.push({ id: (pageNum - 1) * 100 + i, cardName, cardSellPrice })
      })
      pageNum++
      await page.waitForTimeout(3000)
    }

    await page.goto(url2)
    pageData = await page.evaluate(() => {
      return { html: document.documentElement.innerHTML }
    })
    $ = await cheerio.load(pageData.html)

    await page.screenshot({ path: 'screenshot.png', fullPage: true })

    $(`.itemContentWrapper`, pageData.html).each((i, res) => {
      const cardName = $(`.productDetailTitle`, res).text().trim()
      const cardBuyPrice = $(`.stylePrice`, res)
        .first()
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, '')
      buyCards.push({ id: i, cardName, cardBuyPrice })
    })

    await page.waitForTimeout(1000)

    for (let i = 0; i < 1; i++) {
      await page.goto(buyURL + '?page=' + buyPageNum)

      pageData = await page.evaluate(() => {
        return { html: document.documentElement.innerHTML }
      })

      $ = await cheerio.load(pageData.html)

      $(`.itemContentWrapper`, pageData.html).each((i, res) => {
        const cardName = $('.productDetailTitle', res).text().trim()
        const cardBuyPrice = $('.stylePrice', res)
          .first()
          .text()
          .trim()
          .substring(1)
          .replace(/,/g, '')
        buyCards.push({
          id: (buyPageNum - 1) * 100 + i,
          cardName,
          cardBuyPrice,
        })
      })
      buyPageNum++
      await page.waitForTimeout(3000)
    }
    // await calcSellBuy(cards, buyCards)
    console.log(JSON.stringify(buyCards))
  } catch (err) {
    console.log(err)
  } finally {
    browser.close()
  }
}

// async function calcSellBuy(sellArr, buyArr) {
//   await sellArr.forEach((sellObj) => {
//     buyArr.find((buyObj) => {
//       if (
//         sellObj.cardName === buyObj.cardName &&
//         sellObj.cardSet === buyObj.cardSet
//       ) {
//         combinedCardsArr.push({
//           id: counter,
//           // sellId: sellObj.id,
//           // buyId: buyObj.id,
//           cardName: sellObj.cardName,
//           cardSet: sellObj.cardSet,
//           sellPrice: sellObj.cardSellPrice,
//           buyPrice: buyObj.cardBuyPrice,
//           sellBuyPerc: Number(
//             (sellObj.cardSellPrice / buyObj.cardBuyPrice).toFixed(3)
//           ),
//         })
//         counter++
//         // combinedCardsArr.push(sellObj.cardName)
//       }
//     })
//   })
//   console.log(JSON.stringify(combinedCardsArr))
//   // combinedCardsArr.sort()
// }

scrapeURL(sellURL, buyURL)
