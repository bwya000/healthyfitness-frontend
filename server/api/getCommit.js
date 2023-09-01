import pool from '../config/db.js'

export default async function getCommit(req, res) {
  const judge = req.body
  try {
    const query =
      'INSERT INTO productfeedback(p_id, score, feedback_text,member_id) VALUES (?,?,?,?)'
    const [rows, fields] = await pool.query(query, [
      judge.pid,
      judge.stars,
      judge.commit,
      judge.memberid,
    ])
    if (rows.affectedRows) {
      res.status(200).json({ success: true })
    }
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
