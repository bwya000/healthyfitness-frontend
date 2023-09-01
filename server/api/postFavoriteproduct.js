import pool from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export default async function postFavoriteproduct(req, res) {
  try {
    const favp_id = uuidv4()
    const postproduct = req.body

    const query = `INSERT INTO favorite_product (favp_id, member_id, p_id) VALUES (?, ?, ?)`
    const values = [favp_id, postproduct.member_id, postproduct.p_id]

    const [result] = await pool.query(query, values)

    res.status(200).json({ message: '成功加入收藏' })
  } catch (error) {
    console.error('獲取數據出錯:', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
