import React from 'react'
import Link from 'next/link'
import FavoriteProductOne from '@/components/favorite-list/favorite-product-one'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import useAuthGuard from '../authGuard' //使用路由守衛
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//redux用
import { useSelector, useDispatch } from 'react-redux'
//登入者碎片
import { setFavoriteProductData } from '@/pages/store/userSlice'

export default function favoriteProduct() {
  const auth = useAuthGuard() //路由守衛直接掛在第一行

  const favv_id = uuidv4()
  const dataFavoriteProduct = useSelector(
    (state) => state.favoriteProduct.favProducts
  )

  if (auth === null) {
    return <p>Loading...</p>
  }

  if (!auth) {
    let timerInterval
    Swal.fire({
      title: '請登入以後再查看收藏商品',
      icon: 'warning',
      html: 'will be closed in <b></b> milliseconds.',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
        window.location.href = '/login'
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    return null // 返回 null 来防止其他内容的渲染
  }

  // const memberid = useSelector((state) => state.user.user.member_id)

  //redux用於寫入資料,使用方式 dispatch(你的方法)
  // const dispatch = useDispatch()

  // const [favoriteProducts, setFavoriteProducts] = useState([])
  // // 從資料庫中取得資料並更新狀態
  // useEffect(() => {
  //   // let test = []
  //   async function favoriteProduct() {
  //     const res = await axios.post(
  //       'http://localhost:3005/api/member/favorite-product',
  //       {
  //         member: memberid,
  //       }
  //     )
  //     const result = res.data.product
  //     // const url = 'http://localhost:3005/api/member/favorite-product'
  //     // const response = await fetch(url)
  //     // const res = await response.json()

  //     setFavoriteProducts(result)
  //     // console.log(res.product)
  //     // 寫入使用者碎片(redux)
  //     // const test = res.product
  //     result.map((item) => {
  //       // console.log(item)
  //       dispatch(setFavoriteProductData(item))
  //     })
  //   }
  //   // console.log(test)
  //   favoriteProduct()
  // }, [])

  return (
    <>
      {auth ? (
        <>
          <div className="container-fluid mt-5 mx-auto">
            <div className="row ">
              <div className="mt-5 col-4 d-flex justify-content-center">
                <SideBar />
              </div>
              <div className="mt-5 col-8 d-flex justify-content-start">
                <div>
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active edit"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="true"
                      >
                        <i
                          className="fa-solid fa-dumbbell"
                          style={{ marginRight: '15px' }}
                        />
                        商品
                      </button>
                    </div>
                  </nav>

                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active scrollable-tab-pane"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div className="cards-container d-flex justify-content-start">
                        {dataFavoriteProduct.map((product) => (
                          <div key={product.p_id}>
                            <FavoriteProductOne
                              p_id={product.p_id}
                              p_image={product.p_image}
                              p_name={product.p_name}
                              p_price={product.p_price}
                              category_name={product.category_name}
                              member_id={product.member_id}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>
            {`
              @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

              p {
                font-size: 20px;
                color: #777777;
              }

              .nav-ink {
                color: #777777;
              }

              .nav-tabs {
                border: none;
                outline: none;
              }

              .nav-tabs .nav-link {
                color: #777777;
                background-color: #e6e6e6;
                border-radius: 20px 20px 0 0;
              }

              .nav-tabs .nav-link.active {
                color: #777777; /* 選中的按鈕文字顏色 */
                background-color: #e6e6e6; /* 選中的按鈕背景顏色 */
                border-bottom-color: transparent; /* 選中的按鈕底部邊框透明 */
              }

              .tab-pane {
                background-color: #e6e6e6;
                border-radius: 0px 30px 30px 30px;
                padding: 30px;
                width: 1000px;
                height: 750px;
                box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25); /* 添加阴影效果 */
              }

              .btn-confirm {
                position: absolute;
                bottom: 40px;
                right: 600px;
                background-color: #ea6f2a;
                color: #ffffff;
                border-radius: 50px;
              }

              .tab-pane label {
                color: #6d6969;
              }

              /* input 的樣式 */
              .tab-pane input,
              .tab-pane select {
                width: 100%;
                height: 50px;
                background-color: #f4f4f4;
                border-radius: 20px;
                margin-bottom: 20px;
                padding: 10px;
                border: none;
              }

              .scrollable-tab-pane {
                height: 750px; /* Set your desired height */
                overflow-y: auto;
              }

              .cards-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: space-between;
                padding-top: 20px;
              }

              .card {
                width: calc(
                  33.33% - 20px
                ); /* Adjust the width based on your layout */
                position: relative;
                /* Add your other styles for the cards here */
                border-radius: 10px;
              }
            `}
          </style>
        </>
      ) : (
        <p style={{ marginTop: '110px', marginBottom: '500px' }}>
          您必須登入，才能編輯個人資料
        </p>
      )}
    </>
  )
}
