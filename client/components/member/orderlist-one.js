import React from 'react'
import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function OrderlistOone({
  maindata, //主訂單
  detail, //訂單細節
}) {
  const router = useRouter()
  const userid = useSelector((state) => state.user.user.member_id) //現在登入的使用者id

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [totalSum, setTotalSum] = useState(0)

  //傳送訂單資訊
  const commit = (item) => {
    const serializedItem = JSON.stringify(item) // 序列化订单信息
    router.push({
      pathname: '/product/productFeedback',
      query: {
        orderdetail: serializedItem,
      },
    })
  }

  useEffect(() => {
    // 假設 detail 是一個包含細項的陣列
    const calculatedTotalSum = detail.reduce((sum, item) => {
      const price = item.p_price * item.buynum // 使用 p_price 屬性
      return sum + price
    }, 0)

    setTotalSum(calculatedTotalSum)
  }, [detail])

  return (
    <>
      <div className="row order-one mb-4">
        <div className="order-number col  d-flex align-items-center justify-content-center">
          訂單編號: {maindata.orderrealShortID}
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <Image
            src={`http://localhost:3000/images/product_img/${detail[0].p_image}`}
            width={120}
            height={120}
            alt="訂單圖片"
            style={{ marginBlock: '10px' }}
          />
        </div>
        <div className="order-date col  d-flex align-items-center justify-content-center">
          訂單日期: {maindata.orderreal_date}
        </div>
        <div className="order-amount col  d-flex align-items-center justify-content-center">
          訂單金額: NT$ {totalSum ? totalSum : <p>Loading...</p>}
        </div>

        <button className="view-detail-btn " onClick={handleShow}>
          <i className="fa-solid fa-angle-down me-2" />
          檢視詳情
        </button>
      </div>
      {/* 訂單詳情Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        contentLabel="Order Details"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ marginTop: '40px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="title">
            訂單詳情
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5 className="d-flex justify-content-center title">訂單內容</h5>
            <table className="order-detail table table-striped table-hover table-bordered ">
              <thead>
                <tr>
                  <th>商品</th>
                  <th>品名</th>
                  <th>顏色</th>
                  <th>尺寸</th>
                  <th>金額</th>
                  <th>數量</th>
                  <th></th>
                </tr>
              </thead>
              {detail.map((itemdetail) => {
                {
                  /* console.log(item) */
                }
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src={`http://localhost:3000/images/product_img/${itemdetail.p_image}`}
                            alt="Product"
                            style={{ width: '100px' }}
                          />
                        </td>
                        <td>{itemdetail.p_name}</td>
                        <td>
                          {itemdetail.p_specification
                            ? itemdetail.p_specification
                            : '單色'}
                        </td>
                        <td>
                          {itemdetail.p_size ? itemdetail.p_size : '零碼'}
                        </td>
                        <td>${itemdetail.p_price}</td>
                        <td>{itemdetail.buynum}</td>
                        <td>
                          <button
                            className="addfeedback"
                            onClick={() => commit(itemdetail)}
                          >
                            填寫評論
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                )
              })}
            </table>
          </div>

          <div>
            <h5 className="d-flex justify-content-center title">訂購人資訊</h5>
            <table className="order-methods">
              <tbody>
                <tr>
                  <td className="cell-label">收件人：</td>
                  <td className="text-align-left">{maindata.receiver}</td>
                </tr>
                <tr>
                  <td className="cell-label">電話：</td>
                  <td>{maindata.receiver_phone}</td>
                </tr>
                <tr>
                  <td className="cell-label">付款方式：</td>
                  <td>{maindata.PAY_methods}</td>
                </tr>
                <tr>
                  <td className="cell-label">取貨方式：</td>
                  <td>{maindata.Shipping_methods}</td>
                </tr>
                <tr>
                  <td className="cell-label">付款金額：</td>
                  <td>NT$ {totalSum ? totalSum : <p>Loading...</p>}</td>
                </tr>
                <tr>
                  <td className="cell-label">訂單日期：</td>
                  <td>{maindata.orderreal_date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

          .order-one {
            background: #ffffff;
            border-radius: 10px 10px 10px 10px;
          }

          .order-detail {
            height: 500px;
            width: 100%;
          }
          .view-detail-btn {
            color: #fff;
            background-color: #777777;
            border-radius: 0 0 10px 10px;
            height: 35px;
            border: none;
          }
          .addfeedback {
            background: #e25d31;
            color: #fff;
            border-radius: 10px;
            border: none;
            height: 32px;
            font-size: 14px;
          }

          .title {
            font-weight: bold;
          }

          .order-methods {
            /* 您的表格樣式 */
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px; /* 調整上邊距以與上方內容有間距 */
          }

          .order-methods td {
            /* 基本單元格樣式 */
            padding: 8px;
             {
              /* text-align: center; */
            }
          }

          .cell-label {
            /* 標籤儲存格樣式 */
            width: 1%; /* 讓儲存格按照文字大小調整寬度 */
            white-space: nowrap; /* 防止文字換行 */
            font-weight: bold;
          }
        `}
      </style>
    </>
  )
}
