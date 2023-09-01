import pool from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export default async function postSportData(req, res) {
  try {
    const Sport_recordID = uuidv4()
    const sportData = req.body

    const query = `INSERT INTO sport_record(Sport_recordID, MemberID, SportID, time, date, Calorie) VALUES (?, ?, ?, ?, ?, ?)`

    const values = [
      Sport_recordID,
      sportData.MemberID,
      sportData.SportID,
      sportData.time,
      sportData.date,
      sportData.Calorie,
    ]

    const [result] = await pool.query(query, values)

    res.status(200).json({ message: '成功加入資料' })
  } catch (error) {
    console.error('獲取數據出錯:', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
