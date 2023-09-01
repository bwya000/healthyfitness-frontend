import pool from '../../config/db.js'

export default async function Getmaybe(req, res) {
  try {
    const pid = req.body.Pid // 從前端接收 POST 請求中的資料
    const query = `SELECT p_name, p_price, p_image, category_id FROM productlist WHERE p_id= ? `
    const result = await pool.query(query, pid)

    res.status(200).json({ message: result[0][0] })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
