const Apify = require('apify')

const {
  utils: { log }
} = Apify

const products = []

Apify.main(async () => {
  const inputArr = await Apify.getInput()

  if (!inputArr || !inputArr.length) throw new Error('Invalid input, must be a JSON object with the "url" field!')

  const listName = Date.now().toString()
  const requestList = await Apify.openRequestList(listName, inputArr)

  const crawler = new Apify.PuppeteerCrawler({
    requestList,
    handlePageFunction: async ({ request, page }) => {
      console.log(`Processing ${request.url}...`)

      const price = (await page.$eval('#aside-content .current-price-container', el => el.textContent)).trim()
      const title = (await page.$eval('#aside-content h1', el => el.textContent)).trim()
      const priceArr = price.split(/(\p{Sc}|([.0-9]+))/)
      const productId = request.url.split('/').slice(-1)[0]
      const results = {
        url: request.url,
        title,
        price,
        createdAt: new Date(),
        nominal: parseFloat(priceArr[1]),
        currency: priceArr[0],
        productId
      }

      products.push(results)

      await Apify.setValue('OUTPUT', products) // save to json

      return results
    },

    handleFailedRequestFunction: async ({ request }) => {
      console.log(`Request ${request.url} failed too many times`)
      await Apify.pushData({
        '#debug': Apify.utils.createRequestDebugInfo(request)
      })
    }
  })

  log.info('Starting the crawl.')
  await crawler.run()
  log.info('Crawl finished.')
})
