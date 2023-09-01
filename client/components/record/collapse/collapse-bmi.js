import React, { useState } from 'react'
import { useDateContext } from '@/context/date'
import BodyFatPercentChart from '../chart/body-bodyfatpercentbar'
import BodyWHRChart from '../chart/body-whrbar'
import BodyBMIChart from '../chart/body-bmibar'
import Image from 'next/image'
import Bodyfat from '@/public/img-record/body-fat.png'
import Waistratio from '@/public/img-record/waist-ratio.png'
import Bmi from '@/public/img-record/BMI.png'
import { set } from 'lodash'

export default function Collapse_BMI() {
  const { endDate } = useDateContext()

  const [bodyFatPersent, setBodyFatPersent] = useState(0)
  const [WHR, setWHR] = useState(0)
  const [BMI, setBMI] = useState(0)

  
  return (
    <>
      <div className="container-fluid ms-5 chart_container_white" style={{paddingBottom:'32px'}}>
        <p className="d-flex gap-1 justify-content-end pe-3 m-0">
          <button
            className="btn btn-sm btn-secondary collapse_button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse_BMI"
            aria-expanded="false"
            aria-controls="collapse_BMI"
          ></button>
        </p>
        <div className="collapse show" id="collapse_BMI">
          <div className="card card-body collapse_card">
            <div className="container text-center">
              <div className="row p-0 mb-2">
                <div className="col-1">
                  <Image src={Bodyfat} alt="" />
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center p-0">
                  <p className="BMIChart_title m-0">體脂肪</p>
                </div>
                <div className="col-7">
                  <div className="div_chart">
                    <BodyFatPercentChart
                      endDate={endDate}
                      setBodyFatPersent={setBodyFatPersent}
                    />
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  <p className="m-0 BMIChart_subtitle" id="bodyFat_warn">
                    {bodyFatPersent < 0.25 ? '正常數值' : '肥胖警告'}
                  </p>
                </div>
              </div>

              <div className="row p-0 mb-2">
                <div className="col-1">
                  <Image src={Waistratio} alt="" />
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center p-0">
                  <p className="BMIChart_title m-0">腰臀比</p>
                </div>
                <div className="col-7">
                  <div className="div_chart">
                    <BodyWHRChart endDate={endDate} setWHR={setWHR} />
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  <p className="m-0 BMIChart_subtitle" id="bodyFat_warn">
                    {WHR < 0.92 ? '理想數值' : '超標警告'}
                  </p>
                </div>
              </div>

              <div className="row p-0">
                <div className="col-1">
                  <Image src={Bmi} alt="" />
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center p-0">
                  <p className="BMIChart_title m-0">BMI</p>
                </div>
                <div className="col-7">
                  <div className="div_chart">
                    <BodyBMIChart endDate={endDate} setBMI={setBMI} />
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  <p className="m-0 BMIChart_subtitle" id="bodyFat_warn">
                    {BMI < 18.5
                      ? '體重過輕'
                      : BMI < 24
                      ? '體重正常'
                      : BMI < 27
                      ? '體重過重'
                      : BMI < 30
                      ? '輕度肥胖'
                      : BMI < 35
                      ? '中度肥胖'
                      : '重度肥胖'}
                  </p>
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

          #myChart_bodyfat {
            width: 500px;
          }

          #myChart_waistratio {
            width: 500px;
          }

          #myChart_BMI {
            width: 500px;
          }

          .div_chart {
            width: 500px;
            margin-bottom: 10px;
            background-image: linear-gradient(
              90deg,
              rgba(226, 160, 123, 1) 0%,
              rgba(226, 160, 123, 1) 33.33%,
              rgba(234, 111, 42, 1) 33.33%,
              rgba(234, 111, 42, 1) 66.67%,
              rgba(177, 101, 58, 1) 66.67%,
              rgba(177, 101, 58, 1) 100%
            );
            border-radius: 10px;
          }

          .BMIChart_title {
            font-size: 24px;
            font-weight: bold;
            color: #86909c;
            text-align: center;
            font-weight:
          }

          .BMIChart_subtitle {
            color: red;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
