import pool from '../../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export default async function postFoodData(req, res) {
  try {
    const RecordID = uuidv4()
    const foodData = req.body

    const query = `INSERT INTO food_record(RecordID, MemberID, FoodID, date) VALUES (?, ?, ?, ?)`
    const values = [RecordID, foodData.MemberID, foodData.FoodID, foodData.date]

    const [result] = await pool.query(query, values)

    res.status(200).json({ message: '成功加入資料' })
  } catch (error) {
    console.error('獲取數據出錯:', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
