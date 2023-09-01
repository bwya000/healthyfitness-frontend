'use client'
import React from 'react'
import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import styles from './member.module.css'
import styles2 from '@/styles/login.module.css'
import Link from 'next/link'
import LineLogo from '@/components/icons/line-logo'
import GoogleLogo from '@/components/icons/google-logo'
import FacebookLogo from '@/components/icons/facebook-logo'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
//redux用
import { useSelector, useDispatch } from 'react-redux'
//登入者碎片
import { setuserData, setFavoriteProductData } from '@/pages/store/userSlice'
import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function LoginForm() {
  const MySwal = withReactContent(Swal)
  // console.log(session);
  // 使用 useSession 钩子获取用户会话数据
  //redux用於寫入資料,使用方式 dispatch(你的方法)
  const dispatch = useDispatch()

  const router = useRouter()
  //登入者登入資料
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const originErrors = {
    email: '',
    password: '',
  }

  //錯誤訊息
  const [errors, setErrors] = useState(originErrors)

  // const [loading, setLoading] = useState(false)

  // const loader = (
  //   <div className={styles['lds-ripple']}>
  //     <div></div><div></div></div>
  // )

  //所有表單欄位共用的事件處理函式
  const handleFieldChange = (e) => {
    const loginUser = { ...user, [e.target.name]: e.target.value }
    setUser(loginUser)
  }

  //表單送出用的事件處理函式
  const handleSubmit = async (e) => {
    //阻擋表單預設送出行為
    e.preventDefault() //**/

    let hasErrors = false
    const newErrors = { ...originErrors }

    //直接用狀態中的資料來檢查
    if (!user.email) {
      newErrors.email = '請填寫email'
      hasErrors = true
    }
    if (!user.password) {
      newErrors.password = '請填寫密碼'
      hasErrors = true
    }

    //如果中途有檢查出錯誤，跳出此送出處理函式
    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    //下面是通過所有檢查，要送至伺服器
    try {
      // 在這裡發送POST請求到後端驗證
      const response = await axios.post(
        'http://localhost:3005/api/login',
        {
          email: user.email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      )
      // 假設後端回傳的驗證結果在response.data中，根據情況處理結果
      if (response.data.user.success) {
        // 登入成功，直接抓取回傳的資料
        const user = {
          member_id: response.data.user.member_id,
          email: response.data.user.email,
          name: response.data.user.name,
          birthday: response.data.user.birthday,
          phone: response.data.user.phone,
          address: response.data.user.address,
          avatarname: response.data.user.avatarname,
        }
        //寫入使用者碎片(redux)
        dispatch(setuserData(user))
        // console.log(user);
        // const res = axios.get()
        let timerInterval
        Swal.fire({
          title: '登入成功!即將導向會員中心',
          html: 'will be closed in <b></b> milliseconds.',
          timer: 1500,
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
            router.push(`http://localhost:3000/member/edit-profile`)
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      } else {
        // 登入失敗，顯示錯誤訊息
        console.log('登入失敗')
      }
    } catch (error) {
      console.log(error.response)
      if (error.response && error.response.data.error === '密碼不正確') {
        // 密碼錯誤，顯示錯誤訊息
        setErrors({ ...originErrors, password: '密碼不正確' })
      } else if (error.response && error.response.status === 401) {
        // 帳號錯誤，顯示錯誤訊息
        setErrors({ ...originErrors, email: '帳號不存在' })
      }
    }
    // 使用 NextAuth 提供的 signIn 函数进行登录
    try {
      const data = await signIn(
        'credentials',
        {
          redirect: '/',
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )

      // 登录成功后，获取用户信息，并存储到 Redux 中
      if (data.user.success) {
        const user = {
          member_id: data.user.member_id,
          email: data.user.email,
          name: data.user.name,
          birthday: data.user.birthday,
          phone: data.user.phone,
          address: data.user.address,
          avatarname: data.user.avatarname,
        }
        dispatch(setuserData(user))

        // 跳转到个人资料编辑页
        router.push(`http://localhost:3000/member/edit-profile`)
      } else {
        console.log('登入失敗')
      }
    } catch (error) {
      console.log(error.response)
      // ... 其他处理 ...
    }
  }

  return (
    <>
      <div className="container-fluid mt-7 row">
        <div className="col-8 me-5">
          <Image
            src="/images/members-images/form.jpg"
            alt="主視覺"
            width={1310}
            height={890}
          />
        </div>
        <div className="col-3 mt-5 ms-5 ">
          <div className={`form-member w-100 m-auto text-center`}>
            <h2 className="text-center mb-5">會員登入</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-sm-12">
                  {/* <label className="d-flex justify-content-start">Email</label> */}
                  <input
                    type="email"
                    name="email"
                    className={`form-control w-100 ${styles['form-control']} ${styles['input']}`}
                    placeholder="電子郵件"
                    value={user.email}
                    onChange={handleFieldChange}
                  />
                </div>
                <div
                  className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                >
                  {errors.email}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-12 ">
                  {/* <label className="d-flex justify-content-start">密碼</label> */}
                  <input
                    type="password"
                    name="password"
                    className={`form-control w-100 ${styles['form-control']}  ${styles['input']}`}
                    placeholder="密碼"
                    value={user.password}
                    onChange={handleFieldChange}
                  />
                </div>
                <div
                  className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                >
                  {errors.password}
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-sm-6 text-start">
                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                    />
                    <label
                      className={`form-check-label  ${styles['notice']}`}
                      htmlFor="gridCheck1"
                    >
                      保持登入狀態
                    </label>
                  </div> */}
                </div>
                <div className="col-sm-4 offset-sm-2 test-end">
                  <Link
                    href="/member/forget-password"
                    className={`${styles['notice']} ${styles['link']}`}
                  >
                    忘記密碼？
                  </Link>
                </div>
              </div>
              <div className="row ">
                <p className={`${styles['notice']}`}>
                  如登入，即代表同意本站
                  <Link href="/about" className={`${styles['link']}`}>
                    隱私權政策
                  </Link>
                  和
                  <Link href="/about" className={`${styles['link']}`}>
                    使用條款
                  </Link>
                  。
                </p>
              </div>

              <button type="submit" className="btn btn-secondary w-100">
                登入
              </button>

              <div className="row mt-3 mb-5">
                <h6>
                  還不是會員？
                  <Link href="/register" className={`${styles['link']} `}>
                    註冊
                  </Link>
                  。
                </h6>
              </div>

              <div className={`mb-3 ${styles['hr-sect']}`}>快速登入</div>
              <div className="row mb-2">
                <div className="col-sm-12 text-start">
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-link btn-floating-mx-1"
                      onClick={() => signIn('google')}
                    >
                      <GoogleLogo className="mx-3" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .mt-7 {
            margin-top: 70px;
          }
        `}
      </style>
    </>
  )
}
