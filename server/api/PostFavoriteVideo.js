import pool from '../config/db.js'
import { v4 as uuidv4 } from 'uuid'

export default async function PostFavoriteVideo(req, res) {
  try {
    const favv_id = uuidv4() //歷史紀錄id
    const orderMain = req.body //存儲主體
    console.log(orderMain)
    const query = `
    INSERT INTO favorite_video(favv_id, member_id, VideoID) VALUES (?,?,?)`
    const values = [favv_id, orderMain.memberid, orderMain.VideoID]

    // 執行插入數據庫
    const [result] = await pool.query(query, values)

    res.status(200).json({
      success: '1111',
    })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
