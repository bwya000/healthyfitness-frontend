import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavoriteProduct,
  cleanFavoriteProduct,
} from '@/pages/store/favoriteproductSlice'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2' // Import SweetAlert2

export default function ProductCard({ p_id, p_name, p_price, p_image }) {
  const [detailproduct, setDetailProduct] = useState(null)
  const router = useRouter()
  const [filled, setFilled] = useState(false) //設定收藏轉換
  const { pid } = router.query
  const dispatch = useDispatch()
  const favProducts = useSelector((state) => state.favoriteProduct.favProducts)
  // console.log(favProducts)

  const member_id = useSelector((state) => state.user.user.member_id)

  // const handleIconClick = (event) => {
  //   //阻止事件冒泡，以阻止觸發父元素的點擊事件
  //   event.stopPropagation()
  //   setFilled(!filled)
  // }
  useEffect(() => {
    async function getproductDetail() {
      if (pid) {
        const urlapi = `http://localhost:3005/api/getproductDetail?productID=${pid}`
        const response = await fetch(urlapi)
        const res = await response.json()
        const productItem = res.productDetail[0]
        setDetailProduct(productItem)
      }
    }
    getproductDetail()
  }, [pid, router.isReady])

  useEffect(() => {
    setFilled(favProducts.some((item) => item.p_id === p_id))
  }, [favProducts, p_id])

  const handleIconClick = async (event) => {
    event.stopPropagation()
    if (member_id) {
      if (filled) {
        dispatch(cleanFavoriteProduct(p_id))
        try {
          const response = await axios.delete(
            `http://localhost:3005/api/cleanFavoriteProduct/?p_id=${p_id}&memberid=${member_id}`
          )
          console.log('移除成功')
          Swal.fire({
            icon: 'success',
            title: '移除成功',
            text: '商品已從收藏中移除！',
            confirmButtonColor: '#EA6F2A',
          })
        } catch (error) {
          console.log('移除失敗')
        }
      } else {
        const productData = {
          p_id: p_id,
          p_name: p_name,
          p_price: p_price,
          p_image: p_image,
          member_id: member_id,
        }
        dispatch(addFavoriteProduct(productData))
        try {
          const response = await axios.post(
            `http://localhost:3005/api/postFavoriteProduct`,
            productData
          )
          console.log(response.data.success)
          Swal.fire({
            icon: 'success',
            title: '加入收藏成功',
            text: '商品已加入收藏！',
            confirmButtonColor: '#EA6F2A',
          })
        } catch (error) {
          console.error('Error adding to favorites:', error)
        }
      }
      setFilled(!filled)
    } else {
      Swal.fire({
        icon: 'warning',
        title: '您必須先登入才能加入收藏！',
        showCancelButton: true,
        confirmButtonText: '馬上登入',
        cancelButtonText: '取消',
        confirmButtonColor: '#EA6F2A',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('http://localhost:3000/login')
        } else {
        }
      })
    }
  }

  const handleCardClick = () => {
    router.push(`/product/${p_id}`)
  }

  // 計算等比例縮放的寬度
  const imageWidth = 212 // 固定寬度
  const originalImageWidth = 500 // 假設圖片的原始寬度
  const originalImageHeight = 500 // 假設圖片的原始高度
  const imageHeight = (originalImageHeight / originalImageWidth) * imageWidth

  return (
    <div className="col">
      <div className="card " onClick={handleCardClick}>
        <Image
          src={`/images/product_img/${p_image}`}
          width={imageWidth}
          height={imageHeight}
          className="card-img-top"
          alt="..."
        />
        <div
          className={`bootstrap-icon ${
            filled ? 'bi-suit-heart-fill' : 'bi-suit-heart'
          }`}
          onClick={handleIconClick}
        ></div>
        <div className="card-body">
          <h6 className="card-title text-center">{p_name}</h6>
          <p className="card-text text-center">NT${p_price}</p>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            position: relative;
            display: inline-block;
            cursor: pointer;
            min-width: 212px;
            transition: transform 0.2s ease; /* 添加 transition 属性，速度较慢 (0.3秒) */
          }

          .card:hover {
            box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.1);
            border: 1px solid #e1e1e1;
            transform: scale(1.03);
          }

          /* 設定Bootstrap Icon的樣式 */
          .bootstrap-icon {
            position: absolute;
            top: 0.5rem; /* 調整垂直位置 */
            right: 0.5rem; /* 調整水平位置 */
            font-size: 1rem; /* 調整Icon的大小 */
            color: rgb(117, 117, 117); /* 設定Icon的顏色 */
          }

          .bi-suit-heart-fill {
            font-size: 1rem; /* 調整填充Icon的大小 */
            color: pink; /* 填充的顏色 */
          }

          h6 {
            font-weight: bold;
          }
          p {
            font-size: 13px;
          }
          // swal alert
          .confirm-button {
            background-color: #EA6F2A; 
            color: white; 
          
          .cancel-button {
            background-color: #f44336; 
            color: white; 
          }
          .swal2-popup.swal2-modal {
            font-size: 10pt; 
        }
        .swal2-modal .swal2-title {
            font-size: 1.2em;
        }
        .swal2-modal button {
            padding: 3px 6px;
        `}
      </style>
    </div>
  )
}
