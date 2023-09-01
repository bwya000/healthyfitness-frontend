import React from 'react'
import { useEffect, useState } from 'react'
import { useDateContext } from '@/context/date'
import { Swiper, SwiperSlide } from 'swiper/react'
import SportCard from './sport-card'
import 'swiper/css'

export default function SportList({ selectedFromOption }) {
  const {clickDate} = useDateContext()
  const [dataSport, setdataSport] = useState([])

  useEffect(() => {
    async function getSportCard() {
      const url = `http://localhost:3005/api/record/getSportCard?optionId=${selectedFromOption}`
      const response = await fetch(url)
      const res = await response.json()
      setdataSport(res.Sport)
      // console.log('Data fetched:', res.Sport)
    }
    getSportCard()
  }, [selectedFromOption])

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <Swiper spaceBetween={50} slidesPerView={4}>
          {dataSport.map((Sport, i) => (
            <div key={i}>
              <SwiperSlide>
                <SportCard SportID={Sport.SportID} Name={Sport.Name} Img={Sport.Img} clickDate={clickDate} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </>
  )
}
