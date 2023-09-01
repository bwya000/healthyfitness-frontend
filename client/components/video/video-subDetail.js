/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import useAuthGuard from '@/pages/authGuard' //路由守衛
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import girl from '@/public/images/video_line/girl.png'
//定義前往付款所需元件
import { useRouter } from 'next/router'
import videoProduct from '@/data/creditcardOnline/videoProduct.json'
//redux
import { useDispatch,useSelector } from 'react-redux'
import { setVideosub_order } from '@/pages/store/cartSlice'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' //react的alert
import 'bootstrap/dist/css/bootstrap.min.css'


export default function videoSubDetail() {
  const auth = useAuthGuard()//路由守衛直接掛在第一行
  //未登入警告
  const handleLinePay = () => {
    confirmAlert({
    title: '您必須登入才能購買此課程',
    message: '確認要導向至登入頁面？',
    buttons: [
        {
        label: '確定',
        onClick: () => {
            router.push("http://localhost:3000/login")
        },
        },
        {
        label: '取消',
        onClick: () => {},
        },
    ],
    })
}
  //redux
  const dispatch = useDispatch()
  const member_id = useSelector((state)=>state.user.user.member_id)//取會員id
  //把付款商品取出
  const ninety = videoProduct.subDay[0].ninety //買90天
  const one_hundred_eighty = videoProduct.subDay[0].one_hundred_eighty //買180天
  const three_hundred_and_sixty_days =
    videoProduct.subDay[0].three_hundred_and_sixty_days //買360天

  const router = useRouter()
  //用勾子把付款狀態true or false 追蹤
  const [creditvardStatus, setcreditvardStatus] = useState(false)
  useEffect(() => {
    // 定義一個localStorage變化的函數
    const handleLocalStorageChange = () => {
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
  const [isBtn1Hovered, setIsBtn1Hovered] = useState(false)
  const [isBtn2Hovered, setIsBtn2Hovered] = useState(false)
  const [isBtn3Hovered, setIsBtn3Hovered] = useState(false)

  //點擊付款每個商品,使用開新分頁的方式,前往信用卡付款事件
  const gocredicard = (paynowObj) => {
    localStorage.setItem('paynow', JSON.stringify(paynowObj))
    const url = 'http://localhost:3000/cart/linepay/credicard'
    window.open(url, '_blank')
  }
  return (
    <>    
        <div className="sub-plan">
          <p className="title">訂閱方案</p>
          <div className='button'>
          <button
            href="#"
            style={{
              textDecoration: 'none',
              backgroundColor: isBtn1Hovered ? '#F36F36' : '#fcfcfc',
            }}
            className="sub-plan1"
            onMouseEnter={() => setIsBtn1Hovered(true)}
            onMouseLeave={() => setIsBtn1Hovered(false)}
            //買90天執行的動作 --- start
            onClick={async () => {
                    if(auth){
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
                    }
                    else{
                        handleLinePay()
                    }
                }}
                //買90天執行的動作 --- end
          >
            <div className="head">
              <p className="title-p">90天</p>
              <p className="desc-p">NT$1199</p>
            </div>
            <p className="text">
              全部影片無限次觀看
              <br />
              90天健身日誌
              <br />
              跟蹤你的進度激勵你堅持下去
              <br />
              購買健身服飾類商品另有95折優惠！
            </p>
            <div className="sub-btn">
              <p>立即訂閱</p>
            </div>
          </button>
          <button
            href="#"
            style={{
              'text-decoration': 'none',
              backgroundColor: isBtn2Hovered ? '#F36F36' : '#fcfcfc',
            }}
            className="sub-plan2"
            onMouseEnter={() => setIsBtn2Hovered(true)}
            onMouseLeave={() => setIsBtn2Hovered(false)}
            //買180天執行的動作 --- start
            onClick={async () => {
                    if(auth){
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
                    }else{
                        handleLinePay()
                    }
                    
                }}
                //買180天執行的動作 --- end
          >
            <div className="head">
              <p className="title-p">180天</p>
              <p className="desc-p">NT$2299</p>
            </div>
            <p className="text">
              全部影片無限次觀看
              <br />
              180天健身日誌
              <br />
              讓你回顧成長和突破
              <br />
              全網商品提供8折優惠！
            </p>
            <div className="sub-btn2">
              <p>立即訂閱</p>
            </div>
          </button>
          <button
            href="#"
            style={{
              'text-decoration': 'none',
              backgroundColor: isBtn3Hovered ? '#F36F36' : '#fcfcfc',
            }}
            className="sub-plan3"
            onMouseEnter={() => setIsBtn3Hovered(true)}
            onMouseLeave={() => setIsBtn3Hovered(false)}
            //買360天執行的動作 --- start
            onClick={async () => {
                    if(auth){
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
                    }else{
                        handleLinePay()
                    }
                }}
                //買360天執行的動作 --- end
          >
            <div className="head">
              <p className="title-p">360天</p>
              <p className="desc-p">NT$3999</p>
            </div>
            <p className="text">
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
            <div className="sub-btn3">
              <p>立即訂閱</p>
            </div>
          </button>
        </div>
        <div className='girl'>
        <Image
          className="girl"
          src={girl}
          alt="girl"
          width={548}
          height={624}
          />
          </div>
        </div>
      <style jsx>
        {`
          .sub-plan1:hover,
          .sub-plan2:hover,
          .sub-plan3:hover {
            .text,
            .title-p,
            .desc-p {
            font-family: 'Noto Sans TC', sans-serif;
            color: #ffffff;
            }
          }

          .sub-plan1,
          .sub-plan2,
          .sub-plan3 {
            display: flex;
            flex-direction: row;
            position: relative;
            top: 50px;
            left: 300px;
            font-family: 'Noto Sans TC', sans-serif;
            background-color: #fcfcfc;
            width: 800px;
            height: 200px;
            border: 1px solid transparent;
            border-radius: 30px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            margin-bottom: 40px;
            transition: all 0.3s;
          }

          .sub-plan1:hover,
          .sub-plan2:hover,
          .sub-plan3:hover {
            font-family: 'Noto Sans TC', sans-serif;
            display: flex;
            flex-direction: row;
            position: relative;
            top: 50px;
            left: 290px;
            background-color: #f36f36;
            width: 800px;
            height: 200px;
            border: 1px solid transparent;
            border-radius: 30px;
            transform: translateY(-10px);
            box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1),
          -4px -4px 12px rgba(0, 0, 0, 0.08);
          }

          .sub-plan {
            height:900px;
            margin-top: 70px;
            padding-bottom: 20px;
          }

          .title {
            font-family: 'Noto Sans TC', sans-serif;
            text-align: center;
            padding-top: 30px;
            font-size: 40px;
            color: #414141;
            letter-spacing: 3px;
          }

          .head {
            position: relative;
            left: 30px;
            top: 45px;
          }

          .title-p {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 30px;
            letter-spacing: 2px;
            color: #4b4b4b;
          }

          .desc-p {
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 2px;
            font-size: 35px;
            color: #ea6f2a;
          }

          .text {
            position: relative;
            left: 110px;
            top:32px;
            text-align: left;
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 2px;
            line-height: 30px;
            color: #66696c;
          }

          .sub-btn {
            position: relative;
            left: 150px;
            top: 76px;
            width: 170px;
            height: 50px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
           .sub-btn p {
            position: relative;
            top: 10px;
            left: -2px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 20px;
            letter-spacing: 2px;
            color: #ffffff;
          }
          .button{
            margin-top:-30px;
            padding-left:600px;
          }

          .girl{
            padding-left:300px;
            margin-top:-640px;
          }
         
          .sub-btn2 {
            position: relative;
            left: 250px;
            top: 76px;
            width: 170px;
            height: 50px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
          .sub-btn2 p {
           position: relative;
            top: 10px;
            left: -2px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 20px;
            letter-spacing: 2px;
            color: #ffffff;
          }
          .sub-btn3 {
            position: relative;
            left: 200px;
            top: 76px;
            width: 170px;
            height: 50px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
          .sub-btn3 p {
            position: relative;
            top: 10px;
            left: -2px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 20px;
            letter-spacing: 2px;
            color: #ffffff;
          }
          .sub-plan1:hover .sub-btn p,
          .sub-plan2:hover .sub-btn2 p,
          .sub-plan3:hover .sub-btn3 p {
            color: #f36f36;
          }
          .sub-plan1:hover .sub-btn,
          .sub-plan2:hover .sub-btn2,
          .sub-plan3:hover .sub-btn3 {
            background-color: #fff;
          }
        `}
      </style>
    </>
  )
}
