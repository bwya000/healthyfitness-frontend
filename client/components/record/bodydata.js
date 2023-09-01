import React, { useState, useEffect } from 'react'
import { useDateContext } from '@/context/date'

export default function BodyData() {
    const {endDate} = useDateContext()
  const [dataDetail, setdataDetail] = useState([])

  useEffect(() => {
    async function getBodyRecord() {
      const lastDate = endDate
      const url = `http://localhost:3005/api/record/getBodyRecord?endDate=${lastDate}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Body)
      // console.log('Data fetched:', res.Body)
    }
    getBodyRecord()
  }, [endDate])

  return (
    <div>
    </div>
  )
}
