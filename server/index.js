const server = require('./server')
const PORT = process.env.PORT || 3000

const cheerio = require('cheerio')

const puppeteer = require('puppeteer')
// const request = require('superagent')
// const Agent = require('agentkeepalive').HttpsAgent
// const axios = require('axios')

// const agent = request.agent()
// const keepaliveAgent = new Agent({
//   maxFreeSockets: 50,
// })

// const { CookieJar } = require('tough-cookie')
// const cookieJar = new CookieJar()
// const cookie = cookieJar.setCookie(cookie, 'https://www.cardkingdom.com')

const sellURL = `https://www.cardkingdom.com/purchasing/mtg_singles`
const cards = []
let pageNum = 2

async function scrapeURL(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  // await page.screenshot({ path: 'screenshot.png' })
  // await page.select('.perPage', '100')
  const pageData = await page.evaluate(() => {
    return { html: document.documentElement.innerHTML }
  })
  const $ = await cheerio.load(pageData.html)
  $(`.productDetailTitle`, pageData.html).each((i, title) => {
    const cardName = $(title).text()
    cards.push({ id: i, cardName })
  })
  $(`.sellDollarAmount`, pageData.html).each((i, price) => {
    const cardPrice = $(price).text()
    cards.map((card) => {
      if (card.id == i) {
        card.sellPrice = cardPrice
      }
    })
  })
  await page.goto(url + '?page=2')
  const pageData2 = await page.evaluate(() => {
    return { html: document.documentElement.innerHTML }
  })
  const $2 = await cheerio.load(pageData2.html)
  $2(`.productDetailTitle`, pageData2.html).each((i, title) => {
    const cardName = $(title).text()
    cards.push({ id: i + 25, cardName })
  })
  $2(`.sellDollarAmount`, pageData2.html).each((i, price) => {
    const cardPrice = $(price).text()
    cards.map((card) => {
      if (card.id + 25 == i + 25) {
        card.sellPrice = cardPrice
      }
    })
  })

  console.log(cards)
  browser.close()
}

scrapeURL(sellURL)

// request.get(sellURL).end((err, res) => {
//   const html = res.text
//   const $ = cheerio.load(html)
//   $(`.productDetailTitle`, html).each((i, title) => {
//     const cardName = $(title).text()
//     cards.push({ cardName })
//   })
//   console.log(cards)
// })

// const requests = async function () {
//   await Promise.all([
//     request
//       .get(sellURL)
//      // .agent(keepaliveAgent)
//       // .withCredentials()
//       .end((err, res) => {
//         const html = res.text
//         const $ = cheerio.load(html)
//         $(`.productDetailTitle`, html).each((i, title) => {
//           const cardName = $(title).text()
//           cards.push({ id: i, cardName })
//         })
//         console.log(cards)
//       }),
//     request
//       .get(sellURL)
//      // .agent(keepaliveAgent)
//       // .withCredentials()
//       .query({ page: `${pageNum}` })
//       .end((err, res) => {
//         const html = res.text
//         const $ = cheerio.load(html)
//         $(`.productDetailTitle`, html).each((i, title) => {
//           const cardName = $(title).text()
//           cards.push({ id: i, cardName })
//         })
//         console.log(cards)
//       }),
//   ])
// }

// requests()

//  If using axios for getting a request

// axios(sellURL)
//   .then((res) => {
//     const html = res.data
//     const $ = cheerio.load(html)

//     $(`.productDetailTitle`, html).each((i, title) => {
//       const cardName = $(title).text()
//       cards.push({ cardName })
//     })
//     console.log(cards)
//   })
//   .then(()=>
//     axios(sellURL).then
//   )
//   .catch((err) => {
//     console.log(err)
//   })

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})
