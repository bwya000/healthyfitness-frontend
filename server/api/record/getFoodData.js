import pool from '../../config/db.js'

export default async function getFoodData(req, res) {
  try {
    // 從查詢參數中取得 FoodID
    const { optionId } = req.query

    const query =
      'SELECT `Calorie`, `Fat`, `Protein`, `Carbohydrates` FROM `fooddata` WHERE `FoodImgID` = ?'
    const [rows, fields] = await pool.query(query, [optionId])
    res.status(200).json({ Food: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
