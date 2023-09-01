import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import VideoHistoryList from '@/components/video/video-histroy-list'
import 'bootstrap/dist/css/bootstrap.min.css'
import { reverseHistory } from '@/pages/store/historySlice' // 替換成你的 historySlice 路径
import useAuthGuard from '../authGuard' // 使用路由守衛
import MyFooter from '@/components/layout/default-layout/my-footer'
import VidMenuNav from '@/components/video/vid-menu-nav'



export default function VideoHistory() {
  const auth = useAuthGuard() // 路由守衛直接挂在第一行
  const dataHistory = useSelector((state) => state.history.historyList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reverseHistory()) // 在组件加載時觸發 historyList 反轉操作
  }, [])

  return (
    <>
      <div className='VidIndexSec1'>
      </div>
      <div className="other-elements" style={{ position: 'relative', zIndex: '2000'}}>
        <div className="box7">
          <div className='box-nav'>
            <VidMenuNav />
          </div>
          <div className="history-list">
            {auth ? (
              dataHistory.map((item) => {
                return (
                  <div key={item.historyID} className="col-12">
                    <VideoHistoryList
                      VideoID={item.VideoID}
                      Title={item.Title}
                      Description={item.Description}
                      watchdate={item.watchdate.slice(0, 10)}
                      vidthumbnail={item.vidthumbnail}
                      memberid={item.memberid}
                      auth={auth}
                    />
                  </div>
                )
              })
            ) : (
              <div className="auth-prompt-container col-12">
                <p className="auth-prompt">欲觀看歷史紀錄請先登入會員</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .box7 {
          margin-top:-180px;
          height:100%;
        }
        .box-nav {
          margin-bottom:50px;
        }
          .other-elements {
            max-width: 1920px;
          }

          .auth-prompt {
            font-size: 25px;
            font-weight: bold;
            color: #ea6f2a;
          }

          .auth-prompt-container {
            padding-left: 100px;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}