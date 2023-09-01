import React, { useState } from 'react'
import ChoiceSportType from './choice-sporttype'
import SportList from './sport-list'

export default function Sportoptioncard() {
  const [selectedFromOption, setSelectedFromOption] = useState(0)
  return (
    <>
      <ChoiceSportType
        setSelectedFromOption={setSelectedFromOption}
      />
      <SportList selectedFromOption={selectedFromOption} />
    </>
  )
}
