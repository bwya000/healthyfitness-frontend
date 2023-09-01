import pool from '../../config/db.js'
export default async function FindskuID(req, res) {
  try {
    const getskuID = req.body // 從前端接收 POST 請求中的資料
    // console.log(getskuID)
    const query = `SELECT * FROM productall WHERE p_id = ? and p_specification = ? and p_size = ? `
    const [rows, fields] = await pool.query(query, [
      getskuID.p_id,
      getskuID.p_specification,
      getskuID.p_size,
    ])

    res.status(200).json({ message: rows[0] })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
