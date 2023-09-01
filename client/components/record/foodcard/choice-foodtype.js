import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import Rice from '@/public/img-record/rice.png'
import Ricepress from '@/public/img-record/rice-press.png'
import Noodle from '@/public/img-record/noodle.png'
import Noodlepress from '@/public/img-record/noodle-press.png'
import Breakfastsmall from '@/public/img-record/breakfast-small.png'
import Breakfastsmallpress from '@/public/img-record/breakfast-small-press.png'
import Soup from '@/public/img-record/soup.png'
import Souppress from '@/public/img-record/soup-press.png'
import Drink from '@/public/img-record/drink.png'
import Drinkpress from '@/public/img-record/drink-press.png'
import Other from '@/public/img-record/other.png'
import Otherpress from '@/public/img-record/other-press.png'

export default function ChoiceFoodType(props) {
  const options = [
    { id: '1', image: Rice, alt: 'Rice', altPress: Ricepress },
    { id: '2', image: Noodle, alt: 'Noodle', altPress: Noodlepress },
    {
      id: '3',
      image: Breakfastsmall,
      alt: 'Breakfastsmall',
      altPress: Breakfastsmallpress,
    },
    { id: '4', image: Soup, alt: 'Soup', altPress: Souppress },
    { id: '5', image: Drink, alt: 'Drink', altPress: Drinkpress },
    { id: '6', image: Other, alt: 'Other', altPress: Otherpress },
  ]
  const [selectedOption, setSelectedOption] = useState(1)
  const handleClick = (optionId) => {
    setSelectedOption(optionId)
    fetch(`http://localhost:3005/api/record/getFoodCard?optionId=${optionId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        // 在這裡處理後端 API 回傳的資料
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
    props.setSelectedFromOption(optionId)
  }
  return (
    <>
      <div className="row mt-5" style={{width:'100%'}}>
        <div className="col d-flex justify-content-around me-5 ps-5 pe-5">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleClick(option.id)}
              className="button_none"
            >
              <Image
                src={
                  selectedOption === option.id ? option.altPress : option.image
                }
                alt=""
                className="me-4"
              ></Image>
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .button_none {
          border: 0px;
          background-color: white;
        }
      `}</style>
    </>
  )
}
