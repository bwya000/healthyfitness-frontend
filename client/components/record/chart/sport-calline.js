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

export default function SportCalLine({
  startDate,
  endDate,
  setAverageCal,
  startDateOfLastWeek,
  endDateOfLastWeek,
  setAverageCalRat,
}) {
  const [dataDetail, setdataDetail] = useState([])
  const [dataDetailOfLastWeek, setdataDetailOfLastWeek] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    async function getSportCal() {
      const firstDate = startDate
      const lastDate = endDate
      const url = `http://localhost:3005/api/record/getSportCal?startDate=${firstDate}&endDate=${lastDate}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Sport)
      // console.log('Data fetched:', res.Sport)
    }
    getSportCal()
  }, [startDate, endDate])

  // 抓上週的資料
  useEffect(() => {
    async function getSportCalOfLastWeek() {
      const firstDateOfLastWeek = startDateOfLastWeek
      const lastDateOfLastWeek = endDateOfLastWeek
      const url = `http://localhost:3005/api/record/getSportCal?startDate=${firstDateOfLastWeek}&endDate=${lastDateOfLastWeek}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetailOfLastWeek(res.Sport)
      // console.log('Data fetched:', res.Sport)
    }
    getSportCalOfLastWeek()
  }, [startDateOfLastWeek, endDateOfLastWeek])

  useEffect(() => {
    if (dataDetail.length > 0) {
      const dates = dataDetail.map((item) => item.date_series)
      const Calorie = dataDetail.map((item) => item.Calorie)
      // console.log(dates)

      // 計算平均一週卡路里消耗
      const totalCalorie = Calorie.reduce(
        (total, Calorie) => total + Calorie,
        0
      )
      const avgCal = totalCalorie / 7
      setAverageCal(avgCal)

      //計算上周平均一週卡路里消耗
      if (dataDetailOfLastWeek.length > 0) {
        const calOfLastWeek = dataDetailOfLastWeek.map((item) => item.Calorie)
        const totalCalOfLastWeek = calOfLastWeek.reduce(
          (total, Calorie) => total + Calorie,
          0
        )
        const avgCalOfLastWeek = totalCalOfLastWeek / 7
        // 計算平均卡路里消耗升降
        const avgRat =
          ((avgCal.toFixed(0) - avgCalOfLastWeek.toFixed(0)) /
            avgCalOfLastWeek.toFixed(0)) *
          100
        setAverageCalRat(avgRat)

        setChartData({
          labels: dates,
          datasets: [
            {
              labels: '',
              data: Calorie,
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
