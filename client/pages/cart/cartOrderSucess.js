'use client'
import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartorderSucess.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
//自己的組件
import ShopConfirm from '@/components/cart/shopConfirm'
//redux用
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../store/cartSlice'

export default function Cartpaymentmeow() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    // 删除 localStorage 中的 linepayStatus
    localStorage.removeItem('linepayStatus')
    localStorage.setItem('credicard', 'false')
  }, [])
  const cartData = useSelector((state) => state.cart)

  //點選回首頁觸發的動作
  const handleButtonClick = () => {
    dispatch(reset())
    router.push('/')
  }
  
  //監聽離開頁面事件
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <>
      {/* 橘點 */}
      <div className="container">
        <div className="row" style={{ marginTop: '110px' }}>
          <div className="col d-flex align-items-center justify-content-end">
            <div
              className={`${styles.dot1} d-flex align-items-center justify-content-center`}
            >
              <p style={{ fontSize: '15px', color: 'white' }} className="mt-3">
                1
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div
              className={`${styles.dot2} d-flex align-items-center justify-content-center`}
            >
              <p style={{ fontSize: '15px', color: 'white' }} className="mt-3">
                2
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-center justify-content-start">
            <div
              className={`${styles.dot3} d-flex align-items-center justify-content-center`}
            >
              <p style={{ fontSize: '15px', color: 'white' }} className="mt-3">
                3
              </p>
            </div>
          </div>
        </div>

        {/* 三個點描述 */}
        <div className="row">
          <div
            className="col-12 "
            style={{ display: 'flex', marginTop: '8px' }}
          >
            <div style={{ marginLeft: '28.7%' }}>購物車</div>
            <div style={{ marginLeft: '15.2%' }}>填寫資料</div>
            <div style={{ marginLeft: '14.5%' }}>訂單確認</div>
          </div>
        </div>
      </div>

      {/* 訂購商品已不能修改,下拉陳列 */}
      <div className={`${styles.productbox} container mt-2`}>
        <div
          className="row text-center "
          data-bs-toggle="collapse"
          href="#collapseOrderdetail"
          role="button"
          aria-expanded="false"
          aria-controls="collapseOrderdetail"
          style={{
            height: '60px',
            background: '#EEEEEE',
            borderRadius: '25px 25px 25px 25px',
          }}
        >
          <div className={`${styles.tableMaintitle} col-12`}>
            <div>購物車</div>
            <div style={{ marginRight: '10px' }}>
              {cartData.shoppingcart.length}
            </div>
            <i class="bi bi-arrow-down-square"></i>
          </div>
        </div>
        <div className={`collapse ${styles} row`} id="collapseOrderdetail">
          <div
            className="card card-body col-12"
            style={{
              border: '0px solid red',
              borderRadius: '0px 0px 25px 25px',
              paddingTop: '0px',
            }}
          >
            <div
              className="row text-center border-top border-dark-subtle"
              style={{ height: '60px' }}
            >
              <div className={`${styles.tableMain} col-2`}>商品</div>
              <div className={`${styles.tableMain} col-2`}>品名</div>
              <div className={`${styles.tableMain} col-2`}>顏色</div>
              <div className={`${styles.tableMain} col-2`}>尺寸</div>
              <div className={`${styles.tableMain} col-2`}>金額</div>
              <div className={`${styles.tableMain} col-2`}>數量</div>
            </div>
            <ShopConfirm />
          </div>
        </div>
      </div>
      <div className={`container mt-3`}>
        <div className={`row`}>
          {/* 下欄，訂單成立表 */}
          <div className={`${styles.sendBox} col-12`}>
            <div
              className={`${styles.productbox} row `}
              style={{
                height: '60px',
                background: '#414141',
                borderRadius: '25px 25px 0px 0px',
              }}
            >
              <div
                className={`${styles.tablePassing} `}
                style={{ fontSize: '24px' }}
              >
                <div style={{ color: '#FFFFFF' }}>訂單已成立</div>
                <i
                  class="bi bi-check-circle fs-3"
                  style={{ color: '#e25d31', marginLeft: '10px' }}
                ></i>
              </div>
            </div>

            <div className={`${styles.passing} row  `}>
              <div className={`col-6`} style={{ height: '100%' }}>
                <div
                  className="row"
                  style={{
                    height: '100%',
                  }}
                >
                  <div className={`${styles.orderdetailLeft} col-4`}>
                    <div>訂單編號</div>
                    <div>收件人</div>
                    <div>電話</div>
                    <div>付款方式</div>
                    <div>取貨方式</div>
                    <div>付款金額</div>
                    <div>訂單日期</div>
                  </div>
                  <div className={`${styles.orderdetailRight} col-6`}>
                    <div>{cartData.orderMenu.orderNumber}</div>
                    <div>{cartData.receviver_date.name}</div>
                    <div>{cartData.receviver_date.phone}</div>
                    <div>{cartData.selectedPaymentMethod}(已付款)</div>
                    <div>
                      {cartData.sevenStore.storeName !== '' ? (
                        <>7-11超商取貨:{cartData.sevenStore.storeName}</>
                      ) : (
                        cartData.meowAdress
                      )}
                    </div>
                    <div>NT ${cartData.totalPrice}</div>
                    <div>{cartData.orderMenu.orderDate}</div>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
              <div
                style={{ height: '100%' }}
                className={`${styles.cancelButton} col-6`}
              >
                <div style={{ width: '30%' }}>
                  <button
                    type="button"
                    className={`btn btn-light ${styles.orderButton}`}
                    onClick={handleButtonClick}
                  >
                    返回首頁
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
