import bcrypt from 'bcryptjs'

const createUser = async (id,image,name, email) => {
  //const hashedPassword = await bcrypt.hash(password, 10) //密碼加密

  const [result] = await global.connection.execute(
    'INSERT INTO member (member_id,avatarname,name, email) VALUES (?, ?, ?,?)', //在xampp的資料庫,建立一個名為register的database,並在其中設置一個table,名為'users' 欄位有[name,email,password](都是varchar)
    [id,image,name, email]
  ) //把 資料傳進資料庫

  return result.insertId
}

const getUserByEmail = async (email) => {
  const [rows] = await global.connection.execute(
    'SELECT * FROM member WHERE email = ?',
    [email]
  )

  return rows[0] || null
}

export default {
  createUser,
  getUserByEmail,
}