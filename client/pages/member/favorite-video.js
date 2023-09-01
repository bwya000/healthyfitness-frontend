import React from 'react'
import SideBar from '@/components/member/sidebar'
import FavoriteVideoOne from '@/components/favorite-list/favorite-video-one'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import useAuthGuard from '../authGuard' //使用路由守衛
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// 使用 uuidv4 方法生成 UUID
const favv_id = uuidv4()

export default function FavoriteVideo() {
  const auth = useAuthGuard() //路由守衛直接掛在第一行

  const dataFavoriteVideo = useSelector(
    (state) => state.favoriteVideo.favoriteVideos
  )

  //console.log('favoriteVideos:', dataFavoriteVideo);
  if (auth === null) {
    return <p>Loading...</p>
  }

  if (!auth) {
    let timerInterval
    Swal.fire({
      title: '請登入以後再查看收藏影片',
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

  return (
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
                      className="fa-solid fa-clapperboard"
                      style={{ marginRight: '15px' }}
                    />
                    影片
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
                    {dataFavoriteVideo.map((item) => (
                      <div key={uuidv4()}>
                        <FavoriteVideoOne
                          VideoID={item.VideoID}
                          Title={item.Title}
                          vidthumbnail={item.vidthumbnail}
                          memberid={item.member_id}
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
             {
              /* border: 1px solid #ccc; */
            }
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
        `}
      </style>
    </>
  )
}