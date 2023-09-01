import pool from '../../config/db.js'

export default async function getRecordCal(req, res) {
  try {
    const query = `
      SELECT DateMonth, 
      IFNULL(SUM(FoodCalorie), 0) AS TotalFoodCalorie,
      IFNULL(SUM(SportCalorie), 0) AS TotalSportCalorie
      FROM (
      SELECT DATE_FORMAT(fr.Date, '%Y-%m') AS DateMonth, SUM(fd.Calorie) AS FoodCalorie, 0 AS SportCalorie
      FROM fooddata fd 
      INNER JOIN food_record fr ON fd.FoodID = fr.FoodID 
      WHERE fr.MemberID = 'acc6d625-849b-4c1c-890a-f2e5d07f8027' AND fr.Date BETWEEN '2023-01-01' AND '2023-09-30' 
      GROUP BY DateMonth

      UNION

      SELECT DATE_FORMAT(Date, '%Y-%m') AS DateMonth, 0 AS FoodCalorie, SUM(Calorie) AS SportCalorie
      FROM sport_record 
      WHERE MemberID = 'acc6d625-849b-4c1c-890a-f2e5d07f8027' AND Date BETWEEN '2023-01-01' AND '2023-09-30' 
      GROUP BY DateMonth
      ) AS combined_results
      GROUP BY DateMonth;

    `

    const [rows, fields] = await pool.query(query)
    res.status(200).json({ Cal: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
