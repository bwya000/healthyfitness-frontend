import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import CopyToClipboard from 'react-copy-to-clipboard'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import ProductFeedback from '@/components/product/productFeedback'
//API用
import axios from 'axios'
//redux用
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../store/cartSlice'
import {
  addFavoriteProduct,
  cleanFavoriteProduct,
} from '@/pages/store/favoriteproductSlice'
import Swal from 'sweetalert2'

//react的alert
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
//自訂組件
import MyFooter from '@/components/layout/default-layout/my-footer'
import { setTodaybrowse } from '../store/cartSlice'

export default function Detail() {
  const [detailproduct, setDetailproduct] = useState([])
  // 規格初始值
  //     變數               去修改變數               初始值
  const [detailproductselect, setDetailproductselect] = useState([])
  // 尺寸初始值
  //     變數               去修改變數               初始值
  const [detailproductsize, setDetailproductsize] = useState([])
  //     變數               去修改變數               初始值
  const [detailproductimage, setDetailproductimage] = useState([])

  // 回饋初始值
  const [feedbackproduct, setFeedbackproduct] = useState([])

  //收藏愛心轉換
  const [isHeartSolid, setIsHeartSolid] = useState(false)

  //照片切換 追蹤大圖
  const [currentImage, setCurrentImage] = useState(detailproduct.p_image)

  const router = useRouter()

  const { pid } = router.query // 使用 "pid" 取得商品ID
  //抓取slice中的東西
  const favProducts = useSelector((state) => state.favoriteProduct.favProducts)
  //redux抓取目前使用者用 -> 抓取使用者id
  const member_id = useSelector((state) => state.user.user.member_id)
  //購物車寫進redux用
  const dispatch = useDispatch()
  const [productId, setproductId] = useState(pid) //也就是p_id,因為商品細節p_id都一樣,可以直接寫入
  const [productColor, setproductColor] = useState('') //也就是p_specification
  const [productSize, setproductSize] = useState('') //就是p_size
  const [productSku, setproductSku] = useState('') //就是p_quantitly
  const [productNum, setproductNum] = useState(1) //買幾個

  //如果使用者存在才能做事
  const handleLinePay = () => {
    Swal.fire({
      title: '您必須登入才能將商品加入購物車',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '馬上登入',
      cancelButtonText: '取消',
      confirmButtonColor: '#EA6F2A',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('http://localhost:3000/login')
      }
    })
  }
  //加入購物車
  const addToCart = async (key) => {
    const getskuID = {
      p_id: productId,
      p_specification: productColor === '單色' ? '' : productColor,
      p_size: productSize === '零碼' ? '' : productSize,
    }
    //先跑後端,找回skuID
    const response = await axios.post(
      'http://localhost:3005/api/cart/findskuID',
      getskuID
    )
    // console.log(response.data.message);
    const prodetail = response.data.message
    //寫入redux
    if (prodetail) {
      //如果這商品存在
      const newbuyItem = {
        productId: prodetail.skuID,
        productTitle: prodetail.p_name,
        productImg: prodetail.p_image,
        productColor:
          prodetail.p_specification === '' ? '單色' : prodetail.p_specification,
        productSize: prodetail.p_size === '' ? '零碼' : prodetail.p_size,
        productPrice: prodetail.p_price,
        productNum: productNum,
      }

      // 使用 setCart action，將商品資料派送到 Redux store 中
      dispatch(setCart(newbuyItem))
    }
    if (key === 'push') {
      router.push('http://localhost:3000/cart')
    }
  }
  useEffect(
    () => {
      async function getProductdeatil() {
        if (pid) {
          //再把ID傳遞給後端的API
          const urlapi = `http://localhost:3005/api/getproductDetail?productID=${pid}`
          const response = await fetch(urlapi)
          const res = await response.json()
          const productDetail = res.success[0] //商品細節的第一筆 = 你的主商品
          const allProductDetail = res.success //所有商品細節

          setDetailproduct(productDetail)

          // 刪除allProductDetail中重複的p_specification(規格)
          const uniqueSpecsSet = new Set(
            allProductDetail.map((item) => item.p_specification)
          )
          // 現在uniqueProductDetail是沒有重複p_specification的陣列
          const uniqueProductDetail = Array.from(uniqueSpecsSet, (spec) =>
            allProductDetail.find((item) => item.p_specification === spec)
          )

          setDetailproductselect(uniqueProductDetail)

          // 刪除allProductDetail中重複的p_size(尺寸)
          const uniqueSizes = new Set(
            allProductDetail.map((item) => item.p_size)
          )
          // 現在uniqueSizes是沒有重複p_size的陣列
          const sizeProductDetail = Array.from(uniqueSizes, (spec) =>
            allProductDetail.find((item) => item.p_size === spec)
          )

          setDetailproductsize(sizeProductDetail)

          const uniqueImage = new Set(
            allProductDetail.map((item) => item.p_image)
          )
          // 現在uniqueSizes是沒有重複p_size的陣列
          const imageProductDetail = Array.from(uniqueImage, (spec) =>
            allProductDetail.find((item) => item.p_image === spec)
          )

          setDetailproductimage(imageProductDetail)
        }
      }
      getProductdeatil()
    },
    [pid],
    router.isReady
  )

  useEffect(() => {
    // 检查 productDetail 是否已加载且不为空
    if (detailproduct.p_id) {
      setIsHeartSolid(
        favProducts.some((item) => item.productId === detailproduct.p_id)
      )
    }
  }, [favProducts, detailproduct.p_id])

  const addFavClick = async () => {
    if (member_id) {
      if (isHeartSolid) {
        dispatch(cleanFavoriteProduct(detailproduct.p_id))
        try {
          const response = await axios.delete(
            `http://localhost:3005/api/cleanFavoriteProduct/?p_id=${detailproduct.p_id}&memberid=${member_id}
          `
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
          p_id: detailproduct.p_id,
          p_name: detailproduct.p_name,
          p_price: detailproduct.p_price,
          p_image: detailproduct.p_image,
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
      setIsHeartSolid(!isHeartSolid)
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

  useEffect(() => {
    async function getProductFeedback() {
      if (pid) {
        const urlapi = `http://localhost:3005/api/getproductFeedback?productID=${pid}`
        const response = await fetch(urlapi)
        const res = await response.json()

        if (res.success) {
          const allProductFeedback = res.success

          setFeedbackproduct(allProductFeedback)
        } else {
          console.log('No Data')
          setFeedbackproduct([]) // 設定一個空陣列或其他初始值
        }
      }
    }

    getProductFeedback()
  }, [pid])

  // 設置初始狀態為第一張小圖
  useEffect(() => {
    if (detailproductimage.length > 0) {
      setCurrentImage(detailproductimage[0].p_image)
    }
  }, [detailproductimage])

  // 點擊事件處理函數，用於更新當前顯示的大圖
  const handleImageClick = (item) => {
    setCurrentImage(item.p_image)
  }

  // 照片上面ㄉ商品路徑
  const categoryMapping = {
    1: '健身器材',
    2: '健身配件',
    3: '女性服飾',
    4: '男性服飾',
    5: '運動配件',
  }

  const productLink = `http://localhost:3000/product/${pid}`

  //您可能也喜歡,權重計算
  const [startTime, setStartTime] = useState(Date.now())
  useEffect(() => {
    setStartTime(Date.now()) // 紀錄用戶造訪的時間
    return () => {
      const endTime = Date.now()
      const timeOnPage = endTime - startTime
      const productView = {
        name: pid,
        time: timeOnPage,
      }
      dispatch(setTodaybrowse(productView))
    }
  }, [])

  return (
    <>
      {/* {Object.keys(detailproduct).length > 0 ? ( */}
      <div className="container" style={{ marginTop: 130 }}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto text-start ">
            <div className="title">
              <h6>
                <button
                  className="btntop"
                  onClick={() => {
                    router.push(`/product`)
                  }}
                >
                  商城
                </button>
                /
                <button
                  className="btntop"
                  onClick={() => {
                    router.push(
                      `http://localhost:3000/product?category_idnext=${detailproduct.category_id}`
                    )
                  }}
                >
                  {categoryMapping[detailproduct.category_id]}
                </button>
                / {detailproduct.p_name}
              </h6>
            </div>
          </div>
          {/* <!-- 左欄 --> */}
          <div className="col-lg-6 col-md-12 col-sm-12 mx-md-0 mx-auto text-md-right">
            <div className="justify-content-md-center justify-content-center mt-3">
              <div>
                <Image
                  src={`http://localhost:3000/images/product_img/${currentImage}`}
                  alt="ProductImage"
                  height={350}
                  width={350}
                />
              </div>
              {/* 商品圖(不同顏色) */}
              <div className=" ">
                {detailproductimage.map((item) => {
                  return (
                    <Image
                      value={item.p_image}
                      key={uuidv4()}
                      src={`http://localhost:3000/images/product_img/${item.p_image}`}
                      alt="ProductImage"
                      width={80}
                      height={80}
                      style={{ width: '80px', height: '80px' }} // 设置默认高度和宽度
                      onLoad={(e) => {
                        e.target.style.width = '80px' // 图像加载完成后，将默认值重置为自动
                        e.target.style.height = '80px'
                      }}
                      onClick={() => handleImageClick(item)} // 添加点击事件处理函数
                    />
                  )
                })}
              </div>
            </div>
          </div>
          {/* <!-- 右欄 --> */}
          <div className="col-lg-6 col-md-12 col-sm-12 mx-auto text-md-left text-start">
            <div>
              <div className="header">
                <h5 className="heading heading-h4 mb-1 mt-3">
                  {/* 商品名稱 */}
                  {detailproduct.p_name}
                </h5>
              </div>
              <div className="price">
                {/* 商品價格 */}
                <p className="theme-color">NT${detailproduct.p_price}</p>
              </div>
              {/* 規格選擇 */}
              <div className="quenty-container">
                {/* 顏色選擇 做好ㄌQQQQQQ */}
                <div className="quenty-button mt-3">
                  <h6 className="heading heading-h6">顏色</h6>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={productColor}
                    //onChange事件,購物車用,抓出顏色
                    onChange={(e) => {
                      setproductColor(e.target.value)
                    }}
                  >
                    <option value="請選擇" defaultValue>
                      請選擇
                    </option>
                    {detailproductselect.map((item) => {
                      // 判断 item.p_specification 是否为空
                      const specificationValue = item.p_specification || '單色'

                      return (
                        <option value={specificationValue} key={uuidv4()}>
                          {specificationValue}
                        </option>
                      )
                    })}
                  </select>
                </div>
                {/* 尺寸選擇 */}
                <div className="quenty-button mt-3">
                  <h6 className="heading heading-h6">尺寸</h6>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={productSize}
                    //onChange事件,購物車用,抓出尺寸
                    onChange={(e) => {
                      setproductSize(e.target.value)
                    }}
                  >
                    <option value="請選擇" defaultValue>
                      請選擇
                    </option>
                    {detailproductsize.map((item) => {
                      const sizeValue = item.p_size || '零碼'

                      return (
                        <>
                          <option value={sizeValue} key={uuidv4()}>
                            {sizeValue}
                          </option>
                        </>
                      )
                    })}
                  </select>
                </div>
                {/* 數量選擇 */}
                <div className="quenty-button mt-3">
                  <h6 className="heading heading-h6">數量</h6>
                  <div className="form-outline">
                    <input
                      type="number"
                      id="typeNumber"
                      className="form-control"
                      min="0"
                      max={10}
                      //onChange事件,購物車用,抓出數量,並轉換為num
                      value={productNum}
                      onChange={(e) => {
                        const numValue = parseInt(e.target.value, 10)
                        setproductNum(numValue)
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* 購買按鈕 */}
              <div className="mt-3 button-container">
                <button
                  className="cart buttonAdd"
                  onClick={() => {
                    if (productColor === '請選擇' || productColor === '') {
                      Swal.fire({
                        icon: 'error',
                        title: '請選擇顏色',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    }
                    if (productSize === '請選擇' || productSize === '') {
                      Swal.fire({
                        icon: 'error',
                        title: '請選擇尺寸',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    }
                    if (productNum === '') {
                      Swal.fire({
                        icon: 'error',
                        title: '請選擇數量',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    } else if (productNum === 0) {
                      Swal.fire({
                        icon: 'error',
                        title: '數量不可為0',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    }
                    if (member_id) {
                      //使用者有登入了,前往結帳
                      addToCart()
                    } else {
                      //使用者沒登入,轉向告知使用者前往登入
                      handleLinePay()
                    }
                  }}
                >
                  新增到購物車中
                </button>
                <button className="buttonCollect" onClick={addFavClick}>
                  <i
                    className={`bi ${
                      isHeartSolid ? 'bi-suit-heart-fill' : 'bi-suit-heart'
                    } link`}
                  ></i>
                </button>
                <CopyToClipboard
                  text={productLink}
                  onCopy={() =>
                    Swal.fire({
                      title: '已複製連結',
                      confirmButtonColor: '#EA6F2A',
                    })
                  }
                >
                  <button className="buttonCollect1">
                    {' '}
                    <i className="bi bi-link-45deg link"></i>
                  </button>
                </CopyToClipboard>
                <br />
              </div>
              <div>
                <button
                  className="mt-2 buttonAddCart"
                  onClick={() => {
                    if (productColor === '請選擇' || productColor === '') {
                      Swal.fire({
                        icon: 'error',
                        title: '請選擇顏色',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    }
                    if (productSize === '請選擇' || productSize === '') {
                      Swal.fire({
                        icon: 'error',
                        title: '請選擇尺寸',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    }
                    if (productNum === '') {
                      Swal.fire({
                        icon: 'error',
                        title: '請選擇數量',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    } else if (productNum === 0) {
                      Swal.fire({
                        icon: 'error',
                        title: '數量不可為0',
                        confirmButtonColor: '#EA6F2A',
                      })
                      return
                    }
                    if (member_id) {
                      //使用者有登入了,前往結帳
                      addToCart('push')
                    } else {
                      //使用者沒登入,轉向告知使用者前往登入
                      handleLinePay()
                    }
                  }}
                >
                  立即購買
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <!-- 下面一欄 --> */}
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto text-start">
            <div className="box2">
              <div className="col-12">
                {/* 描述 */}
                <div className="feedbackdesc mt-4 mb-4">
                  <h5 className="">商品描述</h5>
                  <p className="desc">{detailproduct.p_description}</p>
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
                <ProductFeedback feedback={feedbackproduct} />
                {/* <div className="feedbackdesc mt-4 mb-4">
                  <h5>商品回饋</h5>
                  {feedbackproduct.length === 0 ? (
                    <p>沒有商品回饋</p>
                  ) : (
                    feedbackproduct.map((feedback) => (
                      <div key={uuidv4()}>
                        <p>
                          {feedback.member_name}{' '}
                          {Array.from({ length: feedback.score }).map(
                            (_, starIndex) => (
                              <i
                                key={starIndex}
                                className="bi bi-star-fill"
                              ></i>
                            )
                          )}
                          <span
                            style={{ fontSize: 'x-small', color: '#4e4e4e' }}
                          >
                            {feedback.date}
                          </span>
                        </p>
                        <p>{feedback.feedback_text}</p>
                        <hr />
                      </div>
                    ))
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
      {/* ) : (
        <div>Loading...</div>
      )} */}

      <style jsx>
        {`
          .button-container {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
          }
          h5 {
            color: #f36f36;
            font-weight: bold;
          }

          h6 {
            font-weight: bold;
          }

          .title {
            margin-bottom: 10px;
          }

          .productimg {
            height: 300px;
            width: 300px;
            display: block;
            margin-left: 300px;
          }

          .buttonAdd {
            height: 40px;
            width: 150px;
            background-color: #f36f36;
            color: #ffffff;
            border: 1px solid #f36f36;
            border-radius: 10px;
          }

          .buttonCollect {
            height: 40px;
            width: 40px;
            border: 2px solid #f36f36;
            border-radius: 10px;
            background: #ffffff;
          }

          .buttonCollect1 {
            height: 40px;
            width: 40px;
            border: 2px solid #f36f36;
            border-radius: 10px;
            background: #ffffff;
          }

          .link {
            color: #f36f36;
          }

          .buttonAddCart {
            height: 40px;
            width: 240px;
            background-color: #000000;
            color: #ffffff;
            border: 2px solid #000000;
            border-radius: 10px;
          }

          .description {
            /* text-align: center; */
            margin-left: 300px;
            margin-right: 300px;
            color: #676767;
          }
          .feedback {
            /* text-align: center; */
            margin-left: 300px;
            margin-right: 300px;
            color: #000000;
          }
          a {
            text-decoration: none;
            color: #000000;
          }

          .form-select {
            width: 100px;
          }

          .form-outline {
            width: 100px;
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
          .d-flex.flex-column.align-items-center {
            overflow: hidden;
          }
           {
            /* 商品最上面的分類 */
          }

          .btntop {
            border: none;
            background-color: #fff;
            color: #f36f36;
            font-weight: bold;
          }

          .btntop:hover {
            color: #e25d31;
          }
        `}
      </style>
    </>
  )
}
