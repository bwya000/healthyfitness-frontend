import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'

import Breakfast from '@/public/img-record/breakfast.png'
import Breakfastwhite from '@/public/img-record/breakfast-white.png'
import Lunch from '@/public/img-record/lunch.png'
import Lunchwhite from '@/public/img-record/lunch-white.png'
import Dinner from '@/public/img-record/dinner.png'
import Dinnerwhite from '@/public/img-record/dinner-white.png'

export default function ChoiceBreakfast() {
  const options = [
    {
      id: 'breakfast',
      image: Breakfast,
      alt: 'Breakfast',
      altWhite: Breakfastwhite,
    },
    { id: 'lunch', image: Lunch, alt: 'Lunch', altWhite: Lunchwhite },
    { id: 'dinner', image: Dinner, alt: 'Dinner', altWhite: Dinnerwhite },
  ]

  const [selectedOption, setSelectedOption] = useState(options[0].id)

  const handleClick = (optionId) => {
    setSelectedOption(optionId)
  }

  return (
    <>
      <div className="col mt-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleClick(option.id)}
            className="button_none"
          >
            <Image
              src={
                selectedOption === option.id ? option.image : option.altWhite
              }
              alt=""
              className="me-4"
            />
          </button>
        ))}
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
