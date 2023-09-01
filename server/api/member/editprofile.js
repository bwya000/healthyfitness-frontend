import pool from '../../config/db.js'

export default async function EditProfile(req, res) {
  try {
    const fixuser = req.body
    //取出所有要求資料
    const member_id = fixuser.member_id
    const name = fixuser.name
    const email = fixuser.email
    const birthday = fixuser.birthday
    const phone = fixuser.phone
    const fullAddress = fixuser.address
    const avatarname = fixuser.avatarname

    // 查詢資料庫中符合 email 的會員資料
    const query = `UPDATE member SET 
                      name = ?, 
                      email = ?, 
                      birthday = ?, 
                      phone_number = ?, 
                      address = ?, 
                      avatarname = ? 
                      WHERE member_id = ?`

    const result = await pool.query(query, [
      name,
      email,
      birthday,
      phone,
      fullAddress,
      avatarname,
      member_id,
    ])

    res.status(200).json({ success: true })
    // const result = await pool.query(query, [email], (err, result) => {
    //   if (err) {
    //     console.error('資料庫查詢錯誤：', err);
    //     res.status(500).json({ message: '伺服器錯誤' });
    //   } else {
    //     if (result.length === 0) {
    //       res.status(404).json({ message: '找不到該會員資料' });
    //     } else {
    //       const memberData = result[0];
    //       console.log(memberData)
    //       // 回傳會員資料給前端
    //       res.json(memberData);
    //     }
    //   }
    // });
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
}
