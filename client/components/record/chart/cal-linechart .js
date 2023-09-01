import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Chart } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function CalLineChart() {
  const [dataDetail, setdataDetail] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    async function getRecordCal() {
      const url = `http://localhost:3005/api/record/getRecordCal`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Cal)
      // console.log('Data fetched:', res.Cal)
    }
    getRecordCal()
  }, [])
  useEffect(() => {
    if (dataDetail.length > 0) {
      const dates = dataDetail.map((item) => item.DateMonth)
      const TotalFoodCalorie = dataDetail.map((item) =>
        parseInt(item.TotalFoodCalorie)
      )

      const TotalSportCalorie = dataDetail.map((item) => item.TotalSportCalorie)

      const differenceArray = TotalSportCalorie.map(
        (sportCalorie, index) => TotalFoodCalorie[index] - sportCalorie
      )

      // console.log(dates)
      // console.log(TotalFoodCalorie)
      // console.log(TotalSportCalorie)

      setChartData({
        labels: dates,
        datasets: [
          {
            type: 'line',
            label: '卡路里差距',
            data: differenceArray,
            borderColor: '#EB6100',
            backgroundColor:'#EB6100',
            tension: 0.3,
            borderWidth: 5
          },
          {
            type: 'bar',
            label: '飲食卡吸收路里',
            data: TotalFoodCalorie,
            backgroundColor: '#B4E64A',
          },
          {
            type: 'bar',
            label: '運動消耗卡路里',
            data: TotalSportCalorie,
            backgroundColor: '#86909C',

          },
        ],
      })

      setChartOptions({
        plugins: {
          legend: {
          },
        },
        pointStyle: false,
        borderRadius: 5,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            eginAtZero: true,
            grid: {
              display: true,
            },
          },
        },
      })
    }
  }, [dataDetail])
  return (
    <>
      <div style={{ width: '800px' }}>
        <Chart data={chartData} options={chartOptions} />
      </div>
    </>
  )
}
