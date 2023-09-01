/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import axios from 'axios'

const Paycucess = ({ transactionId, orderId }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const linepayAmount = localStorage.getItem('linepayAmount')
        const backendEndpoint =
          'http://localhost:3005/api/cart/pay/linepaySuccess'

        const response = await axios.post(backendEndpoint, {
          transactionId,
          orderId,
          linepayAmount,
        })

        if (response.data.success) {
          localStorage.setItem('linepayStatus', 'true')
          localStorage.removeItem('linepayAmount')
          const timeout = setTimeout(() => {
            window.close()
          }, 2000)

          return () => clearTimeout(timeout)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [transactionId, orderId])

  return (
    <>
      <div style={{ marginTop: '250px', marginBottom: '150px' }}>
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
            src="/images/successfully-done.gif"
            alt="SVG Image"
            style={{ width: '500px' }}
          />
        </div>
      </div>
    </>
  )
}

Paycucess.getInitialProps = ({ query }) => {
  return { transactionId: query.transactionId, orderId: query.orderId }
}

export default Paycucess
