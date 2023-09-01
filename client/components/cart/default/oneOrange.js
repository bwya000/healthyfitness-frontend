{
  /* 商品陳列列表,可修改數量與取消 */
}
//React組件
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
//自己的組件
import styles from '@/styles/cartstyle.module.css'
import ShoppingItem from '@/components/cart/shoppingItem'

export default function OneOrange() {
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

      {/* 訂購商品陳列與修改 */}
      <div className={`${styles.productbox} container mt-2`}>
        <div
          className="row text-center"
          style={{
            height: '60px',
            background: '#EEEEEE',
            borderRadius: '25px 25px 0px 0px',
          }}
        >
          <div
            className={`${styles.tableMain} col-1`}
            style={{ fontSize: '24px' }}
          >
            購物車
          </div>
          <div className="col-11"></div>
        </div>

        <div
          className="row text-center border-top border-dark-subtle"
          style={{ height: '60px' }}
        >
          <div className={`${styles.tableMain} col-1`}>商品</div>
          <div className={`${styles.tableMain} col-2`}>品名</div>
          <div className={`${styles.tableMain} col-2`}>顏色</div>
          <div className={`${styles.tableMain} col-2`}>尺寸</div>
          <div className={`${styles.tableMain} col-2`}>金額</div>
          <div className={`${styles.tableMain} col-2`}>數量</div>
          <div className={`${styles.tableMain} col-1`}></div>
        </div>

        {/* 商品陳列,之後將是map開始 */}

        <ShoppingItem />
        {/* </div> */}
      </div>
    </>
  )
}
