import pool from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export default async function postBodyData(req, res) {
  try {
    const RecordID = uuidv4()
    const bodyData = req.body
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]

    const query = `INSERT INTO body_record(RecordID, MemberID, Height, Weight, Body_fat_percent, Waist, Hips, Activity_coefficient, Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const values = [
      RecordID,
      bodyData.MemberID,
      bodyData.height,
      bodyData.weight,
      bodyData.bodyFatPercent,
      bodyData.waist,
      bodyData.hips,
      bodyData.activityCoefficient,
      formattedDate,
    ]

    const [result] = await pool.query(query, values)

    res.status(200).json({ message: '成功加入資料' })
  } catch (error) {
    console.error('獲取數據出錯:', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
