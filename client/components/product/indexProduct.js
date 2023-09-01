import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'

import { useRouter } from 'next/router'

export default function IndexProduct() {
  const router = useRouter()

  return (
    <>
      <h2>商城</h2>
      <h4 className="mb-4">NEW ARRIVEL</h4>
      <div className="row justify-content-center">
        <div
          className="card"
          onClick={() => {
            router.push(`/product/2`)
          }}
        >
          <img
            src={`http://localhost:3000/images/product_img/4kg_kettlebell.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-text">4KG 壺鈴</h5>
            <p>NT$699</p>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            router.push(`/product/14`)
          }}
        >
          <img
            src={`http://localhost:3000/images/product_img/sports_bra_black.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-text">中強度健身運動內衣</h5>
            <p>NT$749</p>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            router.push(`/product/24`)
          }}
        >
          <img
            src={`http://localhost:3000/images/product_img/10.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-text">男款初階健身長褲</h5>
            <p>NT$499</p>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            router.push(`/product/21`)
          }}
        >
          <img
            src={`http://localhost:3000/images/product_img/03.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-text">22KG 翹臀圈</h5>
            <p>NT$249</p>
          </div>
        </div>
      </div>
      <button
        className="mt-4 mb-4 btn btn2"
        onClick={() => {
          router.push(`/product`)
        }}
      >
        觀看更多
      </button>
      <style jsx>
        {`
          .card {
            width: 18rem;
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            /* 使用Flex布局 */
            flex-direction: column;
            /* 垂直方向布局 */
            align-items: center;
            /* 在水平方向上居中對齊 */
            justify-content: center;
            /* 在垂直方向上居中對齊 */
            margin: 20px;
          }
          .row {
            align-items: center;
          }
          h5 {
            font-weight: bold;
            color: #ea6f2a;
          }
          img {
            width: 200px;
            height: 200px;
            align-items: center;
            margin: 20px 0 20px 0;
          }
          /* 添加:hover */
          .card:hover {
            transform: scale(1.1);
            /* 放大圖像到110% */
            transition: 0.4s;
          }
          h2 {
            color: #4a4a4a;
            font-weight: bold;
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 5px;
          }
          h4 {
            color: #4a4a4a;
            letter-spacing: 4px;
          }
          .btn {
            font-size: 20px;
            font-family: 'Noto Sans TC', sans-serif;
            border-radius: 10px;
            height: 60px;
            width: 180px;
            display: inline-block;
            text-decoration: none;
            padding: 10px 15px;
            color: #f36f36;
            position: relative;
            overflow: hidden;
            margin: 0 10px;
          }
          /* btn2 */
          .btn2 {
            font-family: 'Noto Sans TC', sans-serif;
            transition: color 0.8s 0.2s;
          }

          .btn2:hover {
            color: #fff;
          }

          .btn2::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            top: 95%;
            width: 100%;
            background-color: #f36f36;
            transition: 1s;
            z-index: -1;
          }

          .btn2:hover:before {
            top: 0;
          }
        `}
      </style>
    </>
  )
}
