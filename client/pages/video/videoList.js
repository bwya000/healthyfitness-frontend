import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCard from '@/components/video/video-card';
import VidMenu from '@/components/video/vid-menu';
import VideoGallery from '@/components/video/video-gallery';
import useAuthGuard from '../authGuard'; // 使用路由守衛
import MyFooter from '@/components/layout/default-layout/my-footer';
import VidMenuNav from '@/components/video/vid-menu-nav';
import VideoThreeD from '@/components/video/video-3D';
import NavbarRWD from '@/components/layout/default-layout/my-navbar/index-RWD';

export default function VideoList() {
  const auth = useAuthGuard() //路由守衛直接掛在第一行
  const [dataVedio, setdataVedio] = useState([])
  const [selectedMuscle, setSelectedMuscle] = useState(null)
  const [currentPage, setCurrentPage] = useState(1) // 當前頁碼
  const videosPerPage = 9 // 每頁顯示的影片數量

  useEffect(() => {
    async function getVedio() {
      const url = 'http://localhost:3005/api/getVedio'
      const response = await fetch(url)
      const res = await response.json()
      setdataVedio(res.video)
    }
    getVedio()
  }, [])


  const filteredVideos = selectedMuscle
    ? dataVedio.filter((video) => video.musclegroupID === selectedMuscle)
    : dataVedio

  // 分頁計算
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  )

  // 改變當前頁碼
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>      
            <div className='NavbarRWD'><NavbarRWD /></div>
            <div>
              <VideoThreeD />
            </div>
            <div className='bg-img'>
            </div>
      <div className="all">
        <div className="other-elements" style={{ zIndex: 2000 }}>
                <div className="box6">
                  <VideoGallery />
                </div>
                <div className="box1">
                  <VidMenu setSelectedMuscle={setSelectedMuscle} />
                </div>
          <div className="list-box">
            <div className='menuNav'>
              <VidMenuNav />
            </div>
            <div className="row row-cols-xl-3" style={{ marginRight: '120px' }}>
                    {currentVideos.map((video) => (
                      <div className="map mb-5" key={video.VideoID}>
                        <VideoCard
                          VideoID={video.VideoID}
                          Title={video.Title}
                          Description={video.Description}
                          vidthumbnail={video.vidthumbnail}
                          muscleName={video.muscleName}
                          auth={auth}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="footer" style={{ position: 'relative', zIndex: 2000 }}>
              <MyFooter />
            </div>

            {/* 分頁 */}
            <div className="pagination-container" style={{ position: 'relative', zIndex: 2000 }}>
              <button
                className="button prevNext"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <div className="links">
                {Array.from(
                  { length: Math.ceil(filteredVideos.length / videosPerPage) },
                  (_, index) => (
                    <a
                      href="#"
                      className={`link ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => paginate(index + 1)}
                      key={index + 1}
                    >
                      {index + 1}
                    </a>
                  )
                )}
              </div>
              <button
                className="button prevNext"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredVideos.length / videosPerPage)
                }
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
      </div>
    
      <style jsx>{`
        .all {
          height: 2650px;
          display: flex;
          flex-direction: column;
        }
        .footer {
          margin-top: auto;
        }
        .box1 {
          position:relative;
          top:145px;
          margin-top:50px;
          padding-left:260px;
          width: 450px;
        }
        .box6 {
          margin-top: 90px;
          padding-left: 20px;
          width: 100%;
        }

        .row {
          margin-top:60px;
          padding-left: 475px;
        }

        .pagination-container {
            display: flex;
            align-items: center;
            padding-left: 850px;
            margin-top: -500px;
        }

        .button {
          height: 45px;
          width: 45px;
          font-size: 20px;
          color: #666666;
          background-color: #f2f2f2;
          border-radius: 6px;
          cursor: pointer;
          margin-right:  0 15px 0 15px; /* 調整箭頭和頁碼的水平間距 */
        }

        .links {
          column-gap: 12px;
        }

        .link {
          font-weight: 500;
          text-decoration: none;
          text-align: center;
          margin: 10px;
          padding: 10px 18px 10px 18px;
          height: 45px;
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

        .list-box {
          margin-top: -830px;
        }

        .NavbarRWD{
          display:none;
        }


        @media screen and (max-width: 768px) {

          .menuNav{
            display:none;
          }

          .list-box {
            margin-top:20px;
          }

          .row {
            display: flex;
            flex-direction: column;
            margin:0;
            padding:0;
          }

          .map {
            margin-top:30px;
          }

          .box6{
            display:none;
          }

          .pagination-container {
            display:none;
          }
          .footer{
            display:none;
          }
          
          .NavbarRWD{
          display:block;
        }

        }
      `}</style>
    </>
  )
}