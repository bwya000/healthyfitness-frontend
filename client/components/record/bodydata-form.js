import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './form.module.css'
import Image from 'next/image'
import ButtonInsert from '@/public/img-record/main-button.png'
import ButTonUpdate from '@/public/img-record/update-button.png'
import { Button, Modal, Space } from 'antd'


export default function BodydataForm() {
  const [formData, setFormData] = useState({
    MemberID: 'acc6d625-849b-4c1c-890a-f2e5d07f8027',
    height: '',
    weight: '',
    bodyFatPercent: '',
    waist: '',
    hips: '',
    activityCoefficient: '',
  })

  // const [existingData, setExistingData] = useState(null)

  // useEffect(() => {
  //   const fetchExistingData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3005/api/record/getBodyForm?MemberID=${formData.MemberID}`
  //       )

  //       if (response.status === 200) {
  //         setExistingData(response.data)
  //       }
  //     } catch (error) {
  //       console.error('擷取現有資料時發生錯誤:', error)
  //     }
  //   }
  //   fetchExistingData()
  // }, [])

  const [errors, setErrors] = useState({
    height: '',
    weight: '',
    bodyFatPercent: '',
    waist: '',
    hips: '',
    activityCoefficient: '',
  })

  // const warningDate = () => {
  //   Modal.warning({
  //     title: '請先點選要加入的日期',
  //     // content: '',
  //   })
  // }
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
      window.location.href = '/record/record-index'
    }, 500)
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button')
    setOpen(false)
  }

  const handleInputChange = (event) => {
    // event.persist()
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    // console.log(formData)
  }

  //驗證表單
  const validateForm = () => {
    const newErrors = { ...errors }

    const isValidNumber = (value) => /^\d{2,3}(\.\d{1})?$/.test(value)

    newErrors.height =
      formData.height === ''
        ? '請輸入身高'
        : !isValidNumber(formData.height) || parseFloat(formData.height) > 250
        ? '請輸入正確的身高'
        : ''
    newErrors.weight =
      formData.weight === ''
        ? '請輸入體重'
        : !isValidNumber(formData.weight) || parseFloat(formData.weight) > 250
        ? '請輸入正確的體重'
        : ''
    newErrors.bodyFatPercent =
      formData.bodyFatPercent === ''
        ? '請輸入體脂肪'
        : !isValidNumber(formData.bodyFatPercent) ||
          parseFloat(formData.bodyFatPercent) > 50
        ? '請輸入正確的體脂肪'
        : ''
    newErrors.waist =
      formData.waist === ''
        ? '請輸入腰圍'
        : !isValidNumber(formData.waist) || parseFloat(formData.waist) > 300
        ? '請輸入正確的腰圍'
        : ''
    newErrors.hips =
      formData.hips === ''
        ? '請輸入臀圍'
        : !isValidNumber(formData.hips) || parseFloat(formData.hips) > 300
        ? '請輸入正確的臀圍'
        : ''
    newErrors.activityCoefficient =
      formData.activityCoefficient === '' ? '請選擇活動係數' : ''

    setErrors(newErrors)

    // 檢查錯誤是否是空的
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // 如果驗證失敗就不繼續執行
    if (!validateForm()) {
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/record/postBodyData',
        formData
      )

      if (response.status === 200) {
        showModal()

        // 清空表單數據
        setFormData({
          MemberID: '123456',
          height: '',
          weight: '',
          bodyFatPercent: '',
          waist: '',
          hips: '',
          activityCoefficient: '',
        })
        
      } else {
        alert('資料新增失敗')
      }
    } catch (error) {
      console.error('錯誤:', error)
      alert('發生錯誤，請檢查網路連接或稍後再試。')
    }
  }
  // console.log(existingData)

  return (
    <div class="col-11">
      <div className="container">
        <div className="row">
          <div className={`${styles['title-text-size']} mt-5 mb-3`}>
            <p>請輸入會員身體數據</p>
          </div>
        </div>
        <div className="row">
          <form
            action="http://localhost:3005/api/record/postBodyData"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className={`${styles['main-wrap']}`}>
              <div className="row row-cols-3">
                <div className={`col ${styles['main-wrap-col']}`}>
                  <label className={`${styles['wrap-title']}`} htmlFor="height">
                    身高
                    <p className={`${styles['wrap-subtitle']}`}>
                      (小數後一位)
                      {errors.height && (
                        <span className={`${styles['error-message']}`}>
                          {errors.height}
                        </span>
                      )}
                    </p>
                  </label>
                  <input
                    type="text"
                    className={`${styles['wrap-input']}`}
                    name="height"
                    id="height"
                    onChange={handleInputChange}
                    // value={
                    //   existingData
                    //     ? existingData.Body[0].Height
                    //     : formData.height
                    // }
                  />
                  <span className={`${styles['main-wrap-span']}`}>cm</span>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <label className={`${styles['wrap-title']}`} htmlFor="weight">
                    體重
                    <p className={`${styles['wrap-subtitle']}`}>
                      (小數後一位)
                      {errors.weight && (
                        <span className={`${styles['error-message']}`}>
                          {errors.weight}
                        </span>
                      )}
                    </p>
                  </label>
                  <input
                    type="text"
                    className={`${styles['wrap-input']}`}
                    name="weight"
                    id="weight"
                    onChange={handleInputChange}
                    // value={
                    //   existingData
                    //     ? existingData.Body[0].Weight
                    //     : formData.weight
                    // }
                  />
                  <span className={`${styles['main-wrap-span']}`}>kg</span>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <label
                    className={`${styles['wrap-title']}`}
                    htmlFor="bodyFatPercent"
                  >
                    體脂肪
                    <p className={`${styles['wrap-subtitle']}`}>
                      (小數後一位)
                      {errors.bodyFatPercent && (
                        <span className={`${styles['error-message']}`}>
                          {errors.bodyFatPercent}
                        </span>
                      )}
                    </p>
                  </label>
                  <input
                    type="text"
                    className={`${styles['wrap-input']}`}
                    name="bodyFatPercent"
                    id="bodyFatPercent"
                    onChange={handleInputChange}
                    // value={
                    //   existingData
                    //     ? existingData.Body[0].Body_fat_percent
                    //     : formData.bodyFatPercent
                    // }
                  />
                  <span className={`${styles['main-wrap-span']}`}>%</span>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <label className={`${styles['wrap-title']}`} htmlFor="waist">
                    腰圍
                    <p className={`${styles['wrap-subtitle']}`}>
                      (小數後一位)
                      {errors.waist && (
                        <span className={`${styles['error-message']}`}>
                          {errors.waist}
                        </span>
                      )}
                    </p>
                  </label>
                  <input
                    type="text"
                    className={`${styles['wrap-input']}`}
                    name="waist"
                    id="waist"
                    onChange={handleInputChange}
                    // value={
                    //   existingData ? existingData.Body[0].Waist : formData.waist
                    // }
                  />
                  <span className={`${styles['main-wrap-span']}`}>cm</span>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <label className={`${styles['wrap-title']}`} htmlFor="hips">
                    臀圍
                    <p className={`${styles['wrap-subtitle']}`}>
                      (小數後一位)
                      {errors.hips && (
                        <span className={`${styles['error-message']}`}>
                          {errors.hips}
                        </span>
                      )}
                    </p>
                  </label>
                  <input
                    type="text"
                    className={`${styles['wrap-input']}`}
                    name="hips"
                    id="hips"
                    onChange={handleInputChange}
                    // value={
                    //   existingData ? existingData.Body[0].Hips : formData.hips
                    // }
                  />
                  <span className={`${styles['main-wrap-span']}`}>cm</span>
                </div>
              </div>
              <legend className={`${styles['wrap-title']}`}>
                活動係數
                {errors.activityCoefficient && (
                  <span className={`${styles['error-message']}`}>
                    {errors.activityCoefficient}
                  </span>
                )}
              </legend>
              <div className="row row-cols-3">
                <div className={`col ${styles['main-wrap-col']}`}>
                  <div className={`${styles['ac-div']} row`}>
                    <div className="col-1 d-flex align-items-center p-2 pt-0">
                      <input
                        type="radio"
                        className={`${styles['my-radio-class']}`}
                        name="activityCoefficient"
                        id="ac1"
                        value={'ac1'}
                        onChange={handleInputChange}
                        // checked={
                        //   existingData &&
                        //   existingData.Body[0].Activity_coefficient === 'ac1'
                        // }
                      />
                    </div>
                    <div className="col-11">
                      <label htmlFor="ac1" className={`${styles['ac-title']}`}>
                        <span style={{ fontWeight: 'bold' }}>
                          無活動：活動係數 1.2
                        </span>
                        <p className={`${styles['ac-text']}`}>
                          指日常生活中缺乏運動的人，大部分時間坐著或站著，很少或沒有運動
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <div className={`${styles['ac-div']} row`}>
                    <div className="col-1 d-flex align-items-center text-center p-2 pt-0">
                      <input
                        type="radio"
                        className={`${styles['my-radio-class']}`}
                        name="activityCoefficient"
                        id="ac2"
                        value={'ac2'}
                        onChange={handleInputChange}
                        // checked={
                        //   existingData &&
                        //   existingData.Body[0].Activity_coefficient === 'ac2'
                        // }
                      />
                    </div>
                    <div className="col-11">
                      <label htmlFor="ac2" className={`${styles['ac-title']}`}>
                        <span style={{ fontWeight: 'bold' }}>
                          無活動：活動係數 1.35
                        </span>
                        <p className={`${styles['ac-text']}`}>
                          指進行輕度運動或量較少的人，如每週進行輕1-3次，或
                          每天步行30分鐘至1小時
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <div className={`${styles['ac-div']} row`}>
                    <div className="col-1 d-flex align-items-center text-center p-2 pt-0">
                      <input
                        type="radio"
                        className={`${styles['my-radio-class']}`}
                        name="activityCoefficient"
                        id="ac3"
                        value={'ac3'}
                        onChange={handleInputChange}
                        // checked={
                        //   existingData &&
                        //   existingData.Body[0].Activity_coefficient === 'ac3'
                        // }
                      />
                    </div>
                    <div className="col-11">
                      <label htmlFor="ac3" className={`${styles['ac-title']}`}>
                        <span style={{ fontWeight: 'bold' }}>
                          無活動：活動係數 1.55{' '}
                        </span>
                        <p className={`${styles['ac-text']}`}>
                          指每週進行中等強度的運動3-5次，或每天進行中等強度的運動約1小時
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <div className={`${styles['ac-div']} row`}>
                    <div className="col-1 d-flex align-items-center text-center p-2 pt-0">
                      <input
                        type="radio"
                        className={`${styles['my-radio-class']}`}
                        name="activityCoefficient"
                        id="ac4"
                        value={'ac4'}
                        onChange={handleInputChange}
                        // checked={
                        //   existingData &&
                        //   existingData.Body[0].Activity_coefficient === 'ac4'
                        // }
                      />
                    </div>
                    <div className="col-11">
                      <label htmlFor="ac4" className={`${styles['ac-title']}`}>
                        <span style={{ fontWeight: 'bold' }}>
                          無活動：活動係數 1.725
                        </span>
                        <p className={`${styles['ac-text']}`}>
                          指每週進行高度強的運動6-7次，或每天進行高度強的運動約1-2小時
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={`col ${styles['main-wrap-col']}`}>
                  <div className={`${styles['ac-div']} row`}>
                    <div className="col-1 d-flex align-items-center text-center p-2 pt-0">
                      <input
                        type="radio"
                        className={`${styles['my-radio-class']}`}
                        name="activityCoefficient"
                        id="ac5"
                        value={'ac5'}
                        onChange={handleInputChange}
                        // checked={
                        //   existingData &&
                        //   existingData.Body[0].Activity_coefficient === 'ac5'
                        // }
                      />
                    </div>
                    <div className="col-11">
                      <label htmlFor="ac5" className={`${styles['ac-title']}`}>
                        <span style={{ fontWeight: 'bold' }}>
                          無活動：活動係數 1.9
                        </span>
                        <p className={`${styles['ac-text']}`}>
                          指每天進行極度強的運動或高訓練，以及具有非常日活動水平
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col d-flex justify-content-end mt-5">
                  <button className={`${styles['main-button']}`} type="submit">
                    {/* {existingData ? (
                      <Image src={ButTonUpdate} alt="" />
                    ) : ( */}
                    <Image src={ButtonInsert} alt="" />
                    {/* )} */}
                  </button>
                </div>
              </div>
            </div>
            <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
          </form>
        </div>
      </div>
    </div>
  )
}
