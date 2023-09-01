import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import Walk from '@/public/img-record/walk.png'
import Walkpress from '@/public/img-record/walk-press.png'
import Stair from '@/public/img-record/stair.png'
import Stairpress from '@/public/img-record/stair-press.png'
import Run from '@/public/img-record/run.png'
import Runpress from '@/public/img-record/run-press.png'
import Bike from '@/public/img-record/bike.png'
import Bikepress from '@/public/img-record/bike-press.png'
import Clean from '@/public/img-record/clean.png'
import Cleanpress from '@/public/img-record/clean-press.png'
import Fix from '@/public/img-record/fix.png'
import Fixpress from '@/public/img-record/fix-press.png'
import Exercise from '@/public/img-record/exercise.png'
import Exercisepress from '@/public/img-record/exercise-press.png'

export default function ChoiceSportType(props) {
  const options = [
    { id: '1', image: Walk, alt: 'Walk', altPress: Walkpress },
    { id: '2', image: Stair, alt: 'Stair', altPress: Stairpress },
    {
      id: '3',
      image: Run,
      alt: 'Run',
      altPress: Runpress,
    },
    { id: '4', image: Bike, alt: 'Bike', altPress: Bikepress },
    { id: '5', image: Clean, alt: 'Clean', altPress: Cleanpress },
    { id: '6', image: Fix, alt: 'Fix', altPress: Fixpress },
    { id: '7', image: Exercise, alt: 'Exercise', altPress: Exercisepress },
  ]
  const [selectedOption, setSelectedOption] = useState(1)
  const handleClick = (optionId) => {
    setSelectedOption(optionId)
    fetch(`http://localhost:3005/api/record/getSportCard?optionId=${optionId}`)
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
      <div className="row mt-5">
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
