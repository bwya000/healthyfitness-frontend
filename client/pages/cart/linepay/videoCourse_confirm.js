import React, { useEffect } from 'react'
import styles from '@/styles/cartorderSucess.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
//redux用
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '@/pages/store/cartSlice'

export default function VideoSub_confirm() {
  const username = useSelector((state) => state.user.user.name)
  useEffect(() => {
    // 删除 localStorage 中的暫存
    localStorage.setItem('credicard', 'false')
  }, [])
  const router = useRouter()
  const dispatch = useDispatch()
  const buyvideoCourse = useSelector((state) => state.cart.buyvideoCourse) //課程的redux

  //點選按鈕清除購物車redux
  const handleButtonClick = () => {
    dispatch(reset())
    router.push('/')
  }

  //監聽離開頁面事件
  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  return (
    <>
      <div
        className={`${styles.productbox} container `}
        style={{ marginTop: '190px' }}
      >
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
            <div>授權明細</div>
            <div style={{ marginRight: '10px' }}></div>
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
              <div className={`${styles.tableMain} col-3`}>購買課程</div>
              <div className={`${styles.tableMain} col-3`}>名稱課程</div>
              <div className={`${styles.tableMain} col-3`}>權限起始日</div>
              <div className={`${styles.tableMain} col-3`}>權限終止日</div>
            </div>
            {/* 課程列表 */}
            {buyvideoCourse ? (
              buyvideoCourse.order.map((item) => (
                <div
                  className="row text-center border-top border-dark-subtle"
                  style={{ height: '100px' }}
                  key={uuidv4()}
                >
                  <div className={`${styles.productItem} col-3`}>
                    <img
                      src={`http://localhost:3000/images/video_image/${item.vidthumbnail}`}
                      style={{ width: '140px' }}
                      alt="Video Thumbnail"
                    />
                  </div>
                  <div className={`${styles.productItem} col-3`}>
                    {item.Title}
                  </div>
                  <div className={`${styles.productItem} col-3`}>
                    {item.stateDate}
                  </div>
                  <div className={`${styles.productItem} col-3`}>永久授權</div>
                </div>
              ))
            ) : (
              <div>Loading</div>
            )}
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
                <div style={{ color: '#FFFFFF' }}>訂單已成立</div>
                <i
                  class="bi bi-check-circle fs-3"
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
                  }}
                >
                  <div className={`${styles.orderdetailLeft} col-4`}>
                    <div>訂單編號</div>
                    <div>會員</div>
                    <div>付款方式</div>
                    <div>付款金額</div>
                    <div>訂單日期</div>
                  </div>
                  <div className={`${styles.orderdetailRight} col-6`}>
                    <div>{buyvideoCourse.shortId}</div>
                    <div>{username}</div>
                    <div>信用卡付款</div>
                    <div>NT ${buyvideoCourse.price}</div>
                    <div>{buyvideoCourse.stateDate}</div>
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
                    onClick={handleButtonClick}
                  >
                    返回首頁
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
