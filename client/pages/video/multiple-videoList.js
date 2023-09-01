import React, { useEffect, useState } from 'react'
import VideoClass from '@/components/video/video-class'
import VideoGallery from '@/components/video/video-gallery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/css/bundle'
import MyFooter from '@/components/layout/default-layout/my-footer'
import VidMenuNav from '@/components/video/vid-menu-nav'


export default function MultipleVideoList() {
  const [dataVedio, setdataVedio] = useState([])

  useEffect(() => {
    async function getVedio() {
      const url = 'http://localhost:3005/api/getVedio'
      const response = await fetch(url)
      const res = await response.json()
      setdataVedio(res.video)
    }
    getVedio()
  }, [])

  return (
    <>
      <div className='bg-img'>
      </div>
      <div className="all">
        <div className="other-elements" style={{ position: 'relative', zIndex: 2000 }}>
          <div className="video-palyer">
            <VideoGallery />
          </div>
          <div className='box1'>
            <VidMenuNav />
          </div>
          <div className="card-container">
            <VideoClass />
          </div>
          <div>
            <MyFooter />
          </div>
        </div>
      </div>


      <style jsx>{`
        .all {
          height: 2700px;
          display: flex;
          flex-direction: column;
        }
        .box1{
          margin-top:-240px;
        }
        .card-container {
          padding-left: 50px;
          margin-top: 100px;
        }

        .video-palyer {
          margin-top: 90px;
          padding-left: 20px;
          width: 100%;
        }
      `}</style>
    </>
  )
}