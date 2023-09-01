import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import MaybeCard from './maybeCard'
//redux
import { useSelector } from 'react-redux'
//uuid
import { v4 as uuidv4 } from 'uuid'

export default function Maybe() {
  const maybebrowse = useSelector((state) => state.cart.filterbrowse)
  return (
    <>
      {maybebrowse.length > 0 ? (
        <h4 style={{ color: '#999' }}>猜你喜歡...</h4>
      ) : null}
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={45}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="AunmySwipe"
      >
        {maybebrowse ? (
          maybebrowse.map((item) => {
            return (
              <SwiperSlide key={uuidv4()}>
                <MaybeCard pid={item} />
              </SwiperSlide>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </Swiper>
    </>
  )
}
