import pool from '../../config/db.js'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken' //ES6專用
const MAX_AGE = 60 * 60 * 24 * 30 //儲存時間

export default async function googleLogin(req, res) {
  try {
    const { id, email, name, image } = req.body
    // 檢查是否已經存在相同帳號
    const sql = 'SELECT * FROM member WHERE email = ?'
    const [rows] = await pool.query(sql, [email])
    //如果沒有此使用者
    if (rows.length === 0) {
      //插入資料到資料庫中
      const insertSql =
        'INSERT INTO member (member_id ,name, email, avatarname) VALUES (?, ?, ?, ?)'
      await pool.query(insertSql, [id, name, email, image])
      //並直接執行憑證
      //開始執行token
      const userEmail = email //為了配合格式
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
        //httpOnly: true, //目前無解,只要是true,前端代碼都會阻止去取出cookie
        secure: process.env.NODE_ENV === 'production', //生產環境
        sameSite: 'strict', //限制 Cookie 的跨站點傳輸
        maxAge: MAX_AGE,
        path: '/',
      })
      //抓取historyID
      const query = `SELECT watchdate,videoID  FROM history WHERE memberid = ?`
      const [rows, field] = await pool.query(query, [id])

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
            memberid: id,
          }
          resultforall.push(historyData)
        })
      )
      res.setHeader('Set-Cookie', seralized)
      //執行回傳此使用者資料
      res.status(200).json({
        user: {
          success: true,
          member_id: id,
          email: email,
          name: name,
          // birthday: user.birthday,
          // phone: user.phone_number,
          // address: user.address,
          avatarname: image,
        },
        videoHistory: resultforall,
      })
    }
    if (rows.length > 0) {
      const userEmail = email //為了配合格式
      //開始執行token
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
        //httpOnly: true, //目前無解,只要是true,前端代碼都會阻止去取出cookie
        secure: process.env.NODE_ENV === 'production', //生產環境
        sameSite: 'strict', //限制 Cookie 的跨站點傳輸
        maxAge: MAX_AGE,
        path: '/',
      })

      //抓取historyID
      const query = `SELECT watchdate,videoID  FROM history WHERE memberid = ?`
      const [rows, field] = await pool.query(query, [id])

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
            memberid: id,
          }
          resultforall.push(historyData)
        })
      )

      //修改標頭,必須要status之前(此時令牌已寫入cookie)
      res.setHeader('Set-Cookie', seralized)
      //執行回傳此使用者資料
      res.status(200).json({
        user: {
          success: true,
          member_id: id,
          email: email,
          name: name,
          avatarname: image,
        },
        videoHistory: resultforall,
      })
    }
  } catch (error) {
    console.error('註冊失敗:', error)
    res.status(500).json({ success: false, error: '註冊失敗' })
  }
}
