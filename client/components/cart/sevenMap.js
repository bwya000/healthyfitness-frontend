// 7-11超商選擇
import React from 'react'
import styles from '@/styles/cartstylePay.module.css'
import { useDispatch } from 'react-redux'
import { setSeven,setsevenStoreinput } from '@/pages/store/cartSlice'

const SevenMap = () => {
  const dispatch = useDispatch()
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/sevenMapScrape')
      const data = await response.json()
      if(data.storeName){
        dispatch(setsevenStoreinput(true))
        const stoedate = {
          storeNumber: data.storeId,
          storeName: data.storeName,
        }
        dispatch(setSeven(stoedate))
      }else{
        dispatch(setsevenStoreinput(false))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className={`btn btn-light ${styles.orderButtonSeven}`}
      >
        搜尋門市
      </button>
    </>
  )
}

export default SevenMap
