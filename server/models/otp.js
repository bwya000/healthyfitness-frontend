// 資料庫查詢處理函式
import { insertOne, findOne, updateById, removeById } from './base.js'
import { generateToken } from '../config/otp.js'
import bcrypt from 'bcrypt'

const otpTable = 'otp'
const memberTable = 'member'

// 預設 exp = 30 分鐘到期(對應的是otp資料表中的exp_timestamp)
const createOtp = async (email, exp = 30) => {
  // 檢查使用者email是否存在
  const user = await findOne(memberTable, { email })
  // console.log(user);
  if (!user.email) return {}

  // 檢查otp是否已經存在(失敗or逾時重傳)
  const foundOtp = await findOne(otpTable, { email })

  // 有找到記錄，但因為在60s(秒)內不繼續產生新的otp
  if (
    foundOtp.member_id &&
    +new Date() - (foundOtp.exp_timestamp - exp * 60 * 1000) < 60 * 1000
  ) {
    console.log('錯誤: 60s(秒)內要求要重新產生otp')
    return {}
  }
  // 以下為"超過60s產生新的otp"或"沒找到記錄=沒產生過otp"

  // 以使用者輸入的Email作為secret產生otp token
  const token = generateToken(email)

  // 到期時間
  const exp_timestamp = +new Date() + exp * 60 * 1000

  // 建立otp物件
  const otp = {
    member_id: user.member_id,
    email,
    token,
    exp_timestamp,
  }
  // console.log(otp)
  // 建立新記錄
  const result = await insertOne(otpTable, otp)
  // console.log(result)

  return result.affectedRows ? { member_id: result.affectedRows, ...otp } : {}
}

// 內部用不導出: 尋找合法的(未過期的)otp記錄
// 有找到會回傳otp物件，沒找到會回傳空物件{}
const findOneValidOtp = async (email, token) => {
  // 回傳 {id, user_id, email, token, exp_timestamp}
  const otp = await findOne(otpTable, { email, token })

  // 沒找到資料
  if (!otp.member_id) return {}

  // 計算目前時間比對是否超過，到期的timestamp
  if (+new Date() > otp.exp_timestamp) return {}

  return otp
}

// 內部用不導出: 刪除otp記錄(註: 在使用者成功更新密碼後)
const removeOtpById = async (member_id) => {
  return removeById(otpTable, member_id)
}

// 更新密碼
const updatePassword = async (email, token, password) => {
  const otp = await findOneValidOtp(email, token)

  if (!otp.member_id) return false

 
  // 进行密码加密
  const hashedPassword = await bcrypt.hash(password, 10)

  // 修改密碼
  await updateById(memberTable, { password: hashedPassword }, otp.member_id)

  // 移除otp記錄
  await removeOtpById(otp.member_id)

  return true
}

export { createOtp, updatePassword }
