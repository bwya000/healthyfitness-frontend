import pool from '../config/db.js'
import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken' //ES6專用
const MAX_AGE = 60 * 60 * 24 * 30 //儲存時間

export default async function Login(req, res) {
  try {
    //使用者匹配
    const email = req.body.email
    const password = req.body.password

    const query = `SELECT * FROM member WHERE email = ?`

    //比對帳號
    const result = await pool.query(query, [email])

    // 如果找不到匹配的email
    if (result[0].length === 0) {
      //我改這邊 , 改成result[0]
      return res.status(401).json({ error: '帳號不存在' })
    }
    //如果有找到
    const user = result[0][0]

    // 接著比對密碼
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      //登入失敗
      return res.status(601).json({ error: '密碼不正確' })
    } else {
      const userEmail = user.email //為了配合格式
      //如果密碼也比對成功,開始執行token
      const secret = process.env.JWT_SECRET || ''
      const token = jwt.sign(
        {
          userEmail,
        },
        secret,
        {
          expiresIn: MAX_AGE,
        }
      )
      //存入cookie方法
      const seralized = serialize('OutSiteJWT', token, {
        // httpOnly: true, 目前無解,只要是true,前端代碼都會阻止去取出cookie
        secure: process.env.NODE_ENV === 'production', //生產環境
        sameSite: 'strict', //限制 Cookie 的跨站點傳輸
        maxAge: MAX_AGE,
        path: '/',
      })

      //抓取historyID
      const query = `SELECT watchdate,videoID  FROM history WHERE memberid = ?`
      const [rows, field] = await pool.query(query, [user.member_id])

      const resultforall = []
      await Promise.all(
        rows.map(async (item) => {
          const watchdate = item.watchdate
          const videoID = item.videoID
          const query = `SELECT Title,Description,vidthumbnail FROM fitvideos WHERE VideoID = ?`
          const [rows, field] = await pool.query(query, [videoID])
          const historyData = {
            VideoID: videoID,
            watchdate: watchdate,
            Title: rows[0].Title,
            Description: rows[0].Description,
            vidthumbnail: rows[0].vidthumbnail,
            memberid: user.member_id,
          }
          resultforall.push(historyData)
        })
      )
      console.log(resultforall)

      //修改標頭,必須要status之前(此時令牌已寫入cookie)
      res.setHeader('Set-Cookie', seralized)
      //執行回傳此使用者資料
      res.status(200).json({
        user: {
          success: true,
          member_id: user.member_id,
          email: user.email,
          name: user.name,
          birthday: user.birthday,
          phone: user.phone_number,
          address: user.address,
          avatarname: user.avatarname,
        },
        videoHistory: resultforall,
      })
    }
  } catch (error) {
    console.error('數據庫查詢錯誤:', error)
    res.status(500).json({ error: '數據庫查詢錯誤' })
  }
}
