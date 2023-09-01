import 'dotenv/config.js'
import hmacSHA256 from 'crypto-js/hmac-sha256.js'
import Base64 from 'crypto-js/enc-base64.js'
import axios from 'axios'
const LINEPAY_CHANNEL_ID = process.env.LINEPAY_CHANNEL_ID
const LINEPAY_VERSION = process.env.LINEPAY_VERSION
const LINEPAY_SITE = process.env.LINEPAY_SITE
const LINEPAY_CHANNEL_SECRET_KEY = process.env.LINEPAY_CHANNEL_SECRET_KEY
export default async function LinepaySuccess(req, res) {
  const transactionId = req.body.transactionId //交易id
  const linepayAmount = req.body.linepayAmount //取出訂單總額
  try {
    // 建立 LINE Pay 請求規定的資料格式
    const uri = `/payments/${transactionId}/confirm`
    const linePayBody = {
      amount: linepayAmount,
      currency: 'TWD',
    }
    //建立加密內容
    const nonce = new Date().getTime()
    const encrypt = hmacSHA256(
      `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
        linePayBody
      )}${nonce}`,
      LINEPAY_CHANNEL_SECRET_KEY
    )
    const signature = Base64.stringify(encrypt)

    const headers = {
      'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
      'Content-Type': 'application/json',
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature,
    }

    // API 位址
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`
    const linePayRes = await axios.post(url, linePayBody, { headers })

    // 請求成功...
    if (linePayRes?.data?.returnCode === '0000') {
      res.status(200).json({ success: true })
    } else {
      res.status(400).send({
        message: linePayRes,
      })
    }
  } catch (error) {
    console.log(error)
    // 各種運行錯誤的狀態：可進行任何的錯誤處理
    res.end()
  }
}
