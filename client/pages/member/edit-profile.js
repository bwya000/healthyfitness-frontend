import React from 'react'
import Link from 'next/link'
import TWzipcode from 'react-twzipcode'
import SideBar from '@/components/member/sidebar'
import { useState, useEffect } from 'react'
import useAuthGuard from '../authGuard' //使用路由守衛
//連線後端
import axios from 'axios'
//redux用
import { useSelector, useDispatch } from 'react-redux'
import { setuserData } from '@/pages/store/userSlice'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css'

export default function EditProfile() {
  const auth = useAuthGuard() //路由守衛直接掛在第一行
  const MySwal = withReactContent(Swal)
  const user_Data = useSelector((state) => state.user.user)
  const { data: userGoogle } = useSession()
  //console.log(userGoogle.user.name);
  //讀取redux
  const dispatch = useDispatch()

  //建立useState
  const [member_id, setmember_id] = useState(user_Data.member_id)
  const [name, setName] = useState(user_Data.name)
  // setName(user_Data.name)
  const [email, setEmail] = useState(user_Data.email)
  const [birthday, setBirthday] = useState(user_Data.birthday)
  const [phone, setPhone] = useState(user_Data.phone)
  const [address, setAddress] = useState(user_Data.address)
  const [avatarname, setAvatarname] = useState(user_Data.avatarname)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [oldPasswordError, setOldPasswordError] = useState('')

  const [addressParts, setAddressParts] = useState({
    firstThreeChars: (user_Data.address || '').substring(0, 3) || '',
    middleThreeChars: (user_Data.address || '').substring(3, 6) || '',
    remainingChars: (user_Data.address || '').substring(6) || '',
  })

  const isValidName = (name) => {
    const chinesePattern = /^[\u4e00-\u9fa5]+$/
    return name.match(chinesePattern)
  }

  const isValidPhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/
    return phone.match(phonePattern)
  }

  const handleUpdateProfile = async () => {
    if (!isValidName(name)) {
      Swal.fire({
        title: '請輸入有效的中文名字',
        icon: 'warning',
        confirmButtonColor: '#EA6F2A',
        showClass: {
          popup: 'animate__animated animate__headShake',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
      return // 阻止继续执行
    }

    if (!isValidPhone(phone)) {
      Swal.fire({
        title: '請輸入有效的手機號碼',
        icon: 'warning',
        confirmButtonColor: '#EA6F2A',
        showClass: {
          popup: 'animate__animated animate__headShake',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
      return // 阻止继续执行
    }
    // console.log(addressParts);
    const fullAddress = `${addressParts.firstThreeChars}${addressParts.middleThreeChars}${addressParts.remainingChars}`
    console.log(fullAddress)

    try {
      const newuserData = {
        member_id: member_id,
        name: name,
        email: email,
        birthday: birthday,
        phone: phone,
        address: fullAddress,
        avatarname: avatarname,
      }
      //修改資料庫
      const response = await axios.post(
        'http://localhost:3005/api/member/editprofile',
        newuserData
      )
      if (response.data.success) {
        Swal.fire({
          title: '個人資料更新成功',
          confirmButtonColor: '#EA6F2A',
          showClass: {
            popup: 'animate__animated animate__headShake',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        })
        //MySwal.fire('個人資料更新成功')
        //修改之後要即時更新redux,以避免吃到舊資料
        dispatch(setuserData(newuserData))
      } else {
        Swal.fire({
          title: '個人資料更新失敗',
          confirmButtonColor: '#EA6F2A',
        })
      }
    } catch (error) {
      console.error('更新錯誤:', error)
      MySwal.fire('發生錯誤，請稍後再試')
    }
  }

  const handleUpdatePassword = async () => {
    try {
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        Swal.fire({
          title: '請填寫所有欄位',
          icon: 'warning',
          confirmButtonColor: '#EA6F2A',
        })
        return
      }

      // if (newPassword !== confirmNewPassword) {
      //   MySwal.fire('新密碼和確認密碼不一致')
      //   return
      // }
      if (newPassword !== confirmNewPassword) {
        Swal.fire({
          title: '新密碼和確認密碼不一致',
          icon: 'warning',
          confirmButtonColor: '#EA6F2A',
        })
        setPasswordsMatch(false)
        return
      } else {
        setPasswordsMatch(true)
      }

      const passwordData = {
        member_id: user_Data.member_id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }

      const response = await axios.post(
        'http://localhost:3005/api/member/editpassword',
        passwordData
      )

      if (response.data.success) {
        Swal.fire({
          title: '密碼更新成功',
          confirmButtonColor: '#EA6F2A',
          showClass: {
            popup: 'animate__animated animate__headShake',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        })
        // 清空输入框
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setOldPasswordError('')
      } else {
        Swal.fire({
          title: '密碼更新失敗',
          confirmButtonColor: '#EA6F2A',
        })
      }
    } catch (error) {
      console.error('更新錯誤:', error)

      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: '舊密碼錯誤',
          icon: 'warning',
          confirmButtonColor: '#EA6F2A',
        })
      } else {
        Swal.fire({
          title: '發生錯誤，稍後再試',
          confirmButtonColor: '#EA6F2A',
        })
      }
    }
  }

  if (auth === null) {
    return <p>Loading...</p>
  }

  if (!auth) {
    let timerInterval
    Swal.fire({
      title: '請登入以後再編輯個人資料',
      icon: 'warning',
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

    return null // 返回 null 来防止其他内容的渲染
  }

  return (
    <>
      {auth ? (
        <>
          <div className="container-fluid mt-5 mx-auto">
            <div className="row ">
              <div className="mt-5 col-4 d-flex justify-content-center">
                <SideBar />
              </div>
              <div className="mt-5 col-8 d-flex justify-content-start">
                <div>
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active edit"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="true"
                      >
                        <i
                          className="fa-solid fa-pen"
                          style={{ marginRight: '15px' }}
                        />
                        編輯個人資料
                      </button>
                      <button
                        className="nav-link edit"
                        id="nav-password-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-password"
                        type="button"
                        role="tab"
                        aria-controls="nav-password"
                        aria-selected="false"
                      >
                        <i
                          className="fa-solid fa-unlock"
                          style={{ marginRight: '15px' }}
                        />
                        修改密碼
                      </button>
                    </div>
                  </nav>

                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active "
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      {/* 編輯個人資料的內容 */}
                      <div className="form-container d-flex justify-content-center ">
                        <div className="row mb-3">
                          <div className="col-7">
                            <label>電子郵件</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="電子郵件"
                              value={
                                user_Data.email ||
                                (userGoogle ? userGoogle.user.email : '')
                              }
                              onChange={(e) => setEmail(e.target.value)}
                              disabled
                            />
                          </div>
                          <div className="col-7  mt-3">
                            <label>上傳大頭貼</label>
                            <input
                              type="file"
                              className="form-control"
                              //value={user_Data.avatarname}
                              onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                  const filename = file.name // 取得圖片檔名
                                  // console.log('選取的圖片檔名：', filename)
                                  setAvatarname(filename)
                                  // 其他處理檔案的操作，例如上傳到伺服器
                                }
                              }}
                            />
                          </div>
                          <div className="col-7  mt-3">
                            <label>姓名</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="姓名"
                              value={
                                name || (userGoogle ? userGoogle.user.name : '')
                              }
                              onChange={(e) => setName(e.target.value)}
                            />
                            {name && !isValidName(name) && (
                              <span className="error-message text-nowrap ">
                                <div className="center-text">
                                  請輸入有效的中文名字
                                </div>
                              </span>
                            )}
                          </div>
                          <div className="col-7  mt-3">
                            <label>生日</label>
                            <input
                              type="date"
                              className="form-control"
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                            />
                          </div>
                          <div className="col-7  mt-3">
                            <label>手機</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="請輸入手機號碼"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            {phone && !isValidPhone(phone) && (
                              <span className="error-message text-nowrap">
                                <div className="center-text">
                                  請輸入有效的手機號碼（10位數字）
                                </div>
                              </span>
                            )}
                          </div>
                          {/* 聯絡地址 */}
                          <div className="row mt-3">
                            <label>聯絡地址</label>

                            <div className="col-6">
                              <TWzipcode
                                countyFieldName="county"
                                countyValue={addressParts.firstThreeChars || ''}
                                css={[
                                  'form-select county-sel',
                                  'form-select district-sel',
                                  'form-control zipcode',
                                ]}
                                districtFieldName="district"
                                districtValue={
                                  addressParts.middleThreeChars || ''
                                }
                                zipcodeFieldName="zipcode"
                                handleChangeCounty={(selectedCounty) => {
                                  // setAddre(e.target.countyValue)

                                  setAddressParts((prevState) => ({
                                    ...prevState,
                                    firstThreeChars: selectedCounty.county,
                                    middleThreeChars: selectedCounty.district,
                                  }))
                                  console.log(selectedCounty)
                                  // console.log(addressParts.firstThreeChars)
                                }}
                                handleChangeDistrict={(selectedDistrict) => {
                                  console.log(selectedDistrict.district)
                                  setAddressParts((prevState) => ({
                                    ...prevState,
                                    firstThreeChars: selectedDistrict.county,
                                    middleThreeChars: selectedDistrict.district,
                                  }))
                                }}
                                handleChangeZipcode={(selectedDistrict) => {
                                  setAddressParts((prevState) => ({
                                    ...prevState,
                                    firstThreeChars: selectedDistrict.county,
                                    middleThreeChars: selectedDistrict.district,
                                    remainingChars: selectedDistrict.zipcode,
                                  }))
                                }}
                                zipcodePlaceholder="輸入郵遞區號"
                              />
                            </div>
                            {/* 可先用console log確認有沒有取到值 */}
                            <div className="col-7">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="請手動輸入地址"
                                value={addressParts.remainingChars}
                                onChange={(e) =>
                                  setAddressParts((prevState) => ({
                                    ...prevState,
                                    remainingChars: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-confirm"
                          onClick={handleUpdateProfile}
                        >
                          確定修改
                        </button>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-password"
                      role="tabpanel"
                      aria-labelledby="nav-password-tab"
                    >
                      {/* 編輯密碼的內容 */}
                      <div className="form-container">
                        <div className="row mb-3">
                          <div className="col-7">
                            <label>舊密碼確認</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="請輸入舊密碼"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </div>
                          <div className="col-7 mt-3">
                            <label>新密碼</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="請輸入新密碼"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          <div className="col-7 mt-3">
                            <label>密碼確認</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="再次輸入新密碼"
                              value={confirmNewPassword}
                              onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                              }
                            />
                            {!passwordsMatch && (
                              <span className="error-message">
                                新密碼和確認密碼不一致
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          className="btn btn-confirm"
                          onClick={handleUpdatePassword}
                        >
                          確定修改
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>
            {`
              @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

              p {
                font-size: 20px;
                color: #777777;
              }

              .nav-ink {
                color: #777777;
              }
              .nav-tabs {
                border: none;
                outline: none;
              }

              .nav-tabs .nav-link {
                color: #777777;
                background-color: #e6e6e6;
                border-radius: 20px 20px 0 0;
                border: 1px solid #ccc;
              }

              .nav-tabs .nav-link.active {
                color: #777777; /* 選中的按鈕文字顏色 */
                background-color: #e6e6e6; /* 選中的按鈕背景顏色 */
                border-bottom-color: transparent; /* 選中的按鈕底部邊框透明 */
              }

              .error-message {
                font-size: 12px;
                color: #ea6f2a;
                text-align: start;
                height: 20px;
              }

              /* Remove min-height and set a fixed height for both tab panes */
              .tab-pane {
                background-color: #e6e6e6;
                border-radius: 0px 30px 30px 30px;
                padding: 30px;
                width: 1000px;
                height: 750px;
                box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25); /* 添加阴影效果 */
                position: relative;
              }

              /* Add styles for the confirm button */
              .btn-confirm {
                position: absolute;
                bottom: 20px;
                right: 250px; /* 調整按鈕與右側的距離 */

                background-color: #ea6f2a;
                color: #ffffff;
                border-radius: 50px;
              }

              /* label 的文字顏色 */
              .tab-pane label {
                color: #6d6969;
              }

              /* input 的樣式 */
              .tab-pane input,
              .tab-pane select {
                width: 100%;
                height: 40px;
                background-color: #f4f4f4;
                border-radius: 10px;
                margin-bottom: 5px;
                padding: 10px;
                border: none;
              }
            `}
          </style>
        </>
      ) : (
        <p style={{ marginTop: '110px', marginBottom: '500px' }}>
          您必須登入，才能編輯個人資料
        </p>
      )}
    </>
  )
}
