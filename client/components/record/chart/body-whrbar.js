import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function BodyWHRChart({endDate, setWHR}) {
  
  const [dataDetail, setdataDetail] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    async function getBodyRecord() {
      const lastDate = endDate
      const url = `http://localhost:3005/api/record/getBodyRecord?endDate=${lastDate}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Body)
      // console.log('Data fetched:', res.Body)
    }
    getBodyRecord()
  }, [endDate])
  
  
  useEffect(() => {
    if (dataDetail.length > 0) {
      const WHR = parseFloat(dataDetail[0].Waist / dataDetail[0].Hips).toFixed(1)
      setWHR(WHR)

    setChartData({

      labels: [dataDetail[0].Date],
      datasets: [
        {
          labels: '腰臀比',
          data: [WHR],
          borderColor: 'white',
          backgroundColor: 'white',
          tension: 0.4,
        },
      ],
    })

    setChartOptions({
      indexAxis: 'y',
      backgroundColor: 'black',
      barThickness: '10',
      borderRadius: 20,
      borderWidth: 3,
      hoverBackgroundColor: 'white',
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
          max: 1.5,
        },
        y: {
          beginAtZero: true,
          display: false,
        },
      },
    })
  }}, [dataDetail])
  return (
    <>
      <Bar data={chartData} options={chartOptions} height={'24px'} />
    </>
  )
}
