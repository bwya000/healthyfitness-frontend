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

export default function BodyBMRChart({ endDate, setBMR }) {
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
      
      const BMR =
        parseFloat((10 * dataDetail[0].Weight) + (6.25 * dataDetail[0].Height) - (5 * 30) + 5).toFixed(1)
     
      setBMR(BMR)
    
      setChartData({
        labels: [dataDetail[0].Date],
        datasets: [
          {
            label: 'BMR',
            data: [BMR],
            borderColor: '#86909C',
            tension: 0.4,
          },
        ],
      })

      setChartOptions({
        indexAxis: 'y',
        backgroundColor: '#86909C',
        barThickness: '15',
        borderRadius: 25,
        borderWidth: 3,
        hoverBackgroundColor: '#86909C',
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            max: 4500,
          },
          y: {
            beginAtZero: true,
            display: false,
          },
        },
        events: ['click'],
      })
    }
  }, [dataDetail])
  return (
    <>
      <Bar data={chartData} options={chartOptions} height={'30px'} />
    </>
  )
}
