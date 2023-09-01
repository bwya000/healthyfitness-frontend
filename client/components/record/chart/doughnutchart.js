import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function DoughnutChart({FoodImgID}) {
  const [dataDetail, setdataDetail] = useState([])
  const [chartData, setChartData] = useState({ datasets: [] })
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    async function getFoodData() {
      const url = `http://localhost:3005/api/record/getFoodData?optionId=${FoodImgID}`
      const response = await fetch(url)
      const res = await response.json()
      setdataDetail(res.Food)
      // console.log('Data fetched:', res.Food)
    }
    getFoodData()
    // console.log(getFoodData)
  },[FoodImgID])

  useEffect(() => {
    if (dataDetail.length > 0) {
    setChartData({
  
      datasets: [
        {
            label: "熱量",
            data: [dataDetail[0].Calorie],
            backgroundColor: ["rgb(226, 160, 123)"],
            hoverOffset: 4,
            borderColor: ["white"],
            borderWidth: 10,
            circumference: (ctx) => {
              //console.log(ctx.dataset.data[0])
              return ctx.dataset.data[0] / 360 * 300
            },
            hoverBackgroundColor:["rgb(226, 160, 123)"],
            hoverBorderWidth: 5,
            
            
          },
          {
            label: "蛋白質",
            data: [dataDetail[0].Protein],
            backgroundColor: ["rgb(231, 165, 88)"],
            hoverOffset: 4,
            borderColor: ["white"],
            borderWidth: 10,
            circumference: (ctx) => {
              return ctx.dataset.data[0] * 5
            },
            hoverBackgroundColor:["rgb(231, 165, 88)"],
            hoverBorderWidth: 5,
          },
          {
            label: "脂肪",
            data: [dataDetail[0].Fat],
            backgroundColor: ["rgb(177, 101, 58)"],
            hoverOffset: 4,
            borderColor: ["white"],
            borderWidth: 10,
            circumference: (ctx) => {
              return ctx.dataset.data[0] * 8
            },
            hoverBackgroundColor:["rgb(177, 101, 58)"],
            hoverBorderWidth: 5,
          },
          {
            label: "碳水化合物",
            data: [dataDetail[0].Carbohydrates],
            backgroundColor: ["rgb(234, 111, 42)"],
            hoverOffset: 4,
            borderColor: ["white"],
            borderWidth: 10,
            circumference: (ctx) => {
              return ctx.dataset.data[0] * 8
            },
            hoverBackgroundColor:["rgb(234, 111, 42)"],
            hoverBorderWidth: 5,
          },
      ],
    })

    setChartOptions({
        cutout: '60',
        borderRadius: 15,
    })
  }
  }, [dataDetail])
  return (
    <><div style={{height:'400px'}}><Doughnut data={chartData} options={chartOptions} /></div>
      
    </>
  )
}
