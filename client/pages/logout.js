import React from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
// import { reset } from './store/cartSlice';
import { useDispatch } from 'react-redux'
import { reset } from './store/cartSlice'
import { resetfavoriteProductSlice } from './store/favoriteproductSlice'
import { resetfavoriteVideoSlice } from './store/favoriteVideoSlice'
import { resethistoryList } from './store/historySlice'
import { resetuser } from './store/userSlice'
import { signOut, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Logout() {
  const user_Data = useSelector((state) => state.user.user)
  const { data: userGoogle } = useSession()
  const MySwal = withReactContent(Swal)
  const router = useRouter()

  const [cookies, setCookie, removeCookie] = useCookies()
  const dispatch = useDispatch()
  useEffect(() => {
    // 移除所有 cookie
    const cookieNames = Object.keys(cookies)
    cookieNames.forEach((cookieName) => {
      //console.log(cookieName);
      removeCookie(cookieName)
    })

    // reset 所有 redux
    dispatch(reset()) // 初始化購物車
    dispatch(resetfavoriteProductSlice()) // 初始化商品加入收藏
    dispatch(resetfavoriteVideoSlice()) // 初始化影片加入收藏
    dispatch(resethistoryList()) // 初始化歷史紀錄
    dispatch(resetuser()) // 初始化使用者

    // 清除 Local Storage
    localStorage.clear()

    // 判断并执行不同的登出逻辑
    if (userGoogle) {
      // 执行 Google 账号的登出逻辑
      // 使用 SweetAlert 弹窗跳转到登录页
      signOut()
      let timerInterval
      Swal.fire({
        title: '已登出！即將回到首頁',
        html: 'will be closed in <b></b> milliseconds.',
        timer: 1800,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
          router.push(`http://localhost:3000`)
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }

    if (user_Data) {
      // 执行网站会员的登出逻辑
      // Your custom logout logic for logged-in users
      // 使用 SweetAlert 弹窗跳转到登录页
      let timerInterval
      Swal.fire({
        title: '已登出！即將回到首頁',
        html: 'will be closed in <b></b> milliseconds.',
        timer: 1800,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
          router.push(`http://localhost:3000`)
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }
  }, [dispatch, cookies, removeCookie, userGoogle, user_Data])

  return (
    <>
      <div style={{ marginTop: '110px' }}></div>
    </>
  )
}
