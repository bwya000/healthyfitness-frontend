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

export default function BodyFFMIChart({ endDate, setFFMI }) {
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
      
      // FFMI = (體重 - 體脂肪質量) / (身高 M)²
      const height = (dataDetail[0].Height) / 100
      const FFMI = parseFloat((dataDetail[0].Weight - (dataDetail[0].Weight * (dataDetail[0].Body_fat_percent / 100))) / (height * height)).toFixed(1)

     
      setFFMI(FFMI)
    
      setChartData({
        labels: [dataDetail[0].Date],
        datasets: [
          {
            label: 'FFMI',
            data: [FFMI],
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
            max: 50,
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
