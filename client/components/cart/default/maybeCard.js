/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

export default function maybeCard({ pid }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setproduct] = useState(null)
  const gerproduct = async () => {
    const res = await axios.post('http://localhost:3005/api/cart/getmaybe', {
      Pid: pid,
    })
    setproduct(res.data.message)
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    gerproduct()
  }, [])

  const goproduct = () => {
    router.push(`http://localhost:3000/product/${pid}`)
  }
  return (
    <>
      {product ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className="card"
          style={{ width: '18rem', cursor: 'pointer' }}
          onClick={goproduct}
          key={uuidv4()}
        >
          <img
            src={`http://localhost:3000/images/product_img/${product.p_image}`}
            className="card-img-top"
            alt="maybeproduct"
          />
          <div
            className="card-body"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <p className="card-text">{product.p_name}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
