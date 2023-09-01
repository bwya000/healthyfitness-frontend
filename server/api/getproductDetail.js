import pool from '../config/db.js'

export default async function getproductDetail(req, res) {
  try {
    // 從查詢參數中取得 VideoID
    const { productID } = req.query

    // SQL語法 抓取p_id
    const query =
      'SELECT `skuID`, `p_id`, `p_name`, `p_description`, `p_specification`, `p_size`, `p_price`, `p_quantitly`, `p_image`, `category_id` FROM `productall` WHERE p_id = ?'
    const [rows, fields] = await pool.query(query, [productID])
    const productDetail = rows

    res.status(200).json({ success: productDetail })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
