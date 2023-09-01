import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/cartorderSucess.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Cartpaymentmeow() {
  return (
    <>
      {/* 橘點 */}
      <div className="row" style={{ marginTop: '110px' }}>
        <div className="col d-flex align-items-center justify-content-end">
          <div
            className={`${styles.dot1} d-flex align-items-center justify-content-center`}
          >
            <p style={{ fontSize: '15px', color: 'white' }} className="mt-3">
              1
            </p>
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <div
            className={`${styles.dot2} d-flex align-items-center justify-content-center`}
          >
            <p style={{ fontSize: '15px', color: 'white' }} className="mt-3">
              2
            </p>
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-start">
          <div
            className={`${styles.dot3} d-flex align-items-center justify-content-center`}
          >
            <p style={{ fontSize: '15px', color: 'white' }} className="mt-3">
              3
            </p>
          </div>
        </div>
      </div>
      {/* 三個點描述 */}
      <div className="row">
        <div style={{ display: 'flex', marginTop: '8px' }}>
          <div style={{ marginLeft: '373px' }}>購物車</div>
          <div style={{ marginLeft: '195px' }}>填寫資料</div>
          <div style={{ marginLeft: '190px' }}>訂單取消</div>
        </div>
      </div>
      {/* 訂購商品已不能修改,下拉陳列 */}
      <div className={`${styles.productbox} container mt-2`}>
        <div
          className="row text-center "
          data-bs-toggle="collapse"
          href="#collapseOrderdetail"
          role="button"
          aria-expanded="false"
          aria-controls="collapseOrderdetail"
          style={{
            height: '60px',
            background: '#EEEEEE',
            borderRadius: '25px 25px 25px 25px',
          }}
        >
          <div className={`${styles.tableMaintitle} col-12`}>
            <div>購物車</div>
            <div style={{ marginRight: '10px' }}>(合計2件)</div>
            <i class="bi bi-arrow-down-square"></i>
          </div>
        </div>
        <div className={`collapse ${styles} row`} id="collapseOrderdetail">
          <div
            className="card card-body col-12"
            style={{
              border: '0px solid red',
              borderRadius: '0px 0px 25px 25px',
              paddingTop: '0px',
            }}
          >
            <div
              className="row text-center border-top border-dark-subtle"
              style={{ height: '60px' }}
            >
              <div className={`${styles.tableMain} col-2`}>商品</div>
              <div className={`${styles.tableMain} col-2`}>品名</div>
              <div className={`${styles.tableMain} col-2`}>顏色</div>
              <div className={`${styles.tableMain} col-2`}>尺寸</div>
              <div className={`${styles.tableMain} col-2`}>金額</div>
              <div className={`${styles.tableMain} col-2`}>數量</div>
            </div>
            <div
              className="row text-center border-top border-dark-subtle"
              style={{ height: '100px' }}
            >
              <div className={`${styles.tableMain} col-2`}>
                <img
                  src="https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/3661756/0/637977364970570000?v=1"
                  className={`${styles.productImg}`}
                ></img>
              </div>
              <div className={`${styles.productItem} col-2`}>5KG PVC啞鈴組</div>
              <div className={`${styles.productItem} col-2`}>
                <div>單色系</div>
              </div>
              <div className={`${styles.productItem} col-2`}>
                <div>5KG</div>
              </div>
              <div className={`${styles.productItem} col-2`}>NT$849</div>
              <div className={`${styles.productItem} col-2`}>
                <div style={{ fontSize: '20px' }}>1</div>
              </div>
            </div>
            <div
              className="row text-center border-top border-dark-subtle"
              style={{ height: '100px' }}
            >
              <div className={`${styles.tableMain} col-2`}>
                <img
                  src="https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/3661756/0/637977364970570000?v=1"
                  className={`${styles.productImg}`}
                ></img>
              </div>
              <div className={`${styles.productItem} col-2`}>5KG PVC啞鈴組</div>
              <div className={`${styles.productItem} col-2`}>
                <div>單色系</div>
              </div>
              <div className={`${styles.productItem} col-2`}>
                <div>5KG</div>
              </div>
              <div className={`${styles.productItem} col-2`}>NT$849</div>
              <div className={`${styles.productItem} col-2`}>
                <div style={{ fontSize: '20px' }}>1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container mt-3`}>
        <div className={`row`}>
          {/* 下欄，訂單成立表 */}
          <div className={`${styles.sendBox} col-12`}>
            <div
              className={`${styles.productbox} row `}
              style={{
                height: '60px',
                background: '#414141',
                borderRadius: '25px 25px 0px 0px',
              }}
            >
              <div
                className={`${styles.tablePassing} `}
                style={{ fontSize: '24px' }}
              >
                <div style={{ color: '#FFFFFF' }}>訂單已取消</div>
                <i
                  class="bi bi-x-circle fs-3"
                  style={{ color: '#e25d31', marginLeft: '10px' }}
                ></i>
              </div>
            </div>

            <div className={`${styles.passing} row  `}>
              <div className={`col-6`} style={{ height: '100%' }}>
                <div
                  className="row"
                  style={{
                    height: '100%',
                    // paddingLeft: '5%',
                    // paddingRight: '5%',
                  }}
                >
                  <div className={`${styles.orderdetailLeft} col-4`}>
                    <div>收件人</div>
                    <div>電話</div>
                    <div>退款方式</div>
                    <div>退貨地址</div>
                    <div>退款金額</div>
                    <div>退款日期</div>
                  </div>
                  <div className={`${styles.orderdetailRight} col-6`}>
                    <div>壹貳參</div>
                    <div>0912654378</div>
                    <div>信用卡刷退(已退款)</div>
                    <div>7-11大洋門市 (已退貨)</div>
                    <div>NT $1148</div>
                    <div>2023-06-20 08:35:17</div>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
              <div
                style={{ height: '100%' }}
                className={`${styles.cancelButton} col-6`}
              >
                <div style={{ width: '30%' }}>
                  <button
                    type="button"
                    className={`btn btn-light ${styles.orderButton}`}
                  >
                    申請退款
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
