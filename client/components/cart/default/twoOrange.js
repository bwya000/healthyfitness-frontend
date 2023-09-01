import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartstylePay.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
//實體商品訂單明細組件
import ShopConfirm from '../shopConfirm'
//redux用
import { useSelector } from 'react-redux'

export default function TwoOrange() {
  //一次抓取redux所有Cart裡面的資料
  const cartData = useSelector((state) => state.cart)
  //以下為抓取redux內容
  const shoppingcart = cartData.shoppingcart //抓取購物車
  return (
    <>
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
            <div>購物車合計{shoppingcart.length}類</div>
            <div style={{ marginRight: '10px' }}></div>
            <i className="bi bi-arrow-down-square"></i>
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
    </>
  )
}
