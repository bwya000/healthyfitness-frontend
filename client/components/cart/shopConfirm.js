/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartstylePay.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入 useSelector
import { useSelector } from 'react-redux'

export default function ShopConfirm() {
  const shoppingcart = useSelector((state) => state.cart.shoppingcart)
  return (
    <>
      {shoppingcart.map((item) => {
        return (
          <div
            className="row text-center border-top border-dark-subtle"
            style={{ height: '100px' }}
            key={item.productId}
          >
            <div className={`${styles.tableMain} col-2`}>
              <img
                src={`http://localhost:3000/images/product_img/${item.productImg}`}
                className={`${styles.productImg}`}
              ></img>
            </div>
            <div className={`${styles.productItem} col-2`}>
              {item.productTitle}
            </div>
            <div className={`${styles.productItem} col-2`}>
              <div>{item.productColor}</div>
            </div>
            <div className={`${styles.productItem} col-2`}>
              <div>{item.productSize}</div>
            </div>
            <div className={`${styles.productItem} col-2`}>
              NT${item.productPrice}
            </div>
            <div className={`${styles.productItem} col-2`}>
              <div style={{ fontSize: '20px' }}>{item.productNum}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}
