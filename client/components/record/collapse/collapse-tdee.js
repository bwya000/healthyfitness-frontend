import React, { useState } from 'react'
import BodyTDEEChart from '../chart/body-tdeebar'
import BodyFFMIChart from '../chart/body-ffmibar'
import BodyBMRChart from '../chart/body-bmrbar'
import { useDateContext } from '@/context/date'

export default function Collapse_TDEE() {
  const {endDate} = useDateContext()
  const [TDEE, setTDEE] = useState(0)
  const [FFMI, setFFMI] = useState(0)
  const [BMR, setBMR] = useState(0)
  return (
    <>
    <div className="col chart_container pt-2 mt-4 pm-2 pb-2" >
      <p className="d-flex gap-1 justify-content-end pe-3 m-0">
        <button
          className="btn btn-sm btn-secondary collapse_button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse_tdee"
          aria-expanded="false"
          aria-controls="collapse_tdee"
        ></button>
      </p>
      <div className="collapse show" id="collapse_tdee">
        <div className="card card-body collapse_card">
          <div className="col d-flex justify-content-around">
            <div className="tdeecard">
              <p>TDEE</p>
              <p id="tdee" style={{fontSize:'24px'}}>{TDEE}</p>
              <div className="bar_chart">
                <BodyTDEEChart endDate={endDate} setTDEE={setTDEE} />
              </div>
            </div>
            <div className="tdeecard">
              <p>FFMI</p>
              <p id="ffmi" style={{fontSize:'24px'}}>{FFMI}</p>
              <div className="bar_chart">
              <BodyFFMIChart endDate={endDate} setFFMI={setFFMI}/>
              </div>
            </div>
            <div className="tdeecard">
              <p>基礎代謝率</p>
              <p id="bmr" style={{fontSize:'24px'}}>{BMR}</p>
              <div className="bar_chart">
              <BodyBMRChart endDate={endDate} setBMR={setBMR}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style>
        {`
        .chart_container {
            background-color: white;
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

          .tdeecard {
            width: 200px;
            height: 200px;
            background-color: #eb6100;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 10px;
            color: white;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 3px;
          }
          
          .bar_chart {
            width: 150px;
            height: 15px;
            margin-bottom: 10px;
            background-color: rgb(255, 255, 255);
            border-radius: 10px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </>
  )
}
