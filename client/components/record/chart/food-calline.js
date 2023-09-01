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

export default function FoodCalLine({
  startDate,
  endDate,
  startDateOfLastWeek,
  endDateOfLastWeek,
  setAverageCal,
  setAverageCalRat,
}) {
  const [dataDetail, setdataDetail] = useState([])
  const [dataDetailOfLastWeek, setdataDetailOfLastWeek] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

  // 抓這週資料
  useEffect(() => {
    async function getFoodLine() {
      const firstDate = startDate
      const lastDate = endDate
      const url = `http://localhost:3005/api/record/getFoodLine?startDate=${firstDate}&endDate=${lastDate}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Food)
      // console.log('Data fetched:', res.Food)
    }
    getFoodLine()
  }, [startDate, endDate])

  // 抓上週的資料
  useEffect(() => {
    async function getFoodCalOfLastWeek() {
      const firstDateOfLastWeek = startDateOfLastWeek
      const lastDateOfLastWeek = endDateOfLastWeek
      const url = `http://localhost:3005/api/record/getFoodLine?startDate=${firstDateOfLastWeek}&endDate=${lastDateOfLastWeek}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetailOfLastWeek(res.Food)
      // console.log('Data fetched:', res.Food)
    }
    getFoodCalOfLastWeek()
  }, [startDateOfLastWeek, endDateOfLastWeek])

  useEffect(() => {
    if (dataDetail.length > 0) {
      const dates = dataDetail.map((item) => item.Date)
      const calorie = dataDetail.map((item) => item.TotalCalorie)
      // console.log(dates)

      // 計算平均一週卡路里攝取
      const totalCalorie = calorie.reduce(
        (total, calorie) => total + parseInt(calorie, 10),
        0
      )
      
      const avgCal = totalCalorie / 7
      setAverageCal(avgCal)
      // console.log('123:'+totalCalorie)

      //計算上周平均一週卡路里攝取
      if (dataDetailOfLastWeek.length > 0) {
        const calOfLastWeek = dataDetailOfLastWeek.map(
          (item) => item.TotalCalorie
        )
        const totalCalOfLastWeek = calOfLastWeek.reduce(
          (total, calorie) => total + parseInt(calorie, 10),
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
              data: calorie,
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
      <Line data={chartData} options={chartOptions} />
    </>
  )
}
