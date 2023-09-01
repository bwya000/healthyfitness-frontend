import pool from '../../config/db.js'

export default async function getFoodCard(req, res) {
  try {
    // 從查詢參數中取得 FoodID
    const { optionId } = req.query

    const query =
      'SELECT `FoodID`, `FoodName`, `FoodImgID` FROM `fooddata` WHERE `Food_categoryID` = ?'
    const [rows, fields] = await pool.query(query, [optionId])
    res.status(200).json({ Food: rows })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
