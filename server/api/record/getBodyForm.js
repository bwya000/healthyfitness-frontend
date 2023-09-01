import pool from '../../config/db.js'

export default async function getBodyForm(req, res) {
  try {
    const { MemberID } = req.query

    const query = `
      SELECT RecordID, MemberID, Height, Weight, Body_fat_percent, Waist, Hips, Activity_coefficient, Date
      FROM body_record
      WHERE MemberID = ?
      ORDER BY Date DESC
      LIMIT 1;
    `

    const [rows, fields] = await pool.query(query, [MemberID])
    res.status(200).json({ Body: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
