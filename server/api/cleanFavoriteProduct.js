import pool from '../config/db.js'

export default async function cleanFavoriteproduct(req, res) {
  try {
    const { p_id, memberid } = req.query
    // const { memberid } = req.body
    console.log(p_id, memberid)

    const query = 'DELETE FROM favorite_product WHERE member_id=? AND p_id= ?'
    const values = [memberid, p_id]

    const [result] = await pool.query(query, [memberid, p_id])

    res.status(200).json({ message: '成功移除收藏' })
  } catch (error) {
    console.error('獲取數據出錯:', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
