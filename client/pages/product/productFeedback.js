import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
//react的alert
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Swal from 'sweetalert2'

export default function ProductFeedback() {
  const userid = useSelector((state) => state.user.user.member_id)
  //selectedStars 星數幾分
  //sku.p_id 商品的p_id
  //commitvalue 評論內容
  //userid 現在使用會員的id
  const router = useRouter()
  const [sku, setsku] = useState('')
  const { orderdetail } = router.query
  useEffect(() => {
    if (orderdetail) {
      const parsedItem = JSON.parse(orderdetail)
      setsku(parsedItem)
    }
  }, [orderdetail])
  //評價系統
  const [selectedStars, setSelectedStars] = useState(0) //星數幾分
  const handleStarClick = (stars) => {
    setSelectedStars(stars)
  }
  console.log(sku)
  //輸入的評價
  const [commitvalue, setCommitvalue] = useState('')
  const [characterCount, setCharacterCount] = useState(0)
  const maxCharacterCount = 100 // 設定最多輸入字

  // 用於跟蹤錯誤的狀態
  const [error, setError] = useState('')

  const sendCommit = async () => {
    if (selectedStars === 0) {
      setError('請點選評分')
      return
    }
    const allsay = {
      stars: selectedStars,
      pid: sku.p_id,
      commit: commitvalue,
      memberid: userid,
    }
    const res = await axios.post('http://localhost:3005/api/getCommit', allsay)
    if (res.data.success) {
      router.push('/')
    }
  }
  //送出評價
  const handleLinePay = () => {
    Swal.fire({
      title: '送出評價無法再修改，確定送出？',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      confirmButtonColor: '#EA6F2A',
    }).then((result) => {
      if (result.isConfirmed) {
        sendCommit()
      }
    })
  }

  const handleTextChange = (e) => {
    const text = e.target.value
    if (text.length <= maxCharacterCount) {
      setCommitvalue(text)
      setCharacterCount(text.length)
    }
  }

  return (
    <>
      <div className="container" style={{ marginTop: 130 }}>
        <div className="row">
          {/* <!-- 左欄 --> */}
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto text-start">
            <div className="title">
              <h5>請填寫回饋</h5>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mx-md-0 mx-auto text-md-right mt-3">
            <div class="d-flex justify-content-md-end justify-content-center">
              <Image
                src={`/images/product_img/${sku.p_image}`}
                alt="ProductImage"
                height={300}
                width={300}
              />
            </div>
          </div>
          {/* <!-- 右欄 --> */}
          <div className="col-lg-6 col-md-6 col-sm-12 mx-auto text-md-left text-start">
            <div className="pname">
              <div className="header">
                <h5 className="heading heading-h4 mt-4 title">{sku.p_name}</h5>
              </div>
              <div className="price">
                <p className="theme-color">NT$ {sku.p_price}</p>
              </div>
              {/* 規格選擇 */}
              <div className="quenty-container">
                <div className="quenty-button mt-3">
                  <h6 className="heading heading-h6">數量: {sku.buynum}</h6>
                </div>
                <div className="quenty-button mt-3">
                  <h6 className="heading heading-h6">
                    顏色: {sku.p_specification ? sku.p_specification : '單色'}
                  </h6>
                </div>
                <div className="quenty-button mt-3">
                  <h6 className="heading heading-h6">
                    尺寸: {sku.p_size ? sku.p_size : '零碼'}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <!-- 下面一欄 --> */}
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto text-start">
            <div className="box1">
              <div className="col-12">
                {/* 回饋小格子 */}
                <div className="feedbackdesc mt-4 mb-4">
                  <h5 className="">商品回饋</h5>
                  <h6>
                    評分
                    {error && (
                      <div className="error" style={{ display: ' inline' }}>
                        {error}
                      </div>
                    )}
                  </h6>

                  <div className="rating-box mb-3">
                    <div className="rating">
                      {/* 星星評價 */}
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span
                            key={index}
                            className={`bi bi-star${
                              index <= selectedStars ? '-fill' : ''
                            }`}
                            onClick={() => handleStarClick(index)}
                          ></span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h6>回饋</h6>
                    <textarea
                      className="form-control"
                      id="textarea1"
                      rows="3"
                      oninput="checkTextareaLength()"
                      placeholder="限填入一百個字"
                      value={commitvalue}
                      onChange={handleTextChange}
                    ></textarea>
                    <div className="character-count">
                      {characterCount}/{maxCharacterCount}
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end p-3">
                    <button
                      className="btn"
                      type="button"
                      onClick={handleLinePay}
                    >
                      送出
                    </button>
                  </div>
                  {/* 顯示錯誤消息 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          /* 標題字 */
          h5 {
            color: #f36f36;
            font-weight: bold;
          }

          /* 回饋、評價的標題 */
          h6 {
            font-weight: bold;
          }

          /* 回饋的格子 */
          .feedbackdesc {
            background-color: #f7f7f7;
            padding: 10px;
            border-radius: 10px;
          }

          /* 輸入欄 */
          .feedbackdesc textarea {
            width: 100%;
            box-sizing: border-box; /* 確保 padding 不會增加元素的寬度 */
          }

          .btn {
            background-color: #f36f36;
            border: transparent;
            border-radius: 10px;
            color: #fff;
          }

          .btn:hover {
            background-color: #e25d31;
            border: transparent;
            border-radius: 10px;
            color: #fff;
          }
          .title {
            font-weight: bold;
            color: #676767;
            font-size: 18px;
          }
          .character-count {
            text-align: right;
          }

          .error {
            margin: 5px;
            font-size: 13px;
            color: red;
          }
        `}
      </style>
    </>
  )
}
