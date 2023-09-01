import React, { useState } from 'react'
import ChoiceFoodType from './choice-foodtype'
import FoodList from './food-list'
import Modal from '../modal'

export default function Foodoptioncard() {
  const [selectedFromOption, setSelectedFromOption] = useState(0)
  const [FoodData, setFoodData] = useState(
  {FoodName:'',FoodImgID:''})

  return (
    <>
      <ChoiceFoodType
        setSelectedFromOption={setSelectedFromOption}
      />
      <FoodList selectedFromOption={selectedFromOption} setFoodData={setFoodData} />
      <Modal FoodData={FoodData}
      />
    </>
  )
}
