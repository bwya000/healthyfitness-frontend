import pool from '../../config/db.js'

export default async function favoriteProduct(req, res) {
  try {
    const memberId = req.query.member_id // 假設這是會員的ID，根據你的路由設計來獲取會員ID

    // 查詢會員收藏的商品ID
    const query = `SELECT p_id FROM favorite_product WHERE member_id=?`
    const [rows, fields] = await pool.query(query, [memberId])

    // 根據商品ID查詢商品詳細資訊
    const products = []
    for (const row of rows) {
      const productId = row.p_id
      const productQuery = `SELECT p_name,p_image,p_category,p_price FROM productall WHERE p_id=?`
      const [productRows, productFields] = await pool.query(productQuery, [
        productId,
      ])
      if (productRows.length > 0) {
        products.push(productRows[0])
      }
    }

    res.status(200).json({ productAll: products })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
