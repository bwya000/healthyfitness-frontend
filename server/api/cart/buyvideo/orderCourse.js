//用於"購買影片課程"
import pool from '../../../config/db.js'
// uuid是orderid用
import { v4 as uuidv4 } from 'uuid'
//shortid是呈現給客戶端用,比較短
import shortid from 'shortid'

export default async function OrderCourse(req, res) {
  // 格式化日期函式
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  try {
    const order = req.body
    const shortId = shortid.generate() //訂單編號
    const memberid = order.memberid //會員id
    const course = order.course // 課程內容,是一個[1,2,3]
    // console.log(course)

    const currentDate = new Date()
    const formattedCurrentDate = formatDate(currentDate) //現在時間 = 訂單成立日 = 權限起始日
    const endDate = '0000/00/00' // 未來時間 = 權限終止日 = 永不

    //資料庫寫入
    const query = `INSERT INTO videoorder_course (id, shortid,memberid,videoid,startDate, endDate) VALUES (?, ?, ?, ?, ?,? )`

    //要寫入的資料
    await Promise.all(
      course.map(async (vid) => {
        const id = uuidv4() //主訂單id(流水號)
        const queryOrder = [
          id,
          shortId,
          memberid,
          vid,
          formattedCurrentDate,
          endDate,
        ]
        const [rows, field] = await pool.query(query, queryOrder)
      })
    )

    //要抓取的資料
    let result = []
    const queryvideo = `SELECT Title, vidthumbnail FROM fitvideos WHERE VideoID = ?`
    await Promise.all(
      course.map(async (vid) => {
        const [rows, field] = await pool.query(queryvideo, [vid])
        result.push({ ...rows[0], stateDate: formattedCurrentDate })
      })
    )

    if (result.length > 0) {
      res.status(200).json({
        success: result,
        shortId: shortId,
        stateDate: formattedCurrentDate,
      })
    } else {
      res.status(500).json({ error: '無法儲存訂閱訂單到資料庫。' })
    }
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
