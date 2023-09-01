import React from 'react'
import styles from '@/styles/cartstyle.module.css'
import { useRouter } from 'next/router'
export default function Logintocart() {
  const router = useRouter()
  return (
    <>
        <div style={{ marginTop: '200px', marginBottom: '150px' }}>
            <div style={{display:'flex','flexDirection': 'column','justifyContent': 'center','alignItems': 'center'}}>
            <h1>請登入使用購物車!</h1>
            <button
                    type="button"
                    className={`btn btn-light ${styles.orderButton}`}
                    style={{width:'150px',marginTop:'30px'}}
                    onClick={() => {
                      router.push('http://localhost:3000/login')
                    }}
                  >
                    前往登入
                  </button>
            <img src="/images/shoppingonline.gif" alt="SVG Image" style={{width:'500px'}}/>
            </div>
        </div>
    </>
  )
}
