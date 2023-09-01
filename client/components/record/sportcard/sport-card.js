import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ButtonInsert from '@/public/img-record/main-button.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Button, Modal, Space } from 'antd'

export default function SportCard({ SportID, Name, Img, clickDate }) {
  const [METs, setMETs] = useState()
  const [bodyDetail, setBodyDetail] = useState()
  const [sportData, setSportData] = useState({
    MemberID: '1234567890',
    SportID: '',
    time: '',
    date: clickDate,
    Calorie: '',
  })

  // alert modal
  const warningDate = () => {
    Modal.warning({
      title: '請先點選要加入的日期',
      // content: '',
    })
  }
  const warningTime = () => {
    Modal.warning({
      title: '請先選擇運動時數',
      // content: '',
    })
  }
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('確認要新增資料嗎??')

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setModalText('資料正在幫您更新')
    setConfirmLoading(true)
    //將時間重製初始值
    setSportData((prevData) => ({ ...prevData, time: '0', Calorie: '' }))
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
      window.location.reload()
    }, 2000)
  }

  const handleCancel = (event) => {
    // console.log('Clicked cancel button')
    setOpen(false)
    setSportData((prevData) => ({ ...prevData, time: '0', Calorie: '' }))
    event.preventDefault()
  }

  useEffect(() => {
    async function getSportCalDetail() {
      const url = `http://localhost:3005/api/record/getSportCalDetail?SportID=${SportID}`
      const response = await fetch(url)
      const res = await response.json()
      setMETs(res.Sport)
      // console.log('Data fetched:', res.Sport)
    }
    getSportCalDetail()
  }, [SportID])

  useEffect(() => {
    async function getBodyRecord() {
      const lastDate = clickDate
      const url = `http://localhost:3005/api/record/getBodyRecord?endDate=${lastDate}`
      const response = await fetch(url)
      const res = await response.json()
      setBodyDetail(res.Body)
      // console.log('Data fetched:', res.Body)
    }
    getBodyRecord()
  }, [clickDate])

  const handleTimeChange = (event) => {
    if (!clickDate || clickDate.length === 0) {
      warningDate()
      return // 停止執行後續操作
    }
    const selectedTime = event.target.value
    const mets = METs[0].METs
    const weight = bodyDetail[0].Weight
    const calculatedCalorie = parseFloat(mets * selectedTime * weight).toFixed(
      1
    )
    // console.log(calculatedCalorie)

    setSportData((prevData) => ({
      ...prevData,
      time: selectedTime,
      Calorie: calculatedCalorie,
    }))
  }

  const handleSubmit = async () => {
    if (!clickDate || clickDate.length === 0) {
      warningDate()
      return // 停止執行後續操作
    }
    if (sportData.time === '0' || sportData.time === '') {
      warningTime()
      return // 停止執行後續操作
    }
    const requestData = {
      MemberID: '1234567890',
      SportID: SportID,
      time: sportData.time,
      date: clickDate,
      Calorie: sportData.Calorie,
    }
    // console.log(requestData)

    try {
      const response = await axios.post(
        'http://localhost:3005/api/record/postSportData',
        requestData
      )

      if (response.status === 200) {
        showModal()
      } else {
        alert('資料新增失敗')
      }
    } catch (error) {
      console.error('錯誤:', error)
      alert('發生錯誤，請檢查網路連接或稍後再試。')
    }
  }

  return (
    <>
      <div className="swiper-slide">
        <p>{Name}</p>
        <img
          src={`http://localhost:3000/img-record/img-sport/${Img}`}
          className="swiper-slide-card"
          alt=""
        />
        <div className="d-flex justify-content-start pt-3 m-0">
          <label htmlFor="sport-time">時間：</label>
          <select
            name="sport-time"
            onChange={handleTimeChange}
            defaultValue={0}
          >
            <option>請選擇</option>
            <option value="0.5">30分鐘</option>
            <option value="1">60分鐘</option>
            <option value="1.5">90分鐘</option>
            <option value="2">120分鐘</option>
          </select>
        </div>
        <button type="submit" className="button_style" onClick={handleSubmit}>
          <Image src={ButtonInsert} alt="" style={{ marginTop: '-25px' }} />
        </button>
        <Modal
          title=""
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </div>

      <style jsx>{`
        .swiper-slide {
          background-size: cover;
          width: 350px;
          height: 350px;
          margin: 20px;
          padding: 20px 20px 20px 20px;
          border-radius: 15px;
          background-color: #eae8e8;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
        }
        .swiper-slide-card {
          object-fit: contain;
          display: block;
          margin: auto;
          width: 180px;
          height: 180px;
        }
        .swiper-slide p {
          font-size: 20px;
          color: #414141;
          font-weight: bold;
          letter-spacing: 0.5rem;
          text-align: start;
          margin: 0;
          position: relative;
        }
        .swiper-btn {
          position: absolute;
          top: 250px;
          left: 160px;
        }

        /* select */
        select {
          border: 1px solid #ffffff;
          border-radius: 5px;
          padding: 5px;
          font-size: 14px;
          background-color: #eae8e8;
        }
        /* 選擇框下拉箭頭的樣式 */
        select::-ms-expand {
          display: none;
        }
        select::after {
          /* 使用Unicode字符表示向下的三角形 */
          position: absolute;
          top: 12px;
          right: 10px;
          pointer-events: none;
          /* 使這個元素不接受滑鼠事件 */
        }
        select:hover {
          border-color: #eb6100;
        }
        select:focus {
          outline: none;
          box-shadow: 0 0 5px #ddd;
        }
        .button_style {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          outline: none;
          margin-left: 135px;
        }
      `}</style>
    </>
  )
}
