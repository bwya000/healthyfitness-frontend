import pool from '../../config/db.js'

export default async function getBodyRecord(req, res) {
  try {
    const { startDate, endDate } = req.query

    const query = `
    SELECT Height, Weight, Body_fat_percent, Waist, Hips, Activity_coefficient, Date
    FROM body_record
    WHERE Date <= '${endDate}' && MemberID = 'acc6d625-849b-4c1c-890a-f2e5d07f8027'
    ORDER BY Date DESC
    LIMIT 1;
        `

    const [rows, fields] = await pool.query(query)
    res.status(200).json({ Body: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
