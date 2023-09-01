import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import ButtonInsert from '@/public/img-record/main-button.png'
import { Button, Modal, Space } from 'antd'

export default function FoodCard({
  FoodID,
  FoodName,
  FoodImgID,
  setFoodData,
  clickDate,
}) {
 const [requestData, setRequestData] = useState()

  // alert modal
  const warningDate = () => {
    Modal.warning({
      title: '請先點選要加入的日期',
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
    setModalText('資料正在幫您更新');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
      window.location.reload()
    }, 2000)
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button')
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!clickDate || clickDate.length === 0) {
      warningDate()
      return // 停止執行後續操作
    }
    const requestData = {
      MemberID: 'acc6d625-849b-4c1c-890a-f2e5d07f8027',
      FoodID: FoodID,
      date: clickDate,
    }
    setRequestData(requestData)
    // console.log(requestData)

    try {
      const response = await axios.post(
        'http://localhost:3005/api/record/postFoodData',
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
        <button
          type="button"
          className="btn"
          style={{ border: 'none' }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            setFoodData({ FoodName, FoodImgID })
          }}
        >
          <img
            src={`http://localhost:3000/img-record/img-food/${FoodImgID}`}
            className="swiper-slide-card"
            alt=""
          />
        </button>
        <p>{FoodName}</p>
        <button type="submit" className="button_style" onClick={handleSubmit}>
          <Image src={ButtonInsert} alt="" style={{ marginTop: '-20px' }} />
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
          background-position: center;
          background-size: cover;
          width: 350px;
          height: 350px;
          margin: 20px;
          padding: 30px 20px 20px 20px;
          border-radius: 15px;
          background-color: #eae8e8;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
        }
        .swiper-slide-card {
          object-fit: cover;
          display: block;
          margin: auto;
          width: 250px;
          height: 200px;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
        }
        .swiper-slide p {
          padding-top: 10px;
          padding-left: 30px;
          font-size: 20px;
          color: #414141;
          font-weight: bold;
          letter-spacing: 0.5rem;
          text-align: start;
          margin: 0;
        }

        .button_style {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          outline: none;
          margin-left: 135px;
          margin-top: -5px;
        }
      `}</style>
    </>
  )
}
