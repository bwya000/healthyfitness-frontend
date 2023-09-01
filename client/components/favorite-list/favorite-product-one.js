// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanFavoriteProduct } from '@/pages/store/favoriteproductSlice'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2

export default function FavoriteProductOne({
  p_id,
  p_name,
  p_image,
  category_name,
  p_price,
}) {
  const router = useRouter()

  const dispatch = useDispatch()
  const member_id = useSelector((state) => state.user.user.member_id) //抓取登入的memberID
  const [isModalOpen, setIsModalOpen] = useState(false) //modal的開關狀態

  const handleRemoveFavorite = async () => {
    dispatch(cleanFavoriteProduct(p_id))
    try {
      const response =
        await axios.delete(`http://localhost:3005/api/cleanFavoriteProduct/?p_id=${p_id}&memberid=${member_id}
      `)
      //console.log(response.data.success)
      Swal.fire({
        icon: 'success',
        title: '移除成功',
        text: '商品已從收藏中移除！',
        confirmButtonColor: '#EA6F2A',
      })
    } catch (error) {
      console.error('Error removing from favorites:', error)
    }
  }

  const handleDetailClick = () => {
    router.push(`/product/${p_id}`)
  }

  return (
    <>
      <div
        className="card"
        style={{
          width: '18rem',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={`http://localhost:3000/images/product_img/${p_image}`}
          width={200}
          height={200}
          className="card-img-top"
          alt="..."
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            paddingBottom: '10px',
            paddingTop: '10px',
          }}
        />
        <div
          className="card-body"
          style={{
            textAlign: 'left',
            padding: '10px 0',
            width: '100%',
            paddingLeft: '20px',
          }}
        >
          <h5 className="card-text">{p_name}</h5>
          <p>{category_name}</p>
          <p>NT${p_price}</p>
        </div>

        {/* 刪除按鈕 */}
        <button
          style={{
            position: 'absolute',
            top: 7,
            right: 7,
            color: '#e25d31',
            fontSize: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleRemoveFavorite(p_id)}
        >
          <i className="fa-solid fa-circle-minus" />
        </button>

        {/* 購物車按鈕 */}
        <button
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
            backgroundColor: '#FFFF',
            borderRadius: '10px',
            width: 50,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleDetailClick}
        >
          <i
            className="bi bi-cart4"
            style={{ color: '#e25d31', fontSize: 35 }}
          />
        </button>
      </div>

      <style jsx>
        {`
          .card {
            width: calc(
              33.33% - 20px
            ); /* Adjust the width based on your layout */
            position: relative;

            border-radius: 20px;
          }

          h5 {
            font-weight: bold;
          }
        `}
      </style>
    </>
  )
}
