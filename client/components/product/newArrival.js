import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Image from 'next/image'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { v4 as uuidv4 } from 'uuid'

export default function NewArrival() {
  const [detailproduct, setDetailProduct] = useState([])

  useEffect(() => {
    async function fetchData() {
      const urlapi = `http://localhost:3005/api/getLastTenProducts`
      try {
        const response = await axios.get(urlapi)
        const productItems = response.data.productAll
        setDetailProduct(productItems)
      } catch (error) {
        console.error('獲取最後十個產品時出錯：', error)
      }
    }
    fetchData()
  }, [])

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // 創建一个視窗寬度變化時的事件監聽器
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // 初始化時獲得視窗寬度
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // 清除事件監聽器以防止内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const router = useRouter()

  const sliderRef = useRef(null)

  useEffect(() => {
    sliderRef.current.slickGoTo(0) // 将 Slider 返回到第一个产品
  }, [windowWidth])

  const goToProduct = (pid) => {
    router.push(`/product/${pid}`)
  }

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  }
  if (windowWidth < 768) {
    settings.slidesToShow = 2
  } else if (windowWidth < 1002) {
    settings.slidesToShow = 3
  } else if (windowWidth < 1455) {
    settings.slidesToShow = 4
  } else {
    settings.slidesToShow = 5
  }
  return (
    <>
      <h2>NEW ARRIVAL</h2>

      <Slider {...settings} ref={sliderRef} className="mb-3 slider">
        {detailproduct.map((product) => (
          <div className="card-1" key={uuidv4()}>
            <div
              key={product.p_id}
              className="card "
              onClick={() => goToProduct(product.p_id)}
            >
              <Image
                className="card-img-top"
                src={`/images/product_img/${product.p_image}`}
                alt={product.p_name}
                width={160}
                height={160}
                layout="responsive"
              />
              <div className="card-body">
                <h6 className="card-title text-center">{product.p_name}</h6>
                <p className="card-text text-center">NT${product.p_price}</p>
              </div>
              <div className="card-overlay">
                <button
                  className="addnew"
                  key={product.p_id}
                  onClick={() => goToProduct(product.p_id)}
                >
                  立即購買
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>
        {`
          .card {
            border-radius: 10px;
            border: 2px solid #e1e1e1;
            transition: transform 0.3s ease; /* 添加 transition 属性*/
            cursor: pointer;
          }
          .card-img-top {
            border-radius: 10px 10px 0 0;
            border: 1px solid #b8b8b8;
          }
          h2 {
            font-family: 'Noto Sans TC', sans-serif;
            text-align: center;
            font-size: 30px;
            color: #414141;
            letter-spacing: 4px;
            margin-bottom: 20px;
          }
          h6 {
            font-weight: bold;
          }
          p {
            font-size: 13px;
          }

          .card-1 {
            padding: 15px;
          }
          .card:hover {
            transform: scale(1.07);
            box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
          }

          /* 卡片覆蓋層的樣式 */
          .card-overlay {
            position: absolute;
            bottom: 0; /* 修改這裡的屬性為 bottom，使覆蓋層從底部開始 */
            left: 0;
            width: 100%;
            height: 0; /* 初始時高度為0，將在懸停時增加 */
            background-color: rgba(0, 0, 0, 0.1); /* 半透明的前景顏色 */
            opacity: 0; /* 初始時透明度為0 */
            transition: height 0.7s, opacity 0.7s; /* 添加過渡效果以平滑改變高度和透明度 */
            pointer-events: none; /* 讓覆蓋層不干擾鼠標事件 */
            border-radius: 10px;
            overflow: hidden; /* 隱藏內容溢出 */
          }

          /* 懸停效果 */
          .card:hover .card-overlay {
            height: 100%; /* 懸停時增加高度以顯示覆蓋層 */
            opacity: 1; /* 懸停時顯示覆蓋層 */
            cursor: pointer;
          }

          .addnew {
            background-color: #e25d31;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            height: 50px;
            width: 200px;
            cursor: pointer;
            transition: background-color 0.2s ease; /* 添加背景颜色过渡效果 */
            position: absolute; /* 绝对定位 */
            bottom: 5%; /* 控制按钮距离覆盖层底部的距离 */
            left: 50%; /* 将按钮水平居中 */
            transform: translateX(-50%); /* 水平居中 */
            cursor: pointer;
          }

          .addnew:hover {
            font-size: 16px;
            background-color: #000; /* 鼠标悬停时更改背景颜色 */
            color: #fff;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
