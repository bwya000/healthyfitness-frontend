//sevebMap的API

import puppeteer from 'puppeteer'

export default async function SevenMapScrape(req, res) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(
    'https://myship2.7-11.com.tw/Home/StoreLookup/?customType=Sender'
  )

  const targetCloseBrowser = '#submit_butn'
  await page.waitForSelector(targetCloseBrowser)

  // 等待用戶點擊元素
  await page.waitForFunction(
    (targetCloseBrowser) => {
      const element = document.querySelector(targetCloseBrowser)
      return new Promise((resolve) => {
        element.addEventListener('click', resolve, { once: true })
      })
    },
    {},
    targetCloseBrowser
  )
  await page.waitForTimeout(3000)
  const storeId = await page.evaluate((selector) => {
    const element = document.querySelector(selector)
    return element ? element.value : null
  }, '#storeId')

  const storeName = await page.evaluate((selector) => {
    const element = document.querySelector(selector)
    return element ? element.value : null
  }, '#storeName')

  const storeAddress = await page.evaluate((selector) => {
    const element = document.querySelector(selector)
    return element ? element.value : null
  }, '#storeAddress')

  await browser.close()

  const data = {
    storeId,
    storeName,
    storeAddress,
  }

  res.status(200).json(data)
}
