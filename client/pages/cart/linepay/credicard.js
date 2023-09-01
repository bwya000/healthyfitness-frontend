import React, { useEffect } from 'react'
import { Checkout } from './checkout'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
library.add(faCreditCard)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Credicard() {
  useEffect(() => {
    //從localStorage提取信用卡支付狀態
    const storedPaynow = localStorage.getItem('paynow')
    if (storedPaynow) {
      const paynowObj = JSON.parse(storedPaynow)
      //執行支付
      Checkout(paynowObj)
    }
  }, [])

  return (
    <>
      <div style={{ marginTop: '250px', marginBottom: '550px' }}>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
            'align-items': 'center',
          }}
        >
          <h1 style={{ marginBottom: '150px' }}>前往信用卡付款...</h1>
          <FontAwesomeIcon
            icon={faCreditCard}
            bounce
            style={{ color: '#f36f36', 'font-size': '150px' }}
          />
        </div>
      </div>
    </>
  )
}
