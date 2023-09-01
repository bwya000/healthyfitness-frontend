import pool from '../config/db.js' // 假設你已經設定了資料庫連線
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export default async function Register(req, res) {
  try {
    console.log(req.body)
    const memeberId = uuidv4()
    // 從 req.body 中取得註冊資訊
    const { email, password, name, birthday, gender } = req.body

    // 檢查是否已經存在相同帳號
    const sql = 'SELECT * FROM member WHERE email = ?'
    try {
      const [rows] = await pool.query(sql, [email])
      console.log(rows)
      if (rows.length > 0) {
        return res.status(400).json({ error: '帳號已存在' })
      }
    } catch (err) {
      console.error('ERROR:', err)
      return res.status(500).json({ error: '伺服器錯誤' })
    }

    // 密碼加密
    const salt = 8
    const hashPassword = await bcrypt.hash(password, salt)

    // 插入資料到資料庫中
    const insertSql =
      'INSERT INTO member (member_id ,name, email, password, gender, birthday) VALUES (?, ?, ?, ?, ?, ?)'
    try {
      await pool.query(insertSql, [
        memeberId,
        name,
        email,
        hashPassword,
        gender,
        birthday,
      ])
      return res.status(201).json({ message: '註冊成功' })
    } catch (err) {
      console.error('ERROR:', err)
      return res.status(503).json({ error: '伺服器錯誤' })
    }
  } catch (error) {
    console.error('註冊失敗:', error)
    res.status(500).json({ success: false, error: '註冊失敗' })
  }
}
