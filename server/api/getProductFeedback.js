import pool from '../config/db.js'

export default async function getproductFeedback(req, res) {
  try {
    // 从查询参数中获取 productID
    const { productID } = req.query

    // SQL语句：抓取p_id
    const query = `
      SELECT
          pf.feedback_id,
          pf.p_id,
          pf.score,
          pf.feedback_text,
          pf.member_id,
          pf.date,
          mt.name AS member_name
      FROM
          productfeedback pf
      JOIN
          member mt ON pf.member_id = mt.member_id
      WHERE
          pf.p_id = ?`

    const [rows, fields] = await pool.query(query, [productID])
    const productFeedback = rows

    // 提取 member_id 值，用于获取成员的 name
    const memberIDs = productFeedback.map((item) => item.member_id)

    // 查询成员信息
    const memberQuery = `
      SELECT
          member_id,
          name
      FROM
          member
      WHERE
          member_id IN (?)`

    const [memberRows] = await pool.query(memberQuery, [memberIDs])
    const memberMap = new Map(
      memberRows.map((item) => [item.member_id, item.name])
    )

    // 将成员的 name 添加到 productFeedback 中
    productFeedback.forEach((item) => {
      item.member_name = memberMap.get(item.member_id)
    })

    res.status(200).json({ success: productFeedback })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: undefined })
  }
}
