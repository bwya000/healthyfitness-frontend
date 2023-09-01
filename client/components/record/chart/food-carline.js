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

export default function FoodCarLine({
  startDate,
  endDate,
  startDateOfLastWeek,
  endDateOfLastWeek,
  setAverageCar,
  setAverageCarRat,
}) {
  const [dataDetail, setdataDetail] = useState([])
  const [dataDetailOfLastWeek, setdataDetailOfLastWeek] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

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
    async function getFoodCarOfLastWeek() {
      const firstDateOfLastWeek = startDateOfLastWeek
      const lastDateOfLastWeek = endDateOfLastWeek
      const url = `http://localhost:3005/api/record/getFoodLine?startDate=${firstDateOfLastWeek}&endDate=${lastDateOfLastWeek}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetailOfLastWeek(res.Food)
      // console.log('Data fetched:', res.Food)
    }
    getFoodCarOfLastWeek()
  }, [startDateOfLastWeek, endDateOfLastWeek])

  useEffect(() => {
    if (dataDetail.length > 0) {
      const dates = dataDetail.map((item) => item.Date)
      const carbohydrates = dataDetail.map((item) => item.TotalCarbohydrates)
      // console.log(dates)

      // 計算平均一週卡路里消耗
      const totalCarbohydrates = carbohydrates.reduce(
        (total, carbohydrates) => total + parseInt(carbohydrates, 10),
        0
      );
      
      const avgCar = totalCarbohydrates / 7
      setAverageCar(avgCar)
      // console.log('123:'+totalCarbohydrates)

      //計算上周平均一週卡路里消耗
      if (dataDetailOfLastWeek.length > 0) {
        const carOfLastWeek = dataDetailOfLastWeek.map(
          (item) => item.TotalCarbohydrates
        )
        const totalCarOfLastWeek = carOfLastWeek.reduce(
          (total, carbohydrates) => total + parseInt(carbohydrates, 10),
          0
        )
        const avgCarOfLastWeek = totalCarOfLastWeek / 7
        // 計算平均卡路里消耗升降
        const avgRat =
          ((avgCar.toFixed(0) - avgCarOfLastWeek.toFixed(0)) /
            avgCarOfLastWeek.toFixed(0)) *
          100
        setAverageCarRat(avgRat)
        setChartData({
          labels: dates,
          datasets: [
            {
              labels: '',
              data: carbohydrates,
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
