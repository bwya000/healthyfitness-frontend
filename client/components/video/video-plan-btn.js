//購買訂閱用 --- start
'use client'
import useAuthGuard from '@/pages/authGuard' //路由守衛
import { useRouter } from 'next/router' //定義前往付款所需元件
import videoProduct from '@/data/creditcardOnline/videoProduct.json' //定義前往付款所需元件
import { useDispatch, useSelector } from 'react-redux' //redux
import { setVideosub_order } from '@/pages/store/cartSlice' //購物車碎片
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' //react的alert
//購買訂閱用 --- end
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import btnArrow from '@/public/images/video_line/btn-arrow.png'
import btnArrowHover1 from '@/public/images/video_line/btn-arrow-hover-1.png'
import btnArrowHover2 from '@/public/images/video_line/btn-arrow-hover-2.png'
import btnArrowHover3 from '@/public/images/video_line/btn-arrow-hover-3.png'

export default function VideoPlanBtn() {
  //*****************************購買訂閱用 --- start*****************************************************
  const auth = useAuthGuard() //路由守衛直接掛在第一行
  //如果使用者存在才能做事
  const handleLinePay = () => {
    confirmAlert({
      title: '您必須登入才能購買此課程',
      message: '確認要導向至登入頁面？',
      buttons: [
        {
          label: '確定',
          onClick: () => {
            router.push('http://localhost:3000/login')
          },
        },
        {
          label: '取消',
          onClick: () => {},
        },
      ],
    })
  }
  const dispatch = useDispatch() //redux抓
  const member_id = useSelector((state) => state.user.user.member_id) //取會員id
  const ninety = videoProduct.subDay[0].ninety //買90天
  const one_hundred_eighty = videoProduct.subDay[0].one_hundred_eighty //買180天
  const three_hundred_and_sixty_days =
    videoProduct.subDay[0].three_hundred_and_sixty_days //買360天
  const router = useRouter()
  const [creditvardStatus, setcreditvardStatus] = useState(false) //用勾子把付款狀態true or false 追蹤
  useEffect(() => {
    const handleLocalStorageChange = () => {
      // 定義一個localStorage變化的函數
      const storedCredicard = localStorage.getItem('credicard')
      if (storedCredicard === 'success') {
        //如果 credicard 已付款 -> 把值改成"true"
        setcreditvardStatus(true)
      }
    }

    // 監聽定義一個localStorage變化的函數的變化
    window.addEventListener('storage', handleLocalStorageChange)

    // 組件卸載,移除監聽事件
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange)
    }
  }, [])

  useEffect(() => {
    if (creditvardStatus) {
      // 如果 creditvardStatus 為 true，執行跳轉
      router.push('http://localhost:3000/cart/linepay/videoSub_confirm')
    }
  }, [creditvardStatus])

  //點擊付款每個商品,使用開新分頁的方式,前往信用卡付款事件
  const gocredicard = (paynowObj) => {
    localStorage.setItem('paynow', JSON.stringify(paynowObj))
    const url = 'http://localhost:3000/cart/linepay/credicard'
    window.open(url, '_blank')
  }
  //*****************************購買訂閱用 --- end*****************************************************
  const [isBtn1Hovered, setIsBtn1Hovered] = useState(false)
  const [isBtn2Hovered, setIsBtn2Hovered] = useState(false)
  const [isBtn3Hovered, setIsBtn3Hovered] = useState(false)
  return (
    <>
      <div className="section">
        <h2 className="title">訂閱方案</h2>
        <h4 className="title-1">SUBSCRIPTION PLAN</h4>
        <div className="plan-btn">
          <a
            style={{ textDecoration: 'none', cursor: 'pointer' }}
            className="plan-btn-1"
            onMouseEnter={() => setIsBtn1Hovered(true)}
            onMouseLeave={() => setIsBtn1Hovered(false)}
            //買90天執行的動作 --- start
            onClick={async () => {
              if (auth) {
                const paynowObj = {
                  lineItems: [
                    {
                      price: ninety,
                      quantity: 1,
                    },
                  ],
                }
                const videSub = {
                  memberid: member_id, //會員id
                  subday: 90,
                }
                //把資料寫入資料庫
                const res = await axios.post(
                  'http://localhost:3005/api/cart/buyvideo/orderSub',
                  videSub
                )

                //寫入redux
                dispatch(setVideosub_order(res.data.success))
                //執行帶入的參數
                gocredicard(paynowObj)
              } else {
                handleLinePay()
              }
            }}
            //買90天執行的動作 --- end
          >
            <div className="plan-info">
              <p className="plan-btn-price">NT$1199</p>
              <p className="plan-btn-day">90天</p>
            </div>
            <div className="plan-btn">
              <div>
                <div className="view-btn">
                  <p>立即訂閱</p>
                </div>
                <Image
                  className="btn-arrow"
                  src={isBtn1Hovered ? btnArrowHover1 : btnArrow}
                  alt="btnArrow"
                  width={53}
                  height={132}
                  style={{
                    position: 'relative',
                    top: '-150px',
                    left: '80px',
                  }}
                />
              </div>
            </div>
            <p className="plan-btn-text">
              全部影片無限次觀看
              <br />
              90天健身日誌
              <br />
              跟蹤你的進度激勵你堅持下去
              <br />
              購買健身服飾類商品另有95折優惠！
            </p>
          </a>
          <a
            style={{ textDecoration: 'none', cursor: 'pointer' }}
            className="plan-btn-2"
            onMouseEnter={() => setIsBtn2Hovered(true)}
            onMouseLeave={() => setIsBtn2Hovered(false)}
            //買180天執行的動作 --- start
            onClick={async () => {
              if (auth) {
                const paynowObj = {
                  lineItems: [
                    {
                      price: one_hundred_eighty,
                      quantity: 1,
                    },
                  ],
                }
                const videSub = {
                  memberid: member_id, //會員id
                  subday: 180,
                }
                //把資料寫入資料庫
                const res = await axios.post(
                  'http://localhost:3005/api/cart/buyvideo/orderSub',
                  videSub
                )

                //寫入redux
                dispatch(setVideosub_order(res.data.success))
                //執行帶入的參數
                gocredicard(paynowObj)
              } else {
                handleLinePay()
              }
            }}
            //買180天執行的動作 --- end
          >
            <div className="plan-info">
              <p className="plan-btn-price">NT$2299</p>
              <p className="plan-btn-day">180天</p>
            </div>
            <div className="plan-btn">
              <div>
                <div className="view-btn">
                  <p>立即訂閱</p>
                </div>
                <Image
                  className="btn-arrow"
                  src={isBtn2Hovered ? btnArrowHover2 : btnArrow}
                  alt="btnArrow"
                  width={53}
                  height={132}
                  style={{
                    position: 'relative',
                    top: '-150px',
                    left: '80px',
                  }}
                />
              </div>
            </div>
            <p className="plan-btn-text">
              全部影片無限次觀看
              <br />
              180天健身日誌
              <br />
              讓你回顧成長和突破
              <br />
              全網商品提供8折優惠！
            </p>
          </a>
          <a
            style={{ textDecoration: 'none', cursor: 'pointer' }}
            className="plan-btn-3"
            onMouseEnter={() => setIsBtn3Hovered(true)}
            onMouseLeave={() => setIsBtn3Hovered(false)}
            //買360天執行的動作 --- start
            onClick={async () => {
              if (auth) {
                const paynowObj = {
                  lineItems: [
                    {
                      price: three_hundred_and_sixty_days,
                      quantity: 1,
                    },
                  ],
                }
                const videSub = {
                  memberid: member_id, //會員id
                  subday: 360,
                }
                //把資料寫入資料庫
                const res = await axios.post(
                  'http://localhost:3005/api/cart/buyvideo/orderSub',
                  videSub
                )

                //寫入redux
                dispatch(setVideosub_order(res.data.success))
                //執行帶入的參數
                gocredicard(paynowObj)
              } else {
                handleLinePay()
              }
            }}
            //買360天執行的動作 --- end
          >
            <div className="plan-info">
              <p className="plan-btn-price">NT$3999</p>
              <p className="plan-btn-day">365天</p>
            </div>
            <div className="plan-btn">
              <div>
                <div className="view-btn">
                  <p>立即訂閱</p>
                </div>
                <Image
                  alt="btnArrow"
                  className="btn-arrow"
                  src={isBtn3Hovered ? btnArrowHover3 : btnArrow}
                  width={53}
                  height={132}
                  style={{
                    position: 'relative',
                    top: '-150px',
                    left: '80px',
                  }}
                />
              </div>
            </div>
            <p className="plan-btn-text">
              全部影片無限次觀看
              <br />
              360天健身日誌
              <br />
              幫助你保持動力和紀律
              <br />
              限量健身服裝套裝只要6折！
              <br />
              包括運動上衣、運動褲
            </p>
          </a>
        </div>
      </div>
      <style jsx>
        {`
          .section {
            padding: 0 200px 0 200px;
            width: 100%;
            height: 856px;
          }

          .title {
            text-align: center;
            font-weight: bold;
            letter-spacing: 5px;
            margin-bottom: 20px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 35px;
            color: #4a4a4a;
          }

          .title-1 {
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: 4px;
            color: #4a4a4a;
          }

          .plan-btn {
            display: flex;
            justify-content: space-between;
            margin: 0 150px;
          }
          .plan-btn-1,
          .plan-btn-2,
          .plan-btn-3 {
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 330px;
            height: 530px;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease-in-out;
          }
          .plan-info {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .plan-btn-price {
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 3px;
            font-size: 40px;
            color: #ea6f2a;
            margin: 45px 0 0;
          }
          .plan-btn-day {
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 3px;
            font-size: 30px;
            color: #86909c;
            margin: 4px 0;
          }
          .plan-btn-text {
            position: relative;
            top: -90px;
            left: 25px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 16px;
            color: #86909c;
            letter-spacing: 3px;
            line-height: 40px;
          }
          .view-btn {
            padding-left: 150px;
            padding-top: 30px;
            margin-left: -180px;
            margin-top: 30px;
            width: 390px;
            height: 90px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 15px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }

          .view-btn p {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 20px;
            letter-spacing: 2.5px;
            color: #ffffff;
          }

          .plan-btn-1:hover,
          .plan-btn-2:hover,
          .plan-btn-3:hover {
            width: 330px;
            height: 530px;
            background-color: #ea6f2a;
            transform: scale(1.1);
          }

          .plan-btn-1:hover .plan-btn-price,
          .plan-btn-2:hover .plan-btn-price,
          .plan-btn-3:hover .plan-btn-price {
            color: #fff;
          }

          .plan-btn-1:hover .plan-btn-day,
          .plan-btn-2:hover .plan-btn-day,
          .plan-btn-3:hover .plan-btn-day {
            color: #fff;
          }

          .plan-btn-1:hover .plan-btn-text,
          .plan-btn-2:hover .plan-btn-text,
          .plan-btn-3:hover .plan-btn-text {
            color: #fff;
          }

          .plan-btn-1:hover .view-btn,
          .plan-btn-2:hover .view-btn,
          .plan-btn-3:hover .view-btn {
            width: 390px;
            height: 90px;
            background-color: #fff;
          }

          .plan-btn-1:hover .view-btn p,
          .plan-btn-2:hover .view-btn p,
          .plan-btn-3:hover .view-btn p {
            color: #e25d31;
          }
        `}
      </style>
    </>
  )
}
