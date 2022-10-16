const fs = require('fs')
const cheerio = require('cheerio')

const cards = []
let pageNum = 2

async function scrapeURLMimic() {
  fs.readFile('page1.html', 'utf8', function (err, data) {
    if (err) throw err

    let $ = cheerio.load(data)
    $(`.itemContentWrapper`, data).each((i, res) => {
      const cardName = $('.productDetailTitle', res).text()
      const cardSellPrice = $('.usdSellPrice', res).text().substring(1)
      cards.push({ id: i, cardName, cardSellPrice })
    })
  })
  fs.readFile('page2.html', 'utf8', function (err, data) {
    if (err) throw err

    let $ = cheerio.load(data)
    $(`.itemContentWrapper`, data).each((i, res) => {
      const cardName = $('.productDetailTitle', res).text()
      const cardSellPrice = $('.usdSellPrice', res).text().substring(1) //Not a number so / operation may be tricky
      cards.push({ id: 100 + i, cardName, cardSellPrice })
    })
    console.log(JSON.stringify(cards))
  })
}

scrapeURLMimic()
