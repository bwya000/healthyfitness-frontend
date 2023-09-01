import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
import Image from 'next/image'
import Line from '@/public/images/product-use/line.png'
//自訂組件
import ProductCard from '@/components/product/productCard'
import ProductCat from '@/components/product/productCat'
import ProductCarousel from '@/components/product/productCarousel'
import MyFooter from '@/components/layout/default-layout/my-footer'
import NewArrival from '@/components/product/newArrival'
import { useDispatch } from 'react-redux'
//抓商城猜你喜歡排序用
import { setproductallLength } from '../store/cartSlice'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

const categoryTranslations = {
  1: '健身器材',
  2: '健身配件',
  3: '女性服飾',
  4: '男性服飾',
  5: '運動配件',
}

// 防抖函数
function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export default function Index() {
  const dispatch = useDispatch()
  const [dataproduct, setDataproduct] = useState([])
  const [selectCat, setSelectCat] = useState(null)
  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const productPerPage = 12 // 每頁顯示的商品數量

  const handleCategoryChange = (category_id) => {
    setCurrentPage(1)
    setSelectCat(category_id)
  }

  //排序的初始值
  const [sortOrder, setSortOrder] = useState(null)

  // 搜尋查詢初始值
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function getProduct() {
      const url = 'http://localhost:3005/api/getProduct'
      const response = await fetch(url)
      const res = await response.json()
      setDataproduct(res.productAll)
      //抓商城猜你喜歡用
      const length = res.productAll.length
      const resultArray = Array.from({ length }, (_, index) => index + 1)
      dispatch(setproductallLength(resultArray))
    }
    getProduct()
  }, [])

  //分頁
  const filteredProducts = selectCat
    ? dataproduct.filter(
        (item) =>
          item.category_id === selectCat &&
          item.p_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dataproduct.filter((item) =>
        item.p_name.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const indexOfLastProduct = currentPage * productPerPage
  const indexOfFirstProduct = indexOfLastProduct - productPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //計算幾件商品
  const filteredProductsCount = filteredProducts.length

  //價錢排序
  const handleSortAsc = () => {
    setSortOrder('asc')
  }

  const handleSortDesc = () => {
    setSortOrder('desc')
  }

  const sortedProducts = [...currentProducts]

  if (sortOrder === 'asc') {
    sortedProducts.sort((a, b) => a.p_price - b.p_price)
  } else if (sortOrder === 'desc') {
    sortedProducts.sort((a, b) => b.p_price - a.p_price)
  }

  // 定义一个延迟执行的搜索函数
  const delayedSearch = debounce((query) => {
    // 在这里执行搜索操作
    console.log('执行搜索操作：', query)
  }, 2000)

  useEffect(() => {
    // 监听搜索关键词的变化
    delayedSearch(searchQuery)
  }, [searchQuery])

  const router = useRouter()
  const { category_idnext } = router.query
  const [hasExecuted, setHasExecuted] = useState(false)
  useEffect(() => {
    if (category_idnext && !hasExecuted) {
      setTimeout(() => {
        const categoryIdAsNumber = Number(category_idnext)
        setCurrentPage(1)
        handleCategoryChange(categoryIdAsNumber)
        setHasExecuted(true)
        const sle = categoryTranslations[categoryIdAsNumber]
        const target = `.${sle}`
        var elements = document.querySelectorAll(target)

        elements[0].classList.add('selected')
        var home = document.querySelectorAll('.所有商品')
        home[0].classList.remove('selected')
      }, 500)
    }
  }, [category_idnext, hasExecuted])

  return (
    <>
      {/* <div className="VidIndexSec1"></div> */}
      <div
        className="container py-6 "
        style={{ marginTop: '80px', position: 'relative', zIndex: 1 }}
      >
        <div className="row gx-5 gy-3">
          {/* <!-- 輪播畫面 --> */}
          <ProductCarousel />
          {/* <!-- 新品推薦 --> */}
          <NewArrival />
          {/* <!-- 左側邊攔 --> */}
          <div className="col-12 col-lg-3 mt-3">
            {/* <!-- 商城分類 --> */}
            <div className="col-12 mb-4">
              <ProductCat setSelectCat={handleCategoryChange} />
            </div>
          </div>
          {/* <!-- 右邊主欄 --> */}
          <div className="col-12 col-lg-9 col-xl-9 mb-3 mt-4">
            <div className="productlist p-3 ">
              <div className="header mt-2 mb-2 ms-1">
                <div className="left-2">
                  {/* 搜尋 */}
                  <form className="d-flex mb-3" role="search">
                    <input
                      className="form-control me-2 custom-focus-style"
                      type="search"
                      placeholder="在尋找什麼商品嗎?"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <button className="btn btn-outline-secondary" type="submit">
                      <i className="bi bi-search"></i>
                    </button> */}
                    <button
                      className="btn btn-outline-secondary ms-2"
                      type="button"
                      onClick={() => setSearchQuery('')}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </form>
                </div>
                <div className="middle mt-1 ps-3">
                  {' '}
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item num">
                        共計{filteredProductsCount}件商品
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="right-2">
                  <div className="dropdownc mb-3 ps-3 ">
                    <button
                      className="btn btn-light dropdown-toggle right-1"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      排序
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" onClick={handleSortAsc}>
                          價錢排序:由小至大
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleSortDesc}>
                          價錢排序:由大至小
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- 所有商品 --> */}
              <div className="mb-10">
                {/* 商品標題 */}
                <div className="mb-3">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column', // Stack items vertically
                      height: 'auto', // Adjust height as needed
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: 'bold',
                        letterSpacing: '35px',
                        position: 'relative',
                      }}
                    >
                      {selectCat
                        ? `${categoryTranslations[selectCat]}`
                        : '所有商品'}
                    </h4>
                    <Image
                      className="imgTitle1"
                      src={Line}
                      alt="imgTitle1"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                {/* <!-- 商品列表 --> */}
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
                  {sortedProducts.map((item) => {
                    return (
                      <div key={uuidv4()}>
                        <ProductCard
                          setSelectCat={handleCategoryChange}
                          p_id={item.p_id}
                          p_name={item.p_name}
                          p_description={item.p_description}
                          p_specification={item.p_specification}
                          p_size={item.p_size}
                          category_id={item.category_id}
                          p_quantity={item.p_quantity}
                          p_price={item.p_price}
                          p_image={item.p_image}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* <!-- 頁碼 --> */}
              <div className="header pt-3 mt-2 ms-1 me-3">
                <div className="left">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item num">
                        {' '}
                        共計{filteredProductsCount}件商品
                      </li>
                    </ol>
                  </nav>
                </div>
                <div
                  className="right"
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'end',
                  }}
                >
                  <div
                    className="pagination-container"
                    style={{
                      position: 'relative',
                      zIndex: 2000,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {/* 上一頁按鈕 */}
                    <button
                      className="button prevNext"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    {/* 分頁數字按鈕 */}
                    <div className="links">
                      {Array.from(
                        {
                          length: Math.ceil(
                            filteredProducts.length / productPerPage
                          ),
                        },
                        (_, index) => (
                          <a
                            href="#"
                            className={`link ${
                              currentPage === index + 1 ? 'active' : ''
                            }`}
                            onClick={() => paginate(index + 1)}
                            key={index + 1}
                          >
                            {index + 1}
                          </a>
                        )
                      )}
                    </div>
                    {/* 下一頁按鈕 */}

                    <button
                      className="button prevNext"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredProducts.length / productPerPage)
                      }
                    >
                      <i className="bi bi-chevron-right "></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
      <style jsx>
        {`
          .link {
            font-weight: 500;
            text-decoration: none;
            text-align: center;
            margin: 10px;
            padding: 10px 18px 10px 18px;
            height: 25px;
            width: 45px;
            font-size: 20px;
            color: #666666;
            background-color: #fff;
            border-radius: 6px;
            cursor: pointer;
          }

          .link.active {
            color: #fff;
            background: #111111;
          }
          .prevNext {
            padding: 0;
            margin: 0;
          }

          .button {
            height: 45px;
            width: 45px;
            font-size: 20px;
            color: #666666;
            background-color: #f2f2f2;
            border-radius: 6px;
            cursor: pointer;
            margin: 0 15px 0 15px; /* 調整箭頭和頁碼的水平間距 */
          }

          .links {
            column-gap: 1px;
          }

          .imgTitle {
            width: 100%;
            height: 100%;
            margin-bottom: 20px;
          }

          Link {
            text-decoration: none;
            color: #494949;
          }

          .nav {
            background-color: #494949;
          }

          .card {
            border: 1px solid #b8b8b8;
            border-radius: 10px;
          }
          .card-img-top {
            border-radius: 10px 10px 0 0;
            border: 1px solid #b8b8b8;
          }
          .header {
            display: flex;
            align-items: center;
          }
          .left {
            flex: 1;
            text-align: left;
          }
          .right {
            flex: 1;
            text-align: right;
          }

          .left-2 {
            flex: 18;
            text-align: left;
          }
          .right-2 {
            flex: 2;
            text-align: right;
          }

          .btn-main {
            background-color: #f36f36;
            color: #ffffff;
          }

          /* 共同的外層容器 */
          .card {
            position: relative;
            display: inline-block;
          }

          h4 {
            font-family: 'Noto Sans TC', sans-serif;
            color: #414141;
            font-weight: bold;
          }
           {
            /* .pagination > li > button:hover,
          .pagination > li > button:focus,
          .pagination > li > button:active {
            color: #2a6496;
            background-color: #0a2b5e;
            border-color: #ddd;
          } */
          }
          .productlist {
            background: RGB(255, 255, 255, 0.8);
          }

          .btn1 {
            color: #777777;
            border: 0;
          }

          .btn:hover {
            color: #f36f36;
          }
          .num {
            letter-spacing: 2px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 14px;
          }

          .right-1 {
            color: #676767;
          }

          .custom-focus-style:focus {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
            border-color: #e1e1e1; /* 更改边框颜色 */
          }

           {
            /* 選取到某個分類，那個分類變色 */
          }
          .selected {
            color: #f36f36;
            font-weight: bold;
          }
          button:focus {
            outline: none !important;
          }
          /* 在较小的屏幕上进行样式调整 */
          @media (max-width: 767px) {
            .row-cols-2.row-cols-sm-3.g-4 {
              margin: 0 -5px; /* 减少卡片之间的水平间距 */
            }

            .col-12.col-lg-3 {
              padding: 5px; /* 减少左侧边栏的内边距 */
            }

            .col-12.col-lg-9.col-xl-9.mb-3 {
              padding: 5px; /* 减少右侧主栏的内边距 */
            }
          }

          @media (max-width: 2200px) {
            .row-cols-xl-4 {
              column-count: 3;
            }
          }
          .VidIndexSec1 {
            background-image: url('url('../public/images/background1png')'); /* 更新背景图片的URL */
            background-size: cover;
            background-position: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1; /* 将背景置于页面下方 */
          }
        `}
      </style>
    </>
  )
}
