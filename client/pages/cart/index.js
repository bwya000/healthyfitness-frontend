/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useAuthGuard from '../authGuard' //使用路由守衛
//React組件與鉤子,bootstrap
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
//自己的組件
import styles from '@/styles/cartstyle.module.css'
import OneOrange from '@/components/cart/default/oneOrange'
import NoshopItem from '@/components/cart/default/noshopItem'
import Maybe from '@/components/cart/default/maybe'
import Logintocart from '@/components/cart/default/Logintocart'
import Buyagain from '@/components/cart/default/Buyagain'
// 引入 useSelector 和 useDispatch 與slice -------------- redux用
import { useSelector, useDispatch } from 'react-redux'
import {
  calculateTotalPrice, //計算購物車總金額
  setSelectedShippingMethod, //抓取物流方法
  setSelectedPaymentMethod, //抓取付款方法
  setOrderNote, //訂單備註內容
} from '../store/cartSlice'

export default function CartIndex() {
  const auth = useAuthGuard() //路由守衛直接掛在第一行
  const router = useRouter()
  const dispatch = useDispatch()

  //抓取redux
  const totalPrice = useSelector((state) => state.cart.totalPrice) //總金額
  const shopItem = useSelector((state) => state.cart.shoppingcart) //總金額

  //建立抓取物流與金流與訂單備註內容,並設定初始值
  const [shippingMethod, setShippingMethod] = useState('711method')
  const [paymentMethod, setPaymentMethod] = useState('LinePay')
  const [orderNotenow, setOrderNotenow] = useState('')

  //頁面首頁渲染時更新總價格
  useEffect(() => {
    // 在組件首次渲染時計算初始總價格 , 執行redux
    dispatch(calculateTotalPrice())
  }, [dispatch])
  if (auth === null) {
    return <p>Loading...</p>
  }

  if (!auth) {
    return <Logintocart />
  }

  if (shopItem.length === 0) {
    return (
      <>
        <NoshopItem />
      </>
    )
  }

  return (
    <>
      {auth ? (
        <>
          {/* 商品陳列列表,可修改數量與取消 */}
          <OneOrange />

          {/* 下欄 */}
          <div className={`container mt-3`} style={{ marginBottom: '50px' }}>
            <div className={`row`}>
              {/* 左側送貨及付款方式 */}
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
                    選擇送貨及付款方式
                  </div>
                </div>

                <div className={`${styles.passing} row  `}>
                  <div className={`${styles.passingText}`}>選擇物流</div>
                  <select
                    className="form-select form-select-lg"
                    style={{ width: '94%', border: '1px solid rgb(0, 0, 0)' }}
                    //抓取物流方式
                    value={shippingMethod}
                    onChange={(e) => {
                      setShippingMethod(e.target.value)
                    }}
                  >
                    <option value="711method">7-eleven超商取貨</option>
                    <option value="balckcatmethod">黑貓宅配</option>
                  </select>
                  <div className={`${styles.passingText}`}>付款方式</div>
                  <select
                    className="form-select form-select-lg"
                    style={{ width: '94%', border: '1px solid rgb(0, 0, 0)' }}
                    //抓取付款方式
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value)
                    }}
                  >
                    <option value="LinePay">LinePay付款</option>
                    <option value="Creditcard">信用卡付款</option>
                  </select>
                  <div className={`${styles.passingText}`}>訂單備註內容</div>
                  <textarea
                    className="form-control"
                    rows="3"
                    style={{ width: '94%' }}
                    // 抓取訂單備註內容
                    value={orderNotenow}
                    onChange={(e) => {
                      setOrderNotenow(e.target.value)
                    }}
                  ></textarea>
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
                        {/* 顯示總金額 */}
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
                        {/* 顯示總金額 */}
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
                          dispatch(setSelectedShippingMethod(shippingMethod))
                          dispatch(setSelectedPaymentMethod(paymentMethod))
                          dispatch(setOrderNote(orderNotenow))
                          if (shippingMethod === '711method') {
                            router.push('/cart/cartPaymentsSeven')
                          } else if (shippingMethod === 'balckcatmethod') {
                            router.push('/cart/cartPaymentmeow')
                          }
                        }}
                      >
                        前往結帳
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: '20px' }}>
              <div className="col-12" style={{ marginTop: '20px' }}>
                <Maybe />
              </div>
              <div className="col-12" style={{ marginTop: '20px' }}>
                <Buyagain />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Logintocart />
      )}
    </>
  )
}
