import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Callinechart from '../chart/cal-linechart '


export default function Collapse_CAL() {
  return (
    <>
    <div className="container-fluid mt-5 ms-5 chart_container" style={{backgroundColor:'white'}}>
      <p className="d-flex gap-1 justify-content-end pe-3 m-0">
        <button
          className="btn btn-sm btn-secondary collapse_button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse_calories"
          aria-expanded="false"
          aria-controls="collapse_calories"
        ></button>
      </p>
      <div className="collapse show" id="collapse_calories">
        <div className="card card-body collapse_card">
            <Callinechart />
        </div>
      </div></div>

      <style>
        {`
         .collapse_card {
            border: none;
            background-color: rgba(0, 0, 0, 0);
           }

          .collapse_button {
            height: 10px;
            width: 25px;
          }
          .chart_container {
            background-color: #86909C;
            padding: 20px 0;
            border-radius: 15px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </>
  )
}
