import pool from '../../config/db.js'

export default async function getSportCal(req, res) {
  try {
    const { startDate, endDate } = req.query

    const query = `
    WITH date_series AS (
      SELECT DATE_ADD('${startDate}', INTERVAL n DAY) AS date_series
      FROM (
        SELECT 0 AS n UNION ALL
        SELECT 1 UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6
      ) AS numbers
      WHERE DATE_ADD('${startDate}', INTERVAL n DAY) <= '${endDate}'
    )
    SELECT date_series.date_series, IFNULL(sport_data.Calorie, 0) AS Calorie
    FROM date_series
    LEFT JOIN (
      SELECT date, Calorie
      FROM sport_record
      WHERE date BETWEEN '${startDate}' AND '${endDate}'
    ) AS sport_data ON date_series.date_series = sport_data.date
    ORDER BY date_series.date_series;
    `

    const [rows, fields] = await pool.query(query)
    res.status(200).json({ Sport: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
