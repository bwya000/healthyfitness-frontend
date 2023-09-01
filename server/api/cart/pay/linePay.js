import 'dotenv/config.js'
import hmacSHA256 from 'crypto-js/hmac-sha256.js'
import Base64 from 'crypto-js/enc-base64.js'
import axios from 'axios'

export default async function LinePay(req, res) {
  const LINEPAY_CHANNEL_ID = process.env.LINEPAY_CHANNEL_ID
  const LINEPAY_VERSION = process.env.LINEPAY_VERSION
  const LINEPAY_SITE = process.env.LINEPAY_SITE
  const LINEPAY_CHANNEL_SECRET_KEY = process.env.LINEPAY_CHANNEL_SECRET_KEY
  const LINEPAY_RETURN_HOST = process.env.LINEPAY_RETURN_HOST
  const LINEPAY_RETURN_CONFIRM_URL = process.env.LINEPAY_RETURN_CONFIRM_URL
  const LINEPAY_RETURN_CANCEL_URL = process.env.LINEPAY_RETURN_CANCEL_URL
  try {
    const forlinepay = req.body

    // 使用map方法將原本的訂單格式,轉換成linePay要得 -> 商品
    const transformedArray = forlinepay.product.map((item) => ({
      name: item.productTitle,
      quantity: item.productNum,
      price: item.productPrice,
    }))
    //Linepay必要格式
    const order = {
      orderId: forlinepay.orderID,
      currency: 'TWD',
      amount: forlinepay.amount,
      packages: [
        {
          id: forlinepay.orderID,
          amount: forlinepay.amount,
          products: transformedArray,
        },
      ],
    }

    const LinePayBody = {
      ...order,
      redirectUrls: {
        confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
        cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
      },
    }

    const uri = '/payments/request'
    const nonce = new Date().getTime()

    const encrypt = hmacSHA256(
      `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
        LinePayBody
      )}${nonce}`,
      LINEPAY_CHANNEL_SECRET_KEY
    )

    const signature = Base64.stringify(encrypt) //要給LinePay的簽章內容

    const headers = {
      'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
      'Content-Type': 'application/json',
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature,
    }
    // API 位址
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`

    const linePayRes = await axios.post(url, LinePayBody, { headers })
    // console.log(linePayRes.data)
    // console.log(headers)
    // 請求成功...
    if (linePayRes?.data?.returnCode === '0000') {
      // res.redirect(linePayRes?.data?.info.paymentUrl.web)
      // res.status(200).json({ sucess: linePayRes?.data?.info.paymentUrl.web })
      res.status(200).json({
        redirectUrl: linePayRes?.data?.info.paymentUrl.web,
        linepayamount: order.amount,
      })
    } else {
      res.status(400).send({
        message: '訂單不存在',
      })
    }
  } catch (error) {
    console.error('linepay付款錯誤', error)
    res.status(500).json({ error: 'linepay付款錯誤' })
  }
}
