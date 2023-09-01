import pool from '../../config/db.js'

export default async function Orderlist(req, response) {
  try {
    const memberid = req.body.memberid // 從前端接收 POST 請求中的資料
    const query =
      'SELECT orderrealID, orderrealShortID, PAY_methods, Shipping_methods, receiver, receiver_phone, Shipping_address, orderNote, orderreal_date FROM orderproduct_main WHERE orderrealmemberID = ?'

    const queryDetail =
      'SELECT orderrealdetailID, orderrealdetail_orderrealID, orderrealdetail_PID, buynum FROM orderproduct_detail WHERE orderrealdetail_orderrealID = ?'

    const querySku =
      'SELECT skuID, p_id, p_name, p_description, p_specification, p_size, p_price, p_quantitly, p_image, category_id FROM productall WHERE skuID = ?'

    const res = await pool.query(query, memberid)

    const oneforall = await Promise.all(
      res[0].map(async (item) => {
        const ordermain = {
          orderrealID: item.orderrealID,
          orderrealShortID: item.orderrealShortID,
          PAY_methods: item.PAY_methods,
          Shipping_methods: item.Shipping_methods,
          receiver: item.receiver,
          receiver_phone: item.receiver_phone,
          Shipping_address: item.Shipping_address,
          orderNote: item.orderNote,
          orderreal_date: item.orderreal_date,
        }

        const resdetail = await pool.query(queryDetail, ordermain.orderrealID)
        const list = await Promise.all(
          resdetail[0].map(async (item) => {
            const skudetal = await pool.query(
              querySku,
              item.orderrealdetail_PID
            )
            return { ...item, ...skudetal[0][0] }
          })
        )

        const allmessage = { finalmain: [ordermain], finaldetail: list }
        return allmessage
      })
    )

    response.status(200).json({ success: oneforall })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    response.status(500).json({ error: '獲取數據出錯' })
  }
}
