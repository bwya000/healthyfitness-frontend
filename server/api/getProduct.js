import pool from '../config/db.js'

export default async function getProduct(req, res) {
  try {
    const query =
      'SELECT p_id, p_name,p_price,p_image,category_id FROM productlist'
    const [rows, fields] = await pool.query(query)
    res.status(200).json({ productAll: rows })
    // res.status(200).json(rows)
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
