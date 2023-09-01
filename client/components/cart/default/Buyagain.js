import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import 'bootstrap/dist/css/bootstrap.min.css'
import BuyagainCard from './BuyagainCard'
import Image from 'next/image'

export default function Buyagain() {
  const [detail, setDetail] = useState('')
  const memberid = useSelector((state) => state.user.user.member_id)

  const getorderDetail = async (item) => {
    const res = await axios.post('http://localhost:3005/api/cart/getbuyagain', {
      member: item,
    })
    setDetail(res.data.success)
  }

  useEffect(() => {
    getorderDetail(memberid)
  }, [])
  return (
    <>
      {detail.length > 0 ? (
        <h4 style={{ color: '#999' }}>再買一次...</h4>
      ) : null}
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={45}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="AunmySwipe"
      >
        {detail ? (
          detail.map((item) => {
            return (
              <SwiperSlide key={uuidv4()}>
                <BuyagainCard sku={item} />
              </SwiperSlide>
            )
          })
        ) : (
          <Image
            src="/images/cartloading.gif"
            width={100}
            height={100}
            alt="cartloading.gif"
            key={uuidv4()}
          />
        )}
      </Swiper>
    </>
  )
}
