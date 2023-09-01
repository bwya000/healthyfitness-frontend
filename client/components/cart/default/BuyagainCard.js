import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartstyle.module.css'
import { useDispatch } from 'react-redux'
import { setCart } from '@/pages/store/cartSlice'
import { v4 as uuidv4 } from 'uuid'
export default function BuyagainCard({ sku }) {
  const dispatch = useDispatch()
  return (
    <>
      <div className="card" style={{ width: '18rem' }} key={uuidv4()}>
        <img
          src={`http://localhost:3000/images/product_img/${sku.p_image}`}
          className="card-img-top"
          alt="sku"
        />
        <div className="card-body">
          <h5 className="card-title">{sku.p_name}</h5>
          <div className="card-text">
            <p>顏色 : {sku.p_specification ? sku.p_specification : '單色'}</p>
            <p>尺寸 : {sku.p_size ? sku.p_size : '零碼'}</p>
          </div>
          <button
            type="button"
            className={`btn btn-light ${styles.orderButton}`}
            onClick={() => {
              const newproduct = {
                productId: sku.skuID,
                productTitle: sku.p_name,
                productImg: sku.p_image,
                productColor: sku.p_specification
                  ? sku.p_specification
                  : '單色',
                productSize: sku.p_size ? sku.p_size : '零碼',
                productPrice: sku.p_price,
                productNum: 1,
              }
              dispatch(setCart(newproduct))
            }}
          >
            再買一次
          </button>
        </div>
      </div>
    </>
  )
}
