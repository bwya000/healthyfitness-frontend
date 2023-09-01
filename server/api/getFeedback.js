import pool from '../config/db.js'

export default async function getFeedback(req, res) {
  try {
    // 從查詢參數中取得 feedbackID
    const memberid = 1 //req.body //1
    const query1 = `SELECT orderrealID FROM orderproduct_main WHERE orderrealmemberID = ? `
    const [rows1, fields1] = await pool.query(query1, [memberid])

    rows1[0]

    // SQL 語法，抓取相關資料
    // const query = `
    //   SELECT
    //     om.orderrealID, om.orderrealShortID, om.orderrealmemberID, om.PAY_methods,
    //     om.Shipping_methods, om.receiver, om.receiver_phone, om.Shipping_address,
    //     om.orderNote, om.orderreal_date, om.paymentStatus,

    //     od.orderrealdetailID, od.orderrealdetail_PID, od.buynum,
    //     pa.skuID, pa.p_id, pa.p_name, pa.p_description, pa.p_specification,
    //     pa.p_size, pa.p_price, pa.p_quantitly, pa.p_image, pa.category_id
    //   FROM orderproduct_main AS om
    //   INNER JOIN orderproduct_detail AS od ON om.orderrealID = od.orderrealdetail_orderrealID
    //   INNER JOIN productall AS pa ON od.orderrealdetail_PID = pa.skuID
    //   WHERE om.orderrealID = ? ;
    // `

    // const [rows, fields] = await pool.query(query, [
    //   `0757970c-eb77-482f-9dad-da14dcca9254`,
    //   feedbackID,
    // ]) // 這裡假設固定的會員 ID 為 1 //商品ID是3
    // const productFeedback = rows

    res.status(200).json({ success: productFeedback })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
