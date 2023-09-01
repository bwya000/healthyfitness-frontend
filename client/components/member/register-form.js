import { useState } from 'react'
import styles from './member.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css'

// Datepicker relies on browser APIs like document
// dynamically load a component on the client side,
// use the ssr option to disable server-rendering.
const InputDatePicker = dynamic(() => import('../common/input-date-picker'), {
  ssr: false,
})

export default function RegisterForm() {
  const MySwal = withReactContent(Swal)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    gender: '',
    birthday: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    // 正規表達式，檢查是否為有效的電子郵件地址
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    // 檢查是否符合電子郵件的正規表達式
    if (name === 'email' && value && !emailPattern.test(value)) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        email: '請輸入有效的電子郵件地址',
      }))
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        email: '',
      }))
    }

    // 正規表達式，檢查是否只包含繁體中文
    const chinesePattern = /^[\u4E00-\u9FA5]+$/

    // 檢查是否符合繁體中文的正規表達式
    if (name === 'name' && value && !chinesePattern.test(value)) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        name: '姓名只能包含繁體中文',
      }))
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        name: '',
      }))
    }

    //檢查密碼跟確認密碼內容是否一致
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          confirmPassword: '密碼不一致',
        }))
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          confirmPassword: '', // 清除錯誤訊息
        }))
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log(formData)
  }

  const [validationMessages, setValidationMessages] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthday: '',
    gender: '',
  })

  const validateForm = () => {
    const messages = {}

    // Validate email
    if (!formData.email) {
      messages.email = '請輸入電子郵件地址'
    }

    // Validate password
    if (!formData.password) {
      messages.password = '請輸入密碼'
    }

    // Validate confirmPassword
    if (!formData.confirmPassword) {
      messages.confirmPassword = '請輸入確認密碼'
    } else if (formData.confirmPassword !== formData.password) {
      messages.confirmPassword = '密碼不一致'
    }

    // Validate name
    if (!formData.name) {
      messages.name = '請輸入姓名'
    }

    // Validate birthday
    if (!formData.birthday) {
      messages.birthday = '請輸入生日'
    }

    // Validate gender
    if (!formData.gender) {
      messages.gender = '請選擇性別'
    }

    setValidationMessages(messages)

    // Check if there are no validation errors
    return Object.values(messages).every((message) => message === '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:3005/api/register',
          formData
        )
        let timerInterval
        Swal.fire({
          title: '註冊成功!即將導向登入頁面',
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
            window.location.href = '/login'
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
        // 在這裡可以處理後端回傳的訊息或進行其他操作
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setValidationMessages((prevMessages) => ({
            ...prevMessages,
            email: error.response.data.error, // 設定錯誤訊息
          }))
        } else {
          console.log(error.message)
          // 在這裡處理其他錯誤情況
        }
      }
    }
  }

  return (
    <>
      <div className="container-fluid mt-7 row">
        <div className="col-8 me-5">
          <Image
            src="/images/members-images/form.jpg"
            width={1310}
            height={890}
            alt="主視覺"
          />
        </div>

        <div className="col-3 mt-5 ms-5 ">
          <div className={` m-auto text-center form-member `}>
            <h2 className="text-center mb-3 ">會員註冊</h2>
            <p className={`text-center mb-3 ${styles['text-note']}`}>
              現在就加入會員，開始運動吧！
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mx-10">
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <input
                      type="email"
                      name="email"
                      className={`form-control w-100 ${styles['form-control']} ${styles['input']}`}
                      placeholder="電子郵件地址"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                  >
                    {validationMessages.email}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <input
                      type="password"
                      name="password"
                      className={`form-control w-100 ${styles['form-control']}  ${styles['input']}`}
                      placeholder="密碼"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                  >
                    {validationMessages.password}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control w-100 ${styles['form-control']}  ${styles['input']}`}
                      placeholder="密碼確認"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                  >
                    {validationMessages.confirmPassword}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      name="name"
                      className={`form-control w-100 ${styles['form-control']} ${styles['input']}`}
                      placeholder="姓名"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                  >
                    {validationMessages.name}
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-sm-12">
                    <div className="input-group position-relative d-inline-flex align-items-center">
                      <input
                        type="date"
                        name="birthday"
                        className={`form-control w-100 ${styles['form-control']} ${styles['input']}`}
                        // style={{
                        //   borderRadius: 2.8,
                        // }}
                        placeholder="出生年月日"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles['error']}  ${styles['space']}my-2 text-start mt-2 mb-1`}
                  >
                    {validationMessages.birthday}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="btn-group">
                    <input
                      type="radio"
                      className="btn-check "
                      name="gender"
                      id="M"
                      value="M"
                      checked={formData.gender === 'M'}
                      autoComplete="off"
                      onChange={handleChange}
                    />
                    <label className="btn btn-outline-secondary " htmlFor="M">
                      男
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="F"
                      value="F"
                      checked={formData.gender === 'F'}
                      autoComplete="off"
                      onChange={handleChange}
                    />
                    <label className="btn btn-outline-secondary" htmlFor="F">
                      女
                    </label>
                  </div>
                  <div
                    className={`${styles['error']}  ${styles['space']} my-2 text-start`}
                  >
                    {validationMessages.gender}
                  </div>
                </div>

                {/* <div className="row mb-3">
                  <div className="col-sm-12 text-start">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck1"
                      />
                      <label
                        className={`form-check-label  ${styles['notice']}`}
                        htmlFor="gridCheck1"
                      >
                        訂閱電子郵件就能收到產品、優惠以及會員福利的最新消息
                      </label>
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <p className={`${styles['notice']}`}>
                    如建立帳號，即代表同意本站
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
                  送出
                </button>

                <div className="row mt-3">
                  <h6>
                    已經是會員了嗎？{' '}
                    <Link href="/login" className={`${styles['link']}`}>
                      登入
                    </Link>
                    。
                  </h6>
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

          /* 选中状态的样式 */
          .btn-check:checked + .btn-outline-secondary {
            color: #676767; /* 文字颜色 */
            background-color: #c7c7c76d; /* 背景颜色 */
            border-color: #c7c7c7d4; /* 边框颜色 */
          }

          /* 非选中状态的样式 */
          .btn-check:not(:checked) + .btn-outline-secondary {
            color: #676767; /* 文字颜色 */
            background-color: white; /* 背景颜色 */
            border-color: #c7c7c7d4; /* 边框颜色 */
          }

          /* 选中状态的样式 */
          .btn-check:checked + .btn-outline-secondary {
            color: #676767; /* 文字颜色 */
            background-color: #c7c7c76d; /* 背景颜色 */
            border-color: #c7c7c7d4; /* 边框颜色 */
          }

          /* 非选中状态的样式 */
          .btn-check:not(:checked) + .btn-outline-secondary {
            color: #676767; /* 文字颜色 */
            background-color: white; /* 背景颜色 */
            border-color: #c7c7c7d4; /* 边框颜色 */
          }
        `}
      </style>
    </>
  )
}
