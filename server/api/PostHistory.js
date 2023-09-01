import pool from '../config/db.js'
import { v4 as uuidv4 } from 'uuid';


export default async function PostHistory(req, res) {
  try {
    const historyID = uuidv4() //歷史紀錄id
    const orderMain = req.body //存儲主體
    console.log(orderMain)
    const query = `
    INSERT INTO history(historyID, watchdate, videoID ,memberid) VALUES (?,?,?,?)`
    const values = [
      historyID,
      orderMain.watchdate,
      orderMain.VideoID,
      orderMain.memberid,
    ]

    // 執行插入數據庫
    const [result] = await pool.query(query, values)

    res.status(200).json({
      success: '1111',
    })
  } catch (error) {
    console.error('获取数据出错：', error)
    res.status(500).json({ error: '获取数据出错' })
  }
}
