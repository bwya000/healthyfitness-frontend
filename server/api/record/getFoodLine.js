import pool from '../../config/db.js'

export default async function getFoodLine(req, res) {
  try {
    const { startDate, endDate } = req.query

    const query = `
      SELECT 
        SUM(fd.Calorie) AS TotalCalorie,
        SUM(fd.Fat) AS TotalFat,
        SUM(fd.Protein) AS TotalProtein,
        SUM(fd.Carbohydrates) AS TotalCarbohydrates,
        fr.Date 
      FROM 
        fooddata fd 
      INNER JOIN 
        food_record fr 
      ON 
        fd.FoodID = fr.FoodID 
      WHERE 
        fr.MemberID = 'acc6d625-849b-4c1c-890a-f2e5d07f8027' 
        AND fr.Date BETWEEN '${startDate}' AND '${endDate}' 
      GROUP BY 
        fr.Date 
      ORDER BY 
        fr.Date;
    `

    const [rows, fields] = await pool.query(query)
    res.status(200).json({ Food: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
