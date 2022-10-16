const fs = require('fs')
const cheerio = require('cheerio')

const cards = []
const buyCards = []
const combinedCardsArr = []
let counter = 0

async function scrapeURLMimic() {
  fs.readFile('page1.html', 'utf8', function (err, data) {
    if (err) throw err

    let $ = cheerio.load(data)
    $(`.itemContentWrapper`, data).each((i, res) => {
      const cardName = $('.productDetailTitle', res).text().trim()
      const cardSet = $('.productDetailSet', res).text().trim()
      const cardSellPrice = $('.usdSellPrice', res)
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, '')
      cards.push({ id: i, cardName, cardSet, cardSellPrice })
    })
  })
  fs.readFile('page2.html', 'utf8', function (err, data) {
    if (err) throw err

    let $ = cheerio.load(data)
    $(`.itemContentWrapper`, data).each((i, res) => {
      const cardName = $('.productDetailTitle', res).text().trim()
      const cardSet = $('.productDetailSet', res).text().trim()
      const cardSellPrice = $('.usdSellPrice', res)
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, '') //Not a number so / operation may be tricky
      cards.push({ id: i + 100, cardName, cardSet, cardSellPrice })
    })
    //console.log(JSON.stringify(cards))
  })
  fs.readFile('Search1.html', 'utf8', function (err, data) {
    if (err) throw err

    let $ = cheerio.load(data)
    $(`.itemContentWrapper`, data).each((i, res) => {
      const cardName = $('.productDetailTitle', res).text().trim()
      const cardSet = $('.productDetailSet', res).text().trim()
      const cardBuyPrice = $('.stylePrice', res)
        .first()
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, '')
      buyCards.push({ id: i, cardName, cardSet, cardBuyPrice })
    })
  })
  fs.readFile('Search2.html', 'utf8', async function (err, data) {
    if (err) throw err

    let $ = cheerio.load(data)
    $(`.itemContentWrapper`, data).each((i, res) => {
      const cardName = $('.productDetailTitle', res).text().trim()
      const cardSet = $('.productDetailSet', res).text().trim()
      const cardBuyPrice = $('.stylePrice', res)
        .first()
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, '')
      buyCards.push({ id: i + 100, cardName, cardSet, cardBuyPrice })
    })
    await calcSellBuy(cards, buyCards)
  })
}

async function calcSellBuy(sellArr, buyArr) {
  await sellArr.forEach((sellObj) => {
    buyArr.find((buyObj) => {
      if (
        sellObj.cardName === buyObj.cardName &&
        sellObj.cardSet === buyObj.cardSet
      ) {
        combinedCardsArr.push({
          id: counter,
          // sellId: sellObj.id,
          // buyId: buyObj.id,
          cardName: sellObj.cardName,
          cardSet: sellObj.cardSet,
          sellPrice: sellObj.cardSellPrice,
          buyPrice: buyObj.cardBuyPrice,
          sellBuyPerc: Number(
            (sellObj.cardSellPrice / buyObj.cardBuyPrice).toFixed(3)
          ),
        })
        counter++
        // combinedCardsArr.push(sellObj.cardName)
      }
    })
  })
  console.log(JSON.stringify(combinedCardsArr))
  // combinedCardsArr.sort()
}

scrapeURLMimic()

// .then((res) => {
//   console.log(res)
// })
// .catch((err) => {
//   console.log(err)
// })
