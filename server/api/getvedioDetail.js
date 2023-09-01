//我的影片細節API//

import pool from '../config/db.js'

export default async function getvedioDetail(req, res) {
  try {
    // 從查詢參數中取得 VideoID
    const { videoID } = req.query

    const query = `
  SELECT
    fv.Title,
    fv.ReleaseDate,
    fv.Description,
    fv.vidURL,
    fv.vidthumbnail,
    fv.musclegroupID,
    cm.classname,
    mg.muscleName
  FROM
    fitvideos fv
  LEFT JOIN
    classmultipack cm ON fv.classmultipackID = cm.classmultipackID
  LEFT JOIN
    muscle_group mg ON fv.musclegroupID = mg.musclegroupID
  WHERE
    fv.VideoID = ?`;

    
    const [rows, fields] = await pool.query(query, [videoID])
    res.status(200).json({ videoDetail: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
