import pool from '../config/db.js'

export default async function removeFavoriteVideo(req, res) {
  try {
    const { VideoID, member_id } = req.query
    const query = `
      DELETE FROM favorite_video WHERE member_id=? AND VideoID =? `
    const values = [member_id, VideoID]

    const [result] = await pool.query(query, values)

    res.status(200).json({
      success: '刪除成功',
    })
  } catch (error) {
    console.error('刪除數據出錯：', error)
    res.status(500).json({ error: '刪除數據出錯' })
  }
}
