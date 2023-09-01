//用於"影片訂閱訂單"
import pool from '../../../config/db.js'
// uuid是orderid用
import { v4 as uuidv4 } from 'uuid'
//shortid是呈現給客戶端用,比較短
import shortid from 'shortid'

export default async function OrderSub(req, res) {
  var price = 0
  // 格式化日期函式
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  try {
    const order = req.body
    const id = uuidv4() //主訂單id
    const shortId = shortid.generate() //訂單編號
    const memberid = order.memberid //會員id
    const subday = order.subday //訂閱時長

    const currentDate = new Date()
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + subday)
    // eslint-disable-next-line no-undef
    const formattedCurrentDate = formatDate(currentDate) //現在時間
    // eslint-disable-next-line no-undef
    const formattedFutureDate = formatDate(futureDate) //未來時間

    //資料庫寫入
    const query = `INSERT INTO videoorder_sub (id, shortid,memberid, startDate, endDate) VALUES (?, ?, ?, ?, ? )`
    //要寫入的資料
    const queryOrder = [
      id,
      shortId,
      memberid,
      formattedCurrentDate,
      formattedFutureDate,
    ]
    const [rows] = await pool.query(query, queryOrder)
    if (subday === 90) {
      price = 1199
    } else if (subday === 180) {
      price = 2299
    } else if (subday === 360) {
      price = 3999
    }
    //所有訂閱訂單明細
    const orderDetail = {
      shortId,
      memberid,
      subday,
      formattedCurrentDate,
      formattedFutureDate,
      price,
    }
    if (rows.affectedRows > 0) {
      res.status(200).json({ success: orderDetail })
    } else {
      res.status(500).json({ error: '無法儲存訂閱訂單到資料庫。' })
    }
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
