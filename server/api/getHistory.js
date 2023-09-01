import pool from '../config/db.js';

export default async function getHistory(req, res) {
  try {
    const query = `
      SELECT
        fitvideos.VideoID,
        fitvideos.Title,
        fitvideos.Description,
        fitvideos.vidURL,
        fitvideos.vidthumbnail,
        history.historyID,
        history.watchdate
      FROM
        fitvideos
      INNER JOIN
        history
      ON
        history.videoID = fitvideos.VideoID;
    `;

    const [rows, fields] = await pool.query(query);
    res.status(200).json({ history: rows });
  } catch (error) {
    console.error('獲取數據出錯：', error);
    res.status(500).json({ error: '獲取數據出錯' });
  }
}
