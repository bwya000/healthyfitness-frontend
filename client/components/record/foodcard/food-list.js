import React from 'react'
import { useEffect, useState } from 'react'
import { useDateContext } from '@/context/date'
import { Swiper, SwiperSlide } from 'swiper/react'
import FoodCard from './food-card'
import 'swiper/css'

export default function FoodList({ selectedFromOption,setFoodData }) {
  const {clickDate} = useDateContext()
  const [dataFood, setdataFood] = useState([])

  useEffect(() => {
    async function getFoodCard() {
      const url = `http://localhost:3005/api/record/getFoodCard?optionId=${selectedFromOption}`
      const response = await fetch(url)
      const res = await response.json()
      setdataFood(res.Food)
      // console.log('Data fetched:', res.Food)
    }
    getFoodCard()
  }, [selectedFromOption])

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <Swiper spaceBetween={50} slidesPerView={4}>
          {dataFood.map((food, i) => (
            <div key={i}>
              <SwiperSlide>
                <FoodCard FoodID={food.FoodID} FoodName={food.FoodName} FoodImgID={food.FoodImgID} setFoodData={setFoodData} clickDate={clickDate}/>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </>
  )
}
