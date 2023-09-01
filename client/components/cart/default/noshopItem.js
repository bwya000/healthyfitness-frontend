/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '@/styles/cartstyle.module.css'
import { useRouter } from 'next/router'
import Maybe from './maybe'
import 'bootstrap/dist/css/bootstrap.min.css'
import Buyagain from './Buyagain'
import { useSelector } from 'react-redux'
export default function NoshopItem() {
  const filterbrowse = useSelector((state) => state.cart.filterbrowse)
  const router = useRouter()
  return (
    <>
      <div style={{ marginTop: '200px', marginBottom: '150px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>您的購物車還是空的</h1>
          <button
            type="button"
            className={`btn btn-light ${styles.orderButton}`}
            style={{ width: '150px', marginTop: '30px' }}
            onClick={() => {
              router.push('http://localhost:3000/product')
            }}
          >
            前往商城
          </button>

          <img
            src="/images/shoppingonline.gif"
            alt="SVG Image"
            style={{ width: '500px' }}
          />
        </div>
      </div>
      <div className="container" style={{ marginBottom: '30px' }}>
        <div className="row">
          {filterbrowse.length > 0 && (
            <>
              <div className="col-12">
                <Maybe />
              </div>
            </>
          )}
          <div className="col-12" style={{ marginTop: '30px' }}>
            <Buyagain />
          </div>
        </div>
      </div>
    </>
  )
}
