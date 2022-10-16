const server = require('./server')
const PORT = process.env.PORT || 3000

// const request = require('superagent')
// const Agent = require('agentkeepalive').HttpsAgent
// const axios = require('axios')

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
//       // .agent(keepaliveAgent)
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
//       // .agent(keepaliveAgent)
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
//   .then(() => axios(sellURL).then)
//   .catch((err) => {
//     console.log(err)
//   })

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})
