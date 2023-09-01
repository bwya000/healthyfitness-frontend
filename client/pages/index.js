import React from 'react'
import VideoCarousel from '@/components/video/video-carousel'
import VideoSlider from '@/components/video/video-slider'
import VideoPlanBtn from '@/components/video/video-plan-btn'
import ClassInfo from '@/components/video/ClassInfo'
import Index from './record/index'
import MyFooter from '@/components/layout/default-layout/my-footer'
import IndexProduct from '@/components/product/indexProduct'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import dynamic from 'next/dynamic'
const ChatWidget = dynamic(() => import('@/components/chat'), {
  ssr: false,
})

const getgoogle = async (
  googlename,
  googleemail,
  googleimage,
  googlememberid
) => {
  console.log(googlename, googleemail, googleimage)
  const res = await axios.post(
    'http://localhost:3005/api/member/googlelogin',
    {
      id: googlememberid,
      email: googleemail,
      name: googlename,
      image: googleimage,
    },
    {
      withCredentials: true,
    }
  )
}

export default function VideoIndex() {
  const { data: session } = useSession()
  if (session) {
    // console.log(session)
    const { name, email, image, id } = session.user
    // console.log(session.user)
    getgoogle(name, email, image, id)
  }

  return (
    <><div style={{ overflow: 'hidden' }}>
      <div className="VidIndexSec1"></div>
      <div className="VideoCarousel container">
        <VideoCarousel />
      </div>
      <div
        className="other-elements"
        style={{ position: 'relative', zIndex: 2000 }}
      >
        <div className="ClassInfo">
          <ClassInfo />
        </div>
        <div className="box9">
          <VideoSlider />
        </div>
        <div className="box10">
          <VideoPlanBtn />
        </div>
        <div>
          <Index />
        </div>
        <div className="b11">
          <IndexProduct />
        </div>
        <div>
          <MyFooter />
        </div>
      </div>
      <ChatWidget /></div>
      <style jsx>
        {`
          .three {
            margin-top: 80px;
          }
          .VideoCarousel {
            margin-top: 80px;
          }
          .ClassInfo {
            align-items: center;
            text-align: center;
            margin-top: 80px;
            margin-bottom: 100px;
          }
          .box9 {
            align-items: center;
            position: relative;
            margin-top: 25px;
          }
          .box10 {
            margin-top: 100px;
          }
          .b11 {
            align-items: center;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}