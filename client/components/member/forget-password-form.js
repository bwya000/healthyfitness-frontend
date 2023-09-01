import styles from './member.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
// countdown use
import useInterval from '@/hooks/use-interval'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function ForgetPasswordForm() {
  const MySwal = withReactContent(Swal)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // countdown use
  const [count, setCount] = useState(10) // 60s
  const [delay, setDelay] = useState(null) // delay=null to stop, delay=1000 to start

  // countdown use
  useInterval(() => {
    setCount(count - 1)
  }, delay)

  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
    }
  }, [count])

  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s內無法重新獲得驗證碼')
      return
    }

    const res = await axios.post(
      'http://localhost:3005/api/reset-password/otp',
      {
        email,
      }
    )

    console.log(res.data)
    if (res.data.message === 'fail') {
      setMessage('驗證碼取得失敗，請確認Email是否已經註冊')
    }

    if (res.data.message === 'email sent') {
      setMessage('驗證碼已寄送到你填寫的Email信箱中')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
  }

  const resetPassword = async () => {
    const res = await axios.post(
      'http://localhost:3005/api/reset-password/reset',
      {
        email,
        token,
        password,
      }
    )

    if (res.data.message === 'success') {
      //setMessage('密碼已成功修改!')
      let timerInterval
      Swal.fire({
        title: '密碼重設成功!即將導向登入頁',
        icon: 'success',
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
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          //console.log('I was closed by the timer')
        }
      })
      window.location.href = '/login'
    } else {
      setMessage('密碼修改失敗!')
    }
    //console.log(res.data)
  }
  return (
    <>
      <div
        className={`form-member w-100 mt-7 text-center d-flex justify-content-center align-items-center`}
      >
        <div className="text-center" style={{ maxWidth: '33%' }}>
          <h2 className="text-center mb-5">重設密碼</h2>
          <h5 style={{ color: '#ff6600' }}> {message}</h5>
          <p className={`text-center mb-5 ${styles['text-note']}`}>
            輸入會員電子郵件地址，按下&quot;取得驗證碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
          </p>
          <form>
            <div className="row mb-4">
              <div className="col-sm-12">
                <input
                  type="email"
                  className={`form-control w-100 ${styles['form-control']} ${styles['input']} `}
                  placeholder="電子郵件地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className={`${styles['error']} my-2 text-start`}>
            請輸入有效的註冊會員電子郵件地址。
          </div> */}
            </div>
            <div className="row mb-4">
              <div className="col-sm-12">
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${styles['form-control']} ${styles['input']}`}
                    placeholder="電子郵件驗證碼"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={getOtp}
                  >
                    {delay ? count + '秒後可以再次取得驗證碼' : '取得驗證碼'}
                  </button>
                </div>
              </div>
              {/* <div className={`${styles['error']} my-2 text-start`}>
            請輸入驗證碼。
          </div> */}
            </div>

            <div className="row mb-4">
              <div className="col-sm-12">
                <input
                  type="password"
                  className={`form-control w-100 ${styles['form-control']} ${styles['input']}`}
                  placeholder="新密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className={`${styles['error']} my-2 text-start`}>
            請輸入新密碼。
          </div> */}
            </div>
            {/* <div className="row mb-4">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']} ${styles['input']}`}
              placeholder="確認密碼"
            />
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入確認密碼。
          </div>
        </div> */}

            <button
              type="submit"
              className="btn btn-secondary w-100"
              onClick={resetPassword}
            >
              確定
            </button>

            <div className="row mt-2">
              <p className={`${styles['notice']}`}>
                還不是會員？
                <Link href="/register" className={`${styles['link']}`}>
                  加入我們
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .mt-7 {
            margin-top: 100px;
          }
        `}
      </style>
    </>
  )
}
