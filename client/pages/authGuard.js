//路由守衛
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

const useAuthGuard = () => {
  const [auth, setAuth] = useState(null) // 使用state設定auth值
  const memberIn = useSelector((state) => state.user.user.member_id) //判斷使用者是否有登入,這樣cookie就算有值(使用者登出狀態),也會是false
  const { data: userGoogle } = useSession()

  useEffect(() => {
    const getauth = async () => {
      try {
        const res = await axios.get('http://localhost:3005/checklogin', {
          withCredentials: true, // 設置攜帶憑證
        })
        const authValue = res.data.message && (memberIn || userGoogle)
        setAuth(authValue) // 設置auth值
      } catch (error) {
        //console.error('Error during GET request:', error)
        setAuth(false) // 如果有誤,改成false
      }
    }
    getauth()
  }, [])

  return auth // 返回auth提供使用
}

export default useAuthGuard
