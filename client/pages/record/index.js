import React, { useState } from 'react'
import Image from 'next/image'
import Line01 from 'public/img-record/line-01.png'
import Line02 from 'public/img-record/line-02.png'
import Line03 from 'public/img-record/line-03.png'
import Line04 from 'public/img-record/line-04.png'
import Line05 from 'public/img-record/line-05.png'
import LineOrange01 from 'public/img-record/line-orange-01.png'
import LineOrange02 from 'public/img-record/line-orange-02.png'
import LineOrange03 from 'public/img-record/line-orange-03.png'
import LineOrange04 from 'public/img-record/line-orange-04.png'
import LineOrange05 from 'public/img-record/line-orange-05.png'
import Chart from 'public/img-record/chart.png'
import ChartPress from 'public/img-record/chart-orange.gif'
import Baseketball from 'public/img-record/basketball.png'
import BaseketballPress from 'public/img-record/basketball-orange.gif'
import Salad from 'public/img-record/salad.png'
import SaladPress from 'public/img-record/salad-orange.gif'
import Doughnut from 'public/img-record/doughnut.png'
import DoughnutPress from 'public/img-record/doughnut-orange.gif'
import Bar from 'public/img-record/bar.png'
import BarPress from 'public/img-record/bar-orange.gif'

export default function Index() {
  const [circleClassName, setCircleClassName] = useState('circleSmall')
  const [circleClassName2, setCircleClassName2] = useState('circleSmall')
  const [circleClassName3, setCircleClassName3] = useState('circleSmall')
  const [circleClassName4, setCircleClassName4] = useState('circleSmall')
  const [circleClassName5, setCircleClassName5] = useState('circleSmall')
  const [lineImg, setLineImg] = useState(Line01)
  const [lineImg2, setLineImg2] = useState(Line02)
  const [lineImg3, setLineImg3] = useState(Line03)
  const [lineImg4, setLineImg4] = useState(Line04)
  const [lineImg5, setLineImg5] = useState(Line05)
  const [iconImg, setIconImg] = useState(Chart)
  const [iconImg2, setIconImg2] = useState(Baseketball)
  const [iconImg3, setIconImg3] = useState(Salad)
  const [iconImg4, setIconImg4] = useState(Doughnut)
  const [iconImg5, setIconImg5] = useState(Bar)
  const [showText, setShowText] = useState(false)
  const [showText2, setShowText2] = useState(false)
  const [showText3, setShowText3] = useState(false)
  const [showText4, setShowText4] = useState(false)
  const [showText5, setShowText5] = useState(false)

  const handleClick = () => {
    if (circleClassName === 'circleSmall') {
      setCircleClassName('circleSmallPress')
      setLineImg(LineOrange01)
      setIconImg(ChartPress)
      setShowText(true)
    } else {
      setCircleClassName('circleSmall')
      setLineImg(Line01)
      setIconImg(Chart)
      setShowText(false)
    }
  }
  const handleClick2 = () => {
    if (circleClassName2 === 'circleSmall') {
      setCircleClassName2('circleSmallPress')
      setLineImg2(LineOrange02)
      setIconImg2(BaseketballPress)
      setShowText2(true)
    } else {
      setCircleClassName2('circleSmall')
      setLineImg2(Line02)
      setIconImg2(Baseketball)
      setShowText2(false)
    }
  }

  const handleClick3 = () => {
    if (circleClassName3 === 'circleSmall') {
      setCircleClassName3('circleSmallPress')
      setLineImg3(LineOrange03)
      setIconImg3(SaladPress)
      setShowText3(true)
    } else {
      setCircleClassName3('circleSmall')
      setLineImg3(Line03)
      setIconImg3(Salad)
      setShowText3(false)
    }
  }
  const handleClick4 = () => {
    if (circleClassName4 === 'circleSmall') {
      setCircleClassName4('circleSmallPress')
      setLineImg4(LineOrange04)
      setIconImg4(DoughnutPress)
      setShowText4(true)
    } else {
      setCircleClassName4('circleSmall')
      setLineImg4(Line04)
      setIconImg4(Doughnut)
      setShowText4(false)
    }
  }
  const handleClick5 = () => {
    if (circleClassName5 === 'circleSmall') {
      setCircleClassName5('circleSmallPress')
      setLineImg5(LineOrange05)
      setIconImg5(BarPress)
      setShowText5(true)
    } else {
      setCircleClassName5('circleSmall')
      setLineImg5(Line05)
      setIconImg5(Bar)
      setShowText5(false)
    }
  }
  return (
    <>
      <div className="container" style={{ height: '1000px' }}>
        <h2 className="title">健康日誌</h2>
        <h4 className="title-1">HEALTH DAILY</h4>
        <div>
          <div className="circle">
            <p className="circleText">會員專屬服務</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '20px',
            }}
          >
            <Image src={lineImg} style={{ marginTop: '-120px' }} alt="record" />
            <Image
              src={lineImg2}
              style={{ marginTop: '-20px', marginLeft: '-80px' }}
              alt="record"
            />
            <Image src={lineImg3} style={{ marginTop: '20px' }} alt="record" />
            <Image
              src={lineImg4}
              style={{ marginTop: '-20px', marginRight: '-80px' }}
              alt="record"
            />
            <Image
              src={lineImg5}
              style={{ marginTop: '-120px' }}
              alt="record"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '20px',
              marginLeft: '20px',
              marginRight: '40px',
            }}
          >
            <div
              className="container"
              style={{
                height: '200px',
                width: '150px',
                backgroundColor: '',
                marginLeft: '40px',
              }}
            >
              <div
                className={circleClassName}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleClick}
              >
                <Image src={iconImg} width={70} alt="record" />
              </div>
              <p
                style={{
                  color: '#414141',
                  width: '110%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  paddingTop: '10px',
                  opacity: showText ? 1 : 0,
                  marginLeft: '10px',
                  marginTop: '10px',
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                專屬的圖表分析
              </p>
            </div>
            <div
              className="container"
              style={{
                height: '200px',
                width: '150px',
                backgroundColor: '',
                marginTop: '-150px',
              }}
            >
              <div
                className={circleClassName2}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleClick2}
              >
                <Image src={iconImg2} width={80} alt="record" />
              </div>
              <p
                style={{
                  color: '#414141',
                  width: '110%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  paddingTop: '10px',
                  opacity: showText2 ? 1 : 0,
                  marginLeft: '20px',
                  marginTop: '10px',
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                記錄每日運動
              </p>
            </div>
            <div
              className="container"
              style={{
                height: '200px',
                width: '150px',
                backgroundColor: '',
                marginTop: '-30px',
              }}
            >
              <div
                className={circleClassName3}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleClick3}
              >
                <Image src={iconImg3} width={80} alt="record" />
              </div>
              <p
                style={{
                  color: '#414141',
                  width: '110%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  paddingTop: '10px',
                  opacity: showText3 ? 1 : 0,
                  marginLeft: '20px',
                  marginTop: '10px',
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                記錄每日飲食
              </p>
            </div>
            <div
              className="container"
              style={{
                height: '200px',
                width: '150px',
                backgroundColor: '',
                marginTop: '-150px',
              }}
            >
              <div
                className={circleClassName4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleClick4}
              >
                <Image src={iconImg4} width={80} alt="record" />
              </div>
              <p
                style={{
                  color: '#414141',
                  width: '110%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  paddingTop: '10px',
                  opacity: showText4 ? 1 : 0,
                  marginLeft: '30px',
                  marginTop: '10px',
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                TDEE計算機
              </p>
            </div>
            <div
              className="container"
              style={{
                height: '200px',
                width: '150px',
                backgroundColor: '',
                marginRight: '40px',
              }}
            >
              <div
                className={circleClassName5}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleClick5}
              >
                <Image src={iconImg5} width={80} alt="record" />
              </div>
              <p
                style={{
                  color: '#414141',
                  width: '110%',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  paddingTop: '10px',
                  opacity: showText5 ? 1 : 0,
                  marginLeft: '30px',
                  marginTop: '10px',
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                FFMI計算機
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .title {
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
            letter-spacing: 5px;
            font-family: 'Noto Sans TC', sans-serif;
            color: #4a4a4a;
          }

          .title-1 {
            margin-bottom: 40px;
            letter-spacing: 4px;
            color: #4a4a4a;
            text-align: center;
          }

          .circle {
            margin: auto;
            border: 2rem solid #ea6f2a;
            box-shadow: 4px 4px 4px 0px #d1d9e6 inset,
              -4px -4px 4px 0px #ffffff inset;
            color: #414141;
            height: 250px;
            width: 250px;
            background-color: white;
            border-radius: 50%;
          }

          .circleText {
            line-height: 190px;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
          }

          .circleSmall {
            margin: auto;
            border: 10px solid #d9d9d9;
            box-shadow: -8px -4px 8px 0px #ffffff, 8px 4px 12px 0px #d1d9e6;
            color: #414141;
            height: 150px;
            width: 150px;
            background-color: white;
            border-radius: 50%;
            cursor: pointer;
          }

          .circleSmallPress {
            margin: auto;
            border: 10px solid #ea6f2a;
            box-shadow: 4px 4px 4px 0px #d1d9e6 inset,
              -4px -4px 4px 0px #ffffff inset;
            color: #414141;
            height: 150px;
            width: 150px;
            background-color: white;
            border-radius: 50%;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
