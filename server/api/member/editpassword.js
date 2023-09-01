import pool from '../../config/db.js'
import bcrypt from 'bcrypt'

export default async function EditPassword(req, res) {
  try {
    const fixuser = req.body

    const member_id = fixuser.member_id
    const oldPassword = fixuser.oldPassword
    const newPassword = fixuser.newPassword

    // 查詢用戶是否存在
    const query = `SELECT password FROM member WHERE member_id = ?`

    const [rows] = await pool.query(query, [member_id])

    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: '用戶不存在' })
    }

    const storedPassword = rows[0].password

    // 匹配密碼
    const isPasswordMatch = await bcrypt.compare(oldPassword, storedPassword)
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: '舊密碼輸入不正確' })
    }

    // 更新密碼
    const salt = 8
    const newhashPassword = await bcrypt.hash(newPassword, salt)
    const updateQuery = `UPDATE member SET password = ? WHERE member_id = ?`
    await pool.query(updateQuery, [newhashPassword, member_id])

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
}
