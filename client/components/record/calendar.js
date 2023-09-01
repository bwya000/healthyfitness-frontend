import React, { useState, useEffect } from 'react'
import styles from './calendar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { useDateContext } from '@/context/date'

export default function Calendar() {
  const [currYear, setCurrYear] = useState(new Date().getFullYear())
  const [currMonth, setCurrMonth] = useState(new Date().getMonth())
  const [date, setDate] = useState(new Date())
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startDateOfLastWeek,
    setStartDateOfLastWeek,
    endDateOfLastWeek,
    setEndDateOfLastWeek,
    clickDate,
    setClickDate,
  } = useDateContext()

  const months = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ]

  // const dataAvailable = []

  const renderCalendar = () => {
    const currentDateObj = new Date(currYear, currMonth, date.getDate())
    const firstDayOfWeek = currentDateObj.getDate() - currentDateObj.getDay()
    const daysTag = []

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(currYear, currMonth, firstDayOfWeek + i)
      const isToday =
        currentDay.toDateString() === currentDateObj.toDateString()
          ? 'active'
          : ''
      // const hasData = dataAvailable[currentDay.getDate() - 1]
      // let dotClass = hasData ? 'orange' : 'dot'
      // console.log('isToday:' + isToday)

      daysTag.push(
        <li
          key={i}
          className={isToday ? styles['active'] : ''}
          data-date={currentDay.toISOString().slice(0, 10)}
          onClick={handleDateClick}
        >
          {currentDay.getDate()}
          {/* <div className={`${styles[dotClass]}`}></div> */}
        </li>
      )
      // console.log(currentDay)
    }

    return daysTag
  }
  const getFirstAndLastDateOfWeek = () => {
    const currentDateObj = new Date(currYear, currMonth, date.getDate())
    const firstDayOfWeek = currentDateObj.getDate() - currentDateObj.getDay()

    const firstDate = new Date(currYear, currMonth, firstDayOfWeek + 1)
    const lastDate = new Date(currYear, currMonth, firstDayOfWeek + 7)
    const firstDateOfLastWeek = new Date(
      currYear,
      currMonth,
      firstDayOfWeek - 6
    )
    const lastDateOfLastWeek = new Date(currYear, currMonth, firstDayOfWeek)

    return { firstDate, lastDate, firstDateOfLastWeek, lastDateOfLastWeek }
  }

  const { firstDate, lastDate, firstDateOfLastWeek, lastDateOfLastWeek } =
    getFirstAndLastDateOfWeek()
    setStartDate(firstDate.toISOString().slice(0, 10))
    setEndDate(lastDate.toISOString().slice(0, 10))
    setStartDateOfLastWeek(firstDateOfLastWeek.toISOString().slice(0, 10))
    setEndDateOfLastWeek(lastDateOfLastWeek.toISOString().slice(0, 10))
    // console.log('第一天：', startDate)
    // console.log('最後一天：', endDate)
    // console.log('上禮拜第一天：', startDateOfLastWeek)
    // console.log('上禮拜最後一天：', endDateOfLastWeek)

  const handleDateClick = (event) => {
    const selectedDate = event.currentTarget.getAttribute('data-date')
    if (selectedDate) {
      const dateObject = new Date(selectedDate)
      dateObject.setDate(dateObject.getDate() + 1)
      const theDate = dateObject.toISOString().slice(0, 10)
      setClickDate(theDate)
      // console.log('click:' + clickDate)

      const activeDate = document.querySelector('.' + styles['active'])
      if (activeDate) {
        activeDate.classList.remove(styles['active'])
      }
      event.currentTarget.classList.add(styles['active'])
    }
  }
  useEffect(() => {
    // console.log('click:' + clickDate)
  }, [clickDate])

  const handleIconClick = (increment) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + increment)

    setCurrYear(newDate.getFullYear())
    setCurrMonth(newDate.getMonth())
    setDate(newDate)
  }

  return (
    <>
      <div className={`col-2 ${styles['wrapper']}`}>
        <header>
          <p
            className={`${styles['current-date']}`}
          >{`${months[currMonth]} ${currYear}`}</p>
          <div className={`${styles['icons']}`}>
            <button style={{ border: 'none', background: 'none' }}>
              {' '}
              <FaChevronLeft
                color="#414141"
                onClick={() => handleIconClick(-7)}
                style={{ margin: '10px' }}
              />{' '}
            </button>
            <button style={{ border: 'none', background: 'none' }}>
              <FaChevronRight
                color="#414141"
                onClick={() => handleIconClick(7)}
                style={{ margin: '10px' }}
              />
            </button>
          </div>
        </header>
        <div className={`${styles['calendar']}`}>
          <ul className={`${styles['weeks']}`}>
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
          <ul className={`${styles['days']}`}>{renderCalendar()}</ul>
        </div>
      </div>

      <style jsx>
        {`
          .active {
            color: #fff;
            background-color: rgb(223, 127, 9);
          }
        `}
      </style>
    </>
  )
}
