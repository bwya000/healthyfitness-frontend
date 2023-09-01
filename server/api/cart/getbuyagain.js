import pool from '../../config/db.js'

export default async function getbuyagain(req, res) {
  const memberid = req.body.member

  try {
    const querymain = `SELECT orderrealID FROM orderproduct_main WHERE orderrealmemberID = ?`
    const querydetail = `SELECT orderrealdetail_PID FROM orderproduct_detail WHERE orderrealdetail_orderrealID = ?`
    const [rows, fields] = await pool.query(querymain, [memberid])

    let all = []
    await Promise.all(
      rows.map(async (item) => {
        const [rowsdetail, fieldsdetail] = await pool.query(querydetail, [
          item.orderrealID,
        ])
        all.push(rowsdetail)
      })
    )
    const inputArray = all
    // Step 1: 统计每个 name 的出现次数
    const nameCount = {}
    for (const subArray of inputArray) {
      for (const obj of subArray) {
        const orderrealdetail_PID = obj.orderrealdetail_PID
        nameCount[orderrealdetail_PID] =
          (nameCount[orderrealdetail_PID] || 0) + 1
      }
    }

    // Step 2: 根据出现次数进行降序排序
    const sortedNames = Object.keys(nameCount).sort(
      (a, b) => nameCount[b] - nameCount[a]
    )

    // Step 3: 构建结果数组，确保不重复
    const result = []
    for (const orderrealdetail_PID of sortedNames) {
      if (!result.includes(orderrealdetail_PID)) {
        result.push(orderrealdetail_PID)
      }
    }

    let allSku = []
    const skuquery = `SELECT skuID, p_name, p_description, p_specification, p_size, p_price, p_image FROM productall WHERE skuID = ? `
    await Promise.all(
      result.map(async (item) => {
        const [rows, fields] = await pool.query(skuquery, [item])
        allSku.push(rows[0])
      })
    )
    res.status(200).json({ success: allSku })
  } catch (error) {
    console.error('獲取數據出錯：', error)
    res.status(500).json({ error: '獲取數據出錯' })
  }
}
