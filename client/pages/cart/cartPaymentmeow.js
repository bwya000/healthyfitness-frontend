'use client'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartstylePay.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
//api連線用
import axios from 'axios'
//react的alert
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
//自己的組件(2個橘點+購物車合計有幾類+下拉式實體商品訂購明細)
import TwoOrange from '@/components/cart/default/twoOrange'
//購物車redux用
import { useSelector, useDispatch } from 'react-redux'
import { setReceiver, setmeowAdress, setOrderMenu } from '../store/cartSlice'
//把真實商品的信用卡商品貨號帶進來
import realProduct from '@/data/creditcardOnline/realProduct.json'

export default function Cartpaymentmeow() {
  const router = useRouter()
  //一次抓取redux所有Cart裡面的資料
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cart)
  const paymethod = cartData.selectedPaymentMethod //付款方式
  const shoppingmethod = cartData.selectedShippingMethod // 物流方式
  const totalPrice = cartData.totalPrice //訂單總金額

  //redux抓取目前使用者用 -> 抓取使用者id
  const member_id = useSelector((state) => state.user.user.member_id)
  const user = useSelector((state) => state.user.user)

  //建立抓取黑貓收件人姓名跟電話,與黑貓地址
  const [name_receive, setName_receive] = useState("")
  const [phone_receive, setPhone_receive] = useState("")
  const [adress_receive, setAdress_receive] = useState("")
  const [nametest, setNametest] = useState(false) //輸入收件人判斷
  const [phonetest, setPhonetest] = useState(false)//輸入電話判斷
  const [addresstestnow, setaddresstestnow] = useState(false)//輸入地址判斷

  //用勾子把信用卡付款與linepay狀態true or false 追蹤
  const [creditvardStatus, setcreditvardStatus] = useState(false)
  const [linepayStatus, setLinepayStatus] = useState(
    localStorage.getItem('linepayStatus') === 'true'
  )

  // 使用 useEffect 訂閱 linepayStatus 的變化
  useEffect(() => {
    const handleLinepayStatusChange = () => {
      //linepay狀態
      setLinepayStatus(localStorage.getItem('linepayStatus') === 'true')
      //信用卡狀態
      const storedCredicard = localStorage.getItem('credicard')
      if (storedCredicard === 'success') {
        //如果 credicard 已付款 -> 把值改成"true"
        setcreditvardStatus(true)
      }
    }

    // 註冊事件監聽器，在 linepayStatus 改變時觸發
    window.addEventListener('storage', handleLinepayStatusChange)

    // 在 useEffect 的 cleanup 函式中取消事件監聽
    return () => {
      window.removeEventListener('storage', handleLinepayStatusChange)
    }
  }, [])

  //綁定打勾要執行的動作
  const [isChecked, setIsChecked] = useState(true);
  //控制打勾元件,這邊在打勾後,要把會員姓名電話地址,加入輸入框
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    if(isChecked){
      setName_receive(user.name)
      setPhone_receive(user.phone)
      setAdress_receive(user.address)
    }
  };

  // 使用 useEffect 檢查 linepayStatus 的值，並進行跳轉
  useEffect(() => {
    if (linepayStatus) {
      // 如果 linepayStatus 為 true，執行跳轉
      router.push('/cart/cartOrderSucess')
    }
    //監聽信用卡
    if (creditvardStatus) {
      // 如果 creditvardStatus 為 true，執行跳轉
      router.push('http://localhost:3000/cart/cartOrderSucess')
    }
  }, [linepayStatus, creditvardStatus]) // 注意第二個參數是 [linepayStatus]

  ///前往linePay付款
  const handleLinePay = () => {
    confirmAlert({
      title: '確認付款',
      message: '確認要導向至LINE Pay進行付款？',
      buttons: [
        {
          label: '確定',
          onClick: () => {
            // 在本window直接導至node付款(reverse)url，之後會導向至line pay
            const howtopay = 'Linepay'
            makeorder(howtopay)
          },
        },
        {
          label: '取消',
          onClick: () => {},
        },
      ],
    })
  }

  //前往信用卡付款
  const handleCreditcardPay = () => {
    confirmAlert({
      title: '確認付款',
      message: '確認要導向至信用卡進行付款？',
      buttons: [
        {
          label: '確定',
          onClick: () => {
            const howtopay = 'CreditcardPay'
            makeorder(howtopay)
          },
        },
        {
          label: '取消',
          onClick: () => {},
        },
      ],
    })
  }
  //產生訂單,傳到資料庫
  const makeorder = async (howtopay) => {
    const receiverData = {
      name: name_receive,
      phone: phone_receive,
    }
    //把使用者資料傳進redux
    await dispatch(setReceiver(receiverData))
    await dispatch(setmeowAdress(adress_receive))

    //建立寫進資料庫所需的物件
    const orderMain = {
      orderrealmemberID: member_id, //會員ID
      PAY_methods: paymethod,
      Shipping_methods: shoppingmethod,
      receiver: name_receive,
      receiver_phone: phone_receive,
      Shipping_address: adress_receive,
      orderNote: cartData.orderNote,
    }
    try {
      //creatOrder的API主要產生實體商品main訂單
      const response = await axios.post(
        'http://localhost:3005/api/cart/creatOrder',
        orderMain
      )
      //把商品品項加入細節寫進資料庫
      const orderProduct = {
        productDetail: cartData.shoppingcart,
        neworderID: response.data.neworderID,
      }
      //拿回新成立的要給客戶看的訂單明細
      //拿回新成立的時間
      const neworderData = {
        orderNumber: response.data.newshortID,
        orderDate: response.data.newdate,
      }
      dispatch(setOrderMenu(neworderData))
      //呼叫加入訂單細節的
      await axios.post(
        'http://localhost:3005/api/cart/creatorderDetail',
        orderProduct
      )
      //如果付款方式是Linepay
      if (howtopay === 'Linepay') {
        //建立LinePay要得格式,傳送至linepay付款
        const linepayOrder = {
          amount: totalPrice,
          orderID: response.data.neworderID,
          product: cartData.shoppingcart,
        }

        //發送請求給Linepay
        const golinepay = await axios.post(
          'http://localhost:3005/api/cart/pay/linePay',
          linepayOrder
        )

        // 從伺服器得到重定向的URL
        const redirectUrl = golinepay.data.redirectUrl
        //取得linepay訂單總額
        const amount = golinepay.data.linepayamount
        //把總金額存到localstorage
        localStorage.setItem('linepayAmount', amount);        

        // 在前端做重定向,前往linepay付款頁面
        window.open(redirectUrl, '_blank')
      }
      //如果付款方式是信用卡
      if (howtopay === 'CreditcardPay') {
        const lineItems = []
        //先把購物車內容帶進
        const buyreal = cartData.shoppingcart
        //跑這個map
        buyreal.map((item) => {
          //拿出每個商品的id與購買數量
          const id = item.productId
          const buynum = item.productNum
          const newitem = {
            price: realProduct.realProduct[0][id],
            quantity: buynum,
          }
          //push進陣列,創造信用卡付款所需要的格式
          lineItems.push(newitem)
        })
        //最後把格式完成,包進物件
        const paynowObj = { lineItems }
        //執行信用卡付款作業
        localStorage.setItem('paynow', JSON.stringify(paynowObj))
        const url = 'http://localhost:3000/cart/linepay/credicard'
        window.open(url, '_blank')
      }
    } catch (error) {
      console.error('資料傳送到後端時發生錯誤：', error)
    }
  }
  return (
    <>
      {/* 2個橘點+購物車合計有幾類+下拉式實體商品訂購明細 */}
      <TwoOrange />
      <div className={`container mt-3`} style={{ marginBottom: '50px' }}>
        <div className={`row`}>
          {/* 左側送貨資料 */}
          <div className={`${styles.sendBox} col-8`}>
            <div
              className={`${styles.productbox} row text-center`}
              style={{
                height: '60px',
                background: '#EEEEEE',
                borderRadius: '25px 25px 0px 0px',
              }}
            >
              <div
                className={`${styles.tablePassing} `}
                style={{ fontSize: '24px' }}
              >
                送貨資料
              </div>
            </div>

            <div className={`${styles.passing} row  `}>
              <div className={`${styles.passingTexttitle}`}>
                <div>已選擇黑貓宅配</div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="flexCheckDefault"
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    收件人資料與會員相同(勾選自動填入)
                  </label>
                </div>
              </div>
              <div className={`${styles.passingText}`}>
                收件人姓名(請填入真實姓名)
                {nametest ? (
                  <div style={{ display: 'inline', marginLeft: '10px', color: 'red' }}>
                    請輸入中文或英文名且不可為空
                  </div>
                ) : null}                
              </div>
              <input
                type="text"
                className="form-control "
                style={{
                  width: '94%',
                  border: '1px solid rgb(0, 0, 0)',
                  height: '13%',
                }}
                value={name_receive}
                //抓取收件人姓名
                onChange={(e) => {
                  setName_receive(e.target.value)
                }}
              ></input>
              <div className={`${styles.passingText}`}>收件人電話
              {phonetest ? (
                  <div style={{ display: 'inline', marginLeft: '10px', color: 'red' }}>
                    請輸入正確電話號碼且不可為空
                  </div>
                ) : null}              
              </div>
              <input
                type="text"
                className="form-control "
                style={{
                  width: '94%',
                  border: '1px solid rgb(0, 0, 0)',
                  height: '13%',
                }}
                value={phone_receive}
                //抓取收件人電話
                onChange={(e) => {
                  setPhone_receive(e.target.value)
                }}
              ></input>
              <div className={`${styles.passingText}`}>收貨地址
              {addresstestnow ? (
                  <div style={{ display: 'inline', marginLeft: '10px', color: 'red' }}>
                    收貨地址不可為空
                  </div>
                ) : null} </div>
              <input
                type="text"
                className="form-control "
                style={{
                  width: '94%',
                  border: '1px solid rgb(0, 0, 0)',
                  height: '13%',
                }}
                value={adress_receive}
                //抓取黑貓送貨地址
                onChange={(e) => {
                  setAdress_receive(e.target.value)
                }}
              ></input>
            </div>
          </div>
          {/* 右側訂單資訊 */}
          <div className="col-4">
            <div
              className={`${styles.productbox} row text-center`}
              style={{
                height: '60px',
                background: '#EEEEEE',
                borderRadius: '25px 25px 0px 0px',
              }}
            >
              <div
                className={`${styles.tablePassing} `}
                style={{ fontSize: '24px' }}
              >
                訂單資訊
              </div>
            </div>

            <div className={`${styles.orderAll} row  `}>
              <div className={`${styles.orderTopside}`}>
                <div className={`${styles.smallCount}`}>
                  <div className={`${styles.orderTextleft}`}>小計</div>
                  <div className={`${styles.orderTextright}`}>
                    NT${totalPrice}
                  </div>
                </div>
                <div
                  className={`${styles.smallCount}`}
                  style={{ marginTop: '10px' }}
                >
                  <div className={`${styles.orderTextleft}`}>運費</div>
                  <div className={`${styles.orderTextright}`}>NT$0</div>
                </div>
              </div>

              <div className={`${styles.test}`}>
                <div className={`${styles.smallCount}`}>
                  <div className={`${styles.orderTextleft}`}>合計</div>
                  <div className={`${styles.orderTextright}`}>
                    NT${totalPrice}
                  </div>
                </div>
                <div
                  className={`${styles.smallCount}`}
                  style={{ marginTop: '10px' }}
                >
                  <button
                    type="button"
                    className={`btn btn-light ${styles.orderButton}`}
                    onClick={() => {
                      // 使用正規表達式,判斷收件人只能輸入中文或英文
                      if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(name_receive) && name_receive !== ''){
                        setNametest(false)
                        //輸入電話判斷
                        if (/^[0-9]+$/.test(phone_receive) && phone_receive !== "") {
                          setPhonetest(false)
                          //是否有輸入門市判斷
                          if(!adress_receive){
                            setaddresstestnow(true)
                          }else{
                            setaddresstestnow(false)
                            if (paymethod === 'LinePay') {
                              //前往linePay付款觸發
                              handleLinePay()
                            }
                            if (paymethod === 'Creditcard') {
                              //前往信用卡付款觸發
                              handleCreditcardPay()
                            }
                          }
                        } else {
                          // 電話號碼執行失敗
                          setPhonetest(true)
                        }
                      }else{
                        setNametest(true)
                      }
                    }}
                  >
                    前往{paymethod === 'LinePay' ? 'LinePay付款' : '信用卡付款'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
