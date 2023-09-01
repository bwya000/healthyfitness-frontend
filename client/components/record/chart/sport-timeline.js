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

export default function SportTimeLine({
  startDate,
  endDate,
  setAverageTime,
  startDateOfLastWeek,
  endDateOfLastWeek,
  setAverageTimeRat,
}) {
  const [dataDetail, setdataDetail] = useState([])
  const [dataDetailOfLastWeek, setdataDetailOfLastWeek] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

  // 抓這週的資料
  useEffect(() => {
    async function getSportTime() {
      const firstDate = startDate
      const lastDate = endDate
      const url = `http://localhost:3005/api/record/getSportTime?startDate=${firstDate}&endDate=${lastDate}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Sport)
      // console.log('Data fetched:', res.Sport)
    }
    getSportTime()
  }, [startDate, endDate])

  // 抓上週的資料
  useEffect(() => {
    async function getSportTimeOfLastWeek() {
      const firstDateOfLastWeek = startDateOfLastWeek
      const lastDateOfLastWeek = endDateOfLastWeek
      const url = `http://localhost:3005/api/record/getSportTime?startDate=${firstDateOfLastWeek}&endDate=${lastDateOfLastWeek}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetailOfLastWeek(res.Sport)
      // console.log('Data fetched:', res.Sport)
    }
    getSportTimeOfLastWeek()
  }, [startDateOfLastWeek, endDateOfLastWeek])

  // 傳到Chart裡面
  useEffect(() => {
    if (dataDetail.length > 0) {
      const dates = dataDetail.map((item) => item.date_series)
      const times = dataDetail.map((item) => item.time)
      // console.log(dates)

      //計算平均一週運動時數
      const totalTimes = times.reduce((total, time) => total + time, 0)
      const avgTime = totalTimes / 7
      setAverageTime(avgTime)

      //計算上周平均一週運動時數
      if (dataDetailOfLastWeek.length > 0) {
        const timesOfLastWeek = dataDetailOfLastWeek.map((item) => item.time)
        const totalTimesOfLastWeek = timesOfLastWeek.reduce(
          (total, time) => total + time,
          0
        )
        const avgTimeOfLastWeek = totalTimesOfLastWeek / 7
        // 計算平均時數升降
        const avgRat =
          ((avgTime.toFixed(1) - avgTimeOfLastWeek.toFixed(1)) /
            avgTimeOfLastWeek.toFixed(1)) *
          100
        setAverageTimeRat(avgRat)

        setChartData({
          labels: dates,
          datasets: [
            {
              labels: '',
              data: times,
              borderColor: avgRat < 0 ? 'rgb(180,230,74)' : 'rgb(235, 97, 0)',
              backgroundColor: (context) => {
                const ctx = context.chart.ctx
                const gradient = ctx.createLinearGradient(0, 0, 0, 150)
                if (avgRat < 0) {
                  gradient.addColorStop(0, 'rgb(180,230,74)') 
                } else {
                  gradient.addColorStop(0, 'rgb(235, 97, 0)')
                }
                gradient.addColorStop(1, 'white')
                return gradient
              },
              tension: 0.2,
              pointStyle: false,
            },
          ],
        })

        setChartOptions({
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              beginAtZero: true,
              display: false,
            },
          },
          elements: {
            line: {
              fill: true,
              backgroundColor: 'rgba(235,97,0,0.3)',
            },
          },
        })
      }
    }
  }, [dataDetail, dataDetailOfLastWeek])

  return (
    <>
      <div style={{ width: '300px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  )
}
