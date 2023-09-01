import pool from '../../config/db.js'
// uuid是orderid用
import { v4 as uuidv4 } from 'uuid'
//shortid是呈現給客戶端用,比較短
import shortid from 'shortid'

export default async function CreatOrder(req, res) {
  try {
    const orderId = uuidv4()
    const shortId = shortid.generate()
    const orderMain = req.body // 從前端接收 POST 請求中的資料
    const query = `INSERT INTO orderproduct_main (orderrealID, orderrealShortID,orderrealmemberID, PAY_methods, Shipping_methods, receiver, receiver_phone, Shipping_address, orderNote) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`
    const values = [
      orderId,
      shortId,
      orderMain.orderrealmemberID,
      orderMain.PAY_methods,
      orderMain.Shipping_methods,
      orderMain.receiver,
      orderMain.receiver_phone,
      orderMain.Shipping_address,
      orderMain.orderNote,
    ]
    const [result] = await pool.query(query, values)
    if (result.affectedRows > 0) {
      // 執行 SELECT 操作，查詢剛剛新增的訂單的建立時間
      const selectQuery = `SELECT orderreal_date FROM orderproduct_main WHERE orderrealID = ?`
      const [orderResult] = await pool.query(selectQuery, [orderId])
      const newDate = orderResult[0].orderreal_date
      res
        .status(200)
        .json({ neworderID: orderId, newshortID: shortId, newdate: newDate })
    } else {
      res.status(500).json({ error: '無法儲存訂單到資料庫。' })
    }
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
