import React from 'react'
import { useEffect, useState } from 'react'
import OrderlistOone from '@/components/member/orderlist-one'
import SideBar from '@/components/member/sidebar'
// 引入 useSelector 和 useDispatch
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import useAuthGuard from '../authGuard' //使用路由守衛
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function orderList() {
  const auth = useAuthGuard() //路由守衛直接掛在第一行

  const userid = useSelector((state) => state.user.user.member_id)
  const [oneforall, setOneforall] = useState('')

  useEffect(() => {
    const findorder = async (id) => {
      const res = await axios.post('http://localhost:3005/api/cart/orderlist', {
        memberid: id,
      })
      return res.data.success
    }

    function someFunction() {
      findorder(userid)
        .then((result) => {
          setOneforall(result)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    someFunction()
  }, [])

  if (auth === null) {
    return <p>Loading...</p>
  }

  if (!auth) {
    let timerInterval
    Swal.fire({
      title: '請登入以後再查看購買紀錄',
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
                      className="fa-solid fa-clipboard-check"
                      style={{ marginRight: '15px' }}
                    />
                    歷史訂單
                  </button>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active scrollable-tab-pane"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="cards-container ">
                    {/* 再確定值傳入才map */}
                    {oneforall ? (
                      oneforall.map((item) => {
                        //console.log(item.finaldetail)
                        return (
                          <>
                            <OrderlistOone
                              key={uuidv4()}
                              maindata={item.finalmain[0]}
                              detail={item.finaldetail}
                            />
                          </>
                        )
                      })
                    ) : (
                      <p>Loading...</p>
                    )}
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
             {
              /* border: 1px solid #ccc; */
            }
          }

          .nav-tabs .nav-link.active {
            color: #777777; /* 選中的按鈕文字顏色 */
            background-color: #e6e6e6; /* 選中的按鈕背景顏色 */
            border-bottom-color: transparent; /* 選中的按鈕底部邊框透明 */
          }

          .tab-pane {
            background-color: #e6e6e6;
            border-radius: 0px 30px 30px 30px;
            padding: 50px;
            width: 1000px;
            height: 750px;
            box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25); /* 添加阴影效果 */
          }

          .btn-confirm {
            position: absolute;
            bottom: 40px;
            right: 600px;
            background-color: #ea6f2a;
            color: #ffffff;
            border-radius: 50px;
          }

          .tab-pane label {
            color: #6d6969;
          }

          /* input 的樣式 */
          .tab-pane input,
          .tab-pane select {
            width: 100%;
            height: 50px;
            background-color: #f4f4f4;
            border-radius: 20px;
            margin-bottom: 20px;
            padding: 10px;
            border: none;
          }

          .scrollable-tab-pane {
            height: 750px; /* Set your desired height */
            overflow-y: auto;
          }
        `}
      </style>
    </>
  )
}
