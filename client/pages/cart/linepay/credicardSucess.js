/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'

export default function CredicardSucess() {
  useEffect(() => {
    // 移除 'paynow' 數據
    localStorage.removeItem('paynow')
    //首次執行,將添加信用卡付款成功
    localStorage.setItem('credicard', 'success')
    // 3秒後自動關閉
    const closePageTimeout = setTimeout(() => {
      // 關閉頁面
      window.close()
    }, 3000)

    // 卸除掛載
    return () => clearTimeout(closePageTimeout)
  }, [])

  return (
    <>
      <div style={{ marginTop: '210px', marginBottom: '150px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>付款成功</h1>
          <img
            src="/images/creditSuccess.gif"
            alt="SVG Image"
            style={{ width: '600px' }}
          />
        </div>
      </div>
    </>
  )
}
