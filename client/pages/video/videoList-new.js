import React, { useEffect, useState } from 'react'
import VideoRelease from '@/components/video/video-release'
import VideoGallery from '@/components/video/video-gallery'
import 'bootstrap/dist/css/bootstrap.min.css'
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
            <VideoRelease />
          </div>
        </div>
        <div className="footer" style={{ position: 'relative', zIndex: 2000 }}>
          <MyFooter />
        </div>
      </div>

      <style jsx>{`
        .all {
          background-color: #f4f1f1;
          height: 2250px;
          display: flex;
          flex-direction: column;
        }

        .box1{
          margin-top:-220px;
          margin-bottom:100px;
          
        }

        .card-container {
          padding-left: 20px;
          margin-top: 60px;
        }

        .video-palyer {
          margin-top: 90px;
          padding-left: 20px;
        }
        .footer {
          margin-top: auto;
        }
      `}</style>
    </>
  )
}