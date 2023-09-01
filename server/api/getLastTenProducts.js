import pool from '../config/db.js'

export default async function getLastTenProducts(req, res) {
  try {
    const query = 'SELECT * FROM productlist ORDER BY p_id DESC LIMIT 10'
    const [rows, fields] = await pool.query(query)
    res.status(200).json({ productAll: rows })
    console.log(rows)
    // res.status(200).json(rows)
  } catch (error) {
    console.error('獲取最後十個產品時出錯：', error)
    
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
