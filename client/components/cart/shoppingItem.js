/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartstyle.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// 引入 useSelector 和 useDispatch
import { useSelector, useDispatch } from 'react-redux'
import { removeCart } from '@/pages/store/cartSlice'
import { fixItemnum } from '@/pages/store/cartSlice'

export default function ShoppingItem() {
  const shoppingcart = useSelector((state) => state.cart.shoppingcart)
  const dispatch = useDispatch()

  //這邊刪除目標商品
  const removeItem = (productId) => {
    dispatch(removeCart(productId))
  }
  //這邊修改商品數量
  const fixnumItem = (productId, PlusorSubtract) => {
    dispatch(fixItemnum({ productId, PlusorSubtract }))
  }

  return (
    <>
      {shoppingcart.map((item) => {
        return (
          <div
            className="row text-center border-top border-dark-subtle"
            style={{ height: '100px' }}
            key={item.productId}
          >
            <div className={`${styles.tableMain} col-1`}>
              <img
                src={`http://localhost:3000/images/product_img/${item.productImg}`}
                className={`${styles.productImg}`}
              ></img>
            </div>
            <div className={`${styles.productItem} col-2`}>
              {item.productTitle}
            </div>
            <div className={`${styles.productItem} col-2`}>
              {item.productColor}
            </div>
            <div className={`${styles.productItem} col-2`}>
              {item.productSize}
            </div>
            <div className={`${styles.productItem} col-2`}>
              {item.productPrice}
            </div>
            <div className={`${styles.productItem} col-2`}>
              <div className={`${styles.countBuynum}`}>
                <i
                  className={`${styles.forPoint} bi bi-plus-square fs-3`}
                  onClick={() => {
                    fixnumItem(item.productId, 1)
                  }}
                ></i>
                <div style={{ fontSize: '20px' }}>{item.productNum}</div>
                <i
                  className={`${styles.forPoint} bi bi-dash-square fs-3`}
                  onClick={() => {
                    fixnumItem(item.productId, -1)
                  }}
                ></i>
              </div>
            </div>
            <div className={`${styles.productItem} col-1`}>
              <i
                onClick={() => {
                  removeItem(item.productId)
                }}
                className={`bi bi-x-lg ${styles.pruductDelete} ${styles.forPoint}`}
              ></i>
            </div>
          </div>
        )
      })}
    </>
  )
}
