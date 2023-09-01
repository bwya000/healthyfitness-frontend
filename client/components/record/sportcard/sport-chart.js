import React, { useState } from 'react'
import { useDateContext } from '@/context/date'
import SportTimeLine from '../chart/sport-timeline'
import SportCalLine from '../chart/sport-calline'
import Image from 'next/image'
import Up from '@/public/img-record/up.png'
import Down from '@/public/img-record/down.png'

export default function SportChart() {
  const {startDate,
    endDate,
    startDateOfLastWeek,
    endDateOfLastWeek,
} = useDateContext()
  const [averageTime, setAverageTime] = useState(0)
  const [averageTimeRat, setAverageTimeRat] = useState(0)
  const [averageCal, setAverageCal] = useState(0)
  const [averageCalRat, setAverageCalRat] = useState(0)

  return (
    <>
      <div className="col mt-4">
        <div className="container-fluid d-flex">
          <div className="ms-3 me-5 d-flex">
            <div className="d-flex flex-column">
              <p className="mb-0 chart-title">平均運動時數</p>
              <p className="chart-subtitle" id="sport-average">
                {averageTime.toFixed(1)}
              </p>
              <div className="container-fluid d-flex justify-content-between">
                <div className="d-flex align-items-center p-0 m-0">
                  {averageTimeRat.toFixed(0) < 0 ? (
                    <Image src={Down} alt="" />
                  ) : (
                    <Image src={Up} alt="" />
                  )}
                </div>
                <span
                  className={
                    averageTimeRat.toFixed(0) < 0
                      ? 'chart-number-down'
                      : 'chart-number'
                  }
                  id="average-rate"
                >
                  {Math.abs(averageTimeRat.toFixed(0))}%
                </span>
              </div>
            </div>
            <div style={{ width: '300px' }}>
              <SportTimeLine
                startDate={startDate}
                endDate={endDate}
                startDateOfLastWeek={startDateOfLastWeek}
                endDateOfLastWeek={endDateOfLastWeek}
                setAverageTime={setAverageTime}
                setAverageTimeRat={setAverageTimeRat}
              />
            </div>
          </div>

          <div className="d-flex">
            <div className="d-flex flex-column">
              <p className="mb-0 chart-title">平均熱量消耗</p>
              <p className="chart-subtitle" id="sport-cal">
                {averageCal.toFixed(0)}
              </p>
              <div className="container-fluid d-flex justify-content-between">
                <div className="d-flex align-items-center p-0 m-0">
                {averageCalRat.toFixed(0) < 0 ? (
                    <Image src={Down} alt="" />
                  ) : (
                    <Image src={Up} alt="" />
                  )}
                </div>
                <span className={
                    averageCalRat.toFixed(0) < 0
                      ? 'chart-number-down'
                      : 'chart-number'
                  } id="sportcal-rate">
                  {Math.abs(averageCalRat.toFixed(0))}%
                </span>
              </div>
            </div>
            <div style={{ width: '300px' }}>
              <SportCalLine
                startDate={startDate}
                endDate={endDate}
                startDateOfLastWeek={startDateOfLastWeek}
                endDateOfLastWeek={endDateOfLastWeek}
                setAverageCal={setAverageCal}
                setAverageCalRat={setAverageCalRat}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .chart-title {
            color: #414141;
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 20px;
            font-weight: bold;
          }
          .chart-subtitle {
            font-size: 36px;
            color: #414141;
            margin-bottom: 25px;
            font-weight: bold;
          }
          .chart-number {
            font-size: 30px;
            color: #eb6100;
            font-weight: bold;
          }
          .chart-number-down {
            font-size: 30px;
            color: #b4e64a;
            font-weight: bold;
          }
        `}
      </style>
    </>
  )
}
