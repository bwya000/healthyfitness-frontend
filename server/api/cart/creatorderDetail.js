import pool from '../../config/db.js'

export default async function CreatorderDetail(req, res) {
  try {
    const orderProduct = req.body // 從前端接收 POST 請求中的資料
    // 取得 neworderID
    const neworderID = orderProduct.neworderID
    //取得訂單商品細節
    const shoppingcart = orderProduct.productDetail

    // console.log(orderProduct)
    await Promise.all(
      shoppingcart.map(async (item) => {
        const productId = item.productId
        const productNum = item.productNum

        // 插入到資料庫中
        const query = `INSERT INTO orderproduct_detail (orderrealdetail_orderrealID, orderrealdetail_PID, buynum) VALUES (?, ?, ?)`
        const values = [neworderID, productId, productNum]

        await pool.query(query, values)
      })
    )
    res.status(200).json({ message: '商品細項已成功儲存到資料庫。' })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
