import React, { useState } from 'react'

export default function ProductCat({ setSelectCat }) {
  const [selectedCat, setSelectedCat] = useState(null)

  const handleCatClick = (category_id) => {
    setSelectCat(category_id)
    setSelectedCat(category_id)
  }

  const handleAllProductsClick = () => {
    setSelectCat(null) // 取消選中的分類
    setSelectedCat(null) // 取消選中的狀態樣式
  }

  return (
    <>
      <div className="productselectlist p-4 mt-2">
        <h4 className="border-bottom pb-2 border-secondary border-3 fs-4 text-secondary mb-3">
          商城
        </h4>
        <div
          className={`btn 所有商品 ${
            selectedCat === null ? 'selected' : ''
          } btn1 num`}
          onClick={handleAllProductsClick}
        >
          所有商品
        </div>
        <br />

        <h4 className="border-bottom pb-2 border-secondary border-3 fs-4 text-secondary mb-3 mt-3">
          商品分類
        </h4>

        <div
          className={`btn 健身器材 ${
            selectedCat === 1 ? 'selected' : ''
          } btn1 num`}
          onClick={() => handleCatClick(1)}
        >
          健身器材
        </div>
        <br />
        <div
          className={`btn  健身配件 ${
            selectedCat === 2 ? 'selected' : ''
          } btn1 num`}
          onClick={() => handleCatClick(2)}
        >
          健身配件
        </div>
        <br />
        <div
          className={`btn 女性服飾 ${
            selectedCat === 3 ? 'selected' : ''
          } btn1 num`}
          onClick={() => handleCatClick(3)}
        >
          女性服飾
        </div>
        <br />
        <div
          className={`btn 男性服飾 ${
            selectedCat === 4 ? 'selected' : ''
          } btn1 num`}
          onClick={() => handleCatClick(4)}
        >
          男性服飾
        </div>
        <br />
        <div
          className={`btn 運動配件 ${
            selectedCat === 5 ? 'selected' : ''
          } btn1 num`}
          onClick={() => handleCatClick(5)}
        >
          運動配件
        </div>
        <br />
      </div>

      <style jsx>
        {`
          h4 {
            padding-left: 8px;
            font-weight: bold;
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 2px;
          }

          .num {
            font-size: 16px;
            letter-spacing: 4px;
            font-family: 'Noto Sans TC', sans-serif;
          }

          .btn1 {
            color: #777777;
            border: 0;
          }

          .btn1:hover {
            color: #f36f36;
          }

          .selected {
            color: #f36f36;
            font-weight: bold;
          }
          button:focus {
            outline: none !important;
          }
          .productselectlist {
            background: RGB(255, 255, 255, 0.8);
          }

          .custom-focus-style:focus {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
            border-color: #e1e1e1; /* 更改边框颜色 */
          }
        `}
      </style>
    </>
  )
}
