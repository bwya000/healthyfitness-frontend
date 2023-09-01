import React from 'react'
import VideoSubDetail from '@/components/video/video-subDetail'
import MyFooter from '@/components/layout/default-layout/my-footer'
export default function VideoSubscribe() {
  return (
    <>
      <div className='bg-img'>
      </div>
      <div style={{ position: 'relative', zIndex: 2000 }}>
        <VideoSubDetail />
        <MyFooter />
      </div>
    </>
  )
}