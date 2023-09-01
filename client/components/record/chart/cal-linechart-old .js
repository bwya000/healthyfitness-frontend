import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      const TotalFoodCalorie = dataDetail.map((item) => parseInt(item.TotalFoodCalorie))

      const TotalSportCalorie = dataDetail.map((item) => item.TotalSportCalorie)
      // console.log(dates)
      // console.log(TotalFoodCalorie)
      // console.log(TotalSportCalorie)

    setChartData({
      labels: dates,
      datasets: [
        {
          label: '飲食卡路里',
          data: TotalFoodCalorie,

          borderColor: 'orange',
          tension: 0.4,
        },
        {
          label: '運動消耗卡路里',
          data: TotalSportCalorie,
          borderColor: 'gray',
          tension: 0.4,
        },
      ],
    })

    setChartOptions({
      pointStyle: false,
      scales: {
        x: {
          grid: {
            display: true,
          },
        },
        y: {
          eginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
    })
  }}, [dataDetail])
  return (
    <>
    <div style={{ width: '800px' }}>
      <Line data={chartData} options={chartOptions} />
      </div>
    </>
  )
}
