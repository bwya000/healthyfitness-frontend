import React, { useState } from 'react'
import { useDateContext } from '@/context/date'
import FoodCalLine from '../chart/food-calline'
import FoodProLine from '../chart/food-proline'
import FoodFatLine from '../chart/food-fatline'
import FoodCarLine from '../chart/food-carline'
import Image from 'next/image'
import Up from '@/public/img-record/up-small.png'
import Down from '@/public/img-record/down-small.png'

export default function Collapse_RAT() {
  const { startDate, endDate, startDateOfLastWeek, endDateOfLastWeek } =
    useDateContext()

  const [averageCal, setAverageCal] = useState(0)
  const [averageCalRat, setAverageCalRat] = useState(0)
  const [averagePro, setAveragePro] = useState(0)
  const [averageProRat, setAverageProRat] = useState(0)
  const [averageFat, setAverageFat] = useState(0)
  const [averageFatRat, setAverageFatRat] = useState(0)
  const [averageCar, setAverageCar] = useState(0)
  const [averageCarRat, setAverageCarRat] = useState(0)
  

  return (
    <>
      <div className="col mt-4 chart_container_white pt-2 pb-2" >
        <p className="d-flex gap-1 justify-content-end pe-3 m-0">
          <button
            className="btn btn-sm btn-secondary collapse_button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_rat"
            aria-expanded="false"
            aria-controls="collapse_rat"
          ></button>
        </p>
        <div className="collapse show" id="collapse_rat">
          <div className="card card-body collapse_card">
            <div className="container-fluid d-flex p-0">
              <div className="ms-2 me-5 d-flex">
                <div className="d-flex flex-column">
                  <p className="mb-0 chart-title" style={{marginTop:'-10px'}}>平均熱量攝取</p>
                  <p className="chart-subtitle" id="food_cal" style={{marginBottom:'20px'}}>
                    {averageCal.toFixed(0)}
                  </p>
                  <div className="container-fluid d-flex justify-content-start p-0">
                    <div className="d-flex align-items-center p-0 m-0">
                      {averageCalRat.toFixed(0) < 0 ? (
                        <Image src={Down} alt="" />
                      ) : (
                        <Image src={Up} alt="" />
                      )}
                    </div>
                    <span
                      className={
                        averageCalRat.toFixed(0) < 0
                          ? 'chart-number-down'
                          : 'chart-number'
                      }
                      id="sportcal-rate"
                    >
                      {Math.abs(averageCalRat.toFixed(0))}%
                    </span>
                  </div>
                </div>
                <div style={{ width: '220px' }}>
                  <FoodCalLine
                    startDate={startDate}
                    endDate={endDate}
                    startDateOfLastWeek={startDateOfLastWeek}
                    endDateOfLastWeek={endDateOfLastWeek}
                    setAverageCal={setAverageCal}
                    setAverageCalRat={setAverageCalRat}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="d-flex flex-column">
                  <p className="mb-0 chart-title" style={{marginTop:'-10px'}}>平均蛋白質攝取</p>
                  <p className="chart-subtitle" id="food_protein" style={{marginBottom:'20px'}}>
                    {averagePro.toFixed(0)}
                  </p>
                  <div className="container-fluid d-flex justify-content-start p-0">
                    <div className="d-flex align-items-center p-0 m-0">
                      {averageProRat.toFixed(0) < 0 ? (
                        <Image src={Down} alt="" />
                      ) : (
                        <Image src={Up} alt="" />
                      )}
                    </div>
                    <span
                      className={
                        averageProRat.toFixed(0) < 0
                          ? 'chart-number-down'
                          : 'chart-number'
                      }
                      id="sportcal-rate"
                    >
                      {Math.abs(averageProRat.toFixed(0))}%
                    </span>
                  </div>
                </div>
                <div style={{ width: '220px' }}>
                  <FoodProLine
                    startDate={startDate}
                    endDate={endDate}
                    startDateOfLastWeek={startDateOfLastWeek}
                    endDateOfLastWeek={endDateOfLastWeek}
                    setAveragePro={setAveragePro}
                    setAverageProRat={setAverageProRat}
                  />
                </div>
              </div>
            </div>

            <div className="container-fluid d-flex p-0 mt-3">
              <div className="ms-2 me-5 d-flex">
                <div className="d-flex flex-column">
                  <p className="mb-0 chart-title" style={{marginTop:'-10px'}}>平均脂肪攝取</p>
                  <p className="chart-subtitle" id="food_fat">
                  {averageFat.toFixed(0)}
                  </p>
                  <div className="container-fluid d-flex justify-content-start p-0">
                    <div className="d-flex align-items-center p-0 m-0">
                    {averageFatRat.toFixed(0) < 0 ? (
                        <Image src={Down} alt="" />
                      ) : (
                        <Image src={Up} alt="" />
                      )}                    </div>
                    <span className={
                        averageFatRat.toFixed(0) < 0
                          ? 'chart-number-down'
                          : 'chart-number'
                      } id="average-rate">
                      {Math.abs(averageFatRat.toFixed(0))}%
                    </span>
                  </div>
                </div>
                <div style={{ width: '220px' }}>
                  <FoodFatLine 
                    startDate={startDate}
                    endDate={endDate}
                    startDateOfLastWeek={startDateOfLastWeek}
                    endDateOfLastWeek={endDateOfLastWeek}
                    setAverageFat={setAverageFat}
                    setAverageFatRat={setAverageFatRat}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="d-flex flex-column">
                  <p className="mb-0 chart-title" style={{marginTop:'-10px'}}>平均碳水化合物攝取</p>
                  <p className="chart-subtitle" id="food_carbohydrates">
                  {averageCar.toFixed(0)}
                  </p>
                  <div className="container-fluid d-flex justify-content-start p-0">
                    <div className="d-flex align-items-center p-0 m-0">
                    {averageCarRat.toFixed(0) < 0 ? (
                        <Image src={Down} alt="" />
                      ) : (
                        <Image src={Up} alt="" />
                      )}  
                    </div>
                    <span className={
                        averageCarRat.toFixed(0) < 0
                          ? 'chart-number-down'
                          : 'chart-number'
                      }id="sportcal-rate">
                      {Math.abs(averageCarRat.toFixed(0))}%
                    </span>
                  </div>
                </div>
                <div style={{ width: '220px', marginLeft: '-29px' }}>
                  <FoodCarLine 
                    startDate={startDate}
                    endDate={endDate}
                    startDateOfLastWeek={startDateOfLastWeek}
                    endDateOfLastWeek={endDateOfLastWeek}
                    setAverageCar={setAverageCar}
                    setAverageCarRat={setAverageCarRat}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .chart_container_white {
            background-color: #ffffff;
            padding: 20px 0;
            border-radius: 15px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
          }
          .collapse_card {
            border: none;
            background-color: rgba(0, 0, 0, 0);
           }

          .collapse_button {
            height: 10px;
            width: 25px;
          }
          .chart-title {
            color: #414141;
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 14px;
          }

          .chart-subtitle {
            font-size: 30px;
            color: #414141;
          }

          .chart-number {
          padding-left: 5px;
            font-size: 20px;
            color: #eb6100;
          }
          .chart-number-down {
            padding-left: 5px;
            font-size: 20px;
            color: #b4e64a;
          }
        `}
      </style>
    </>
  )
}
