import pool from '../../config/db.js'

export default async function getSportCalDetail(req, res) {
  try {
    // 從查詢參數中取得 FoodID
    const { SportID } = req.query

    const query = `SELECT METs FROM sportdata WHERE SportID = ${SportID};`

    const [rows, fields] = await pool.query(query, [SportID])
    res.status(200).json({ Sport: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
