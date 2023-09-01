import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import 'bootstrap-icons/font/bootstrap-icons.css'

const slidesData = [
  {
    title: '5分鐘居家腹肌訓練【初級版】',
    description:
      '共 8 個動作，每一組有 10 秒間隔休息時間，在家依然可以實現擁有腹肌的心！',
    videoSrc: '/video/5 分鐘居家腹肌訓練【初級版】.mp4',
  },
  {
    title: '12分鐘居家啞鈴肩部訓練【中級版】',
    description:
      '這次的啞鈴訓練，會分成兩組進行（組間有60秒休息時間）整個訓練共包含了一個熱身和 8 個訓練動作。',
    videoSrc: '/video/12分鐘居家啞鈴肩部訓練【中級版】.mp4',
  },
  {
    title: '15分鐘居家腿部徒手訓練【中級版】',
    description:
      '内容共12個動作（重複兩輪訓練）兩輪之間會有60秒的調息時間！大家一起動起來吧~',
    videoSrc: '/video/15分鐘居家腿部徒手訓練.mp4',
  },
  {
    title: '20分鐘居家高强度全身肌肉徒手訓練【高級版】',
    description:
      '訓練的内容一共包含 14 個動作，高級版的跟著做系列！想要加强訓練强度的朋友們，可以做兩組來達到更好的效果哦~',
    videoSrc: '/video/20分鐘居家高强度全身肌肉徒手訓練【高級版】.mp4',
  },
]

const VideoSlider = () => {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slidesData.length)
  }

  const handlePrev = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length
    )
  }

  useEffect(() => {
    // 這裡可以放置在元件載入時要執行的程式碼
    console.log('元件已經載入')
  }, []) // 空陣列表示這個 useEffect 只在元件載入時執行一次

  useEffect(() => {
    // 這裡可以放置在 index 改變時要執行的程式碼
    console.log('index 值已改變')
  }, [index]) // 指定 index 為 useEffect 的依賴，index 改變時會重新執行這個 useEffect


  return (
    <>
      <div className="container">
        <h2 className="title">影音專區</h2>
        <h4 className="title-1">Audio Visual</h4>
        {slidesData.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`slide-container ${
              index === slideIndex ? 'active' : ''
            }`}
          >
            <div className="slide">
              <div className="content">
                <h3 className="h3">{slide.title}</h3>
                <p className="p">{slide.description}</p>
                <a href="/video/video-subscribe" className="btn">
                  立即訂閱
                </a>
              </div>
              <video
                className="video"
                src={slide.videoSrc}
                muted
                autoPlay
                loop
              ></video>
            </div>
          </div>
        ))}
        <button id="next" onClick={handleNext}>
          {' '}
          &gt;{' '}
        </button>
        <button id="prev" onClick={handlePrev}>
          {' '}
          &lt;{' '}
        </button>
      </div>
      <style jsx>{`
         * {
          box-sizing: border-box;
          outline: none;
          border: none;
          text-decoration: none;
          font-family: 'Noto Sans TC', sans-serif;
          text-transform: uppercase;
        } 

        .title{
          text-align:center;
          font-weight:bold;
          margin-bottom:20px;
          letter-spacing:5px;
          font-family: 'Noto Sans TC', sans-serif;
          font-size:35px;
          color:#4A4A4A;
          {/* text-shadow: 1px 1px rgba(0, 0, 0, 0.2); */}
        }

        .title-1{
          text-align:center;
          margin-bottom:40px;
          letter-spacing:4px;
          color: #4A4A4A;
        }

        .slide {
          min-height: 100%;
          position: relative;
          overflow: hidden;
        }

        .video {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          height: 100%;
          width: 100%;
          object-fit: cover;
          animation: fadeIn 0.4s linear;
        }

        @keyframes fadeIn {
          0% {
            transform: scale(1.5);
          }
        }

        .content {
          height: 700px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
          background: rgba(0, 0, 0, 0.7);
          text-align: center;
        }

        .h3 {
          font-size: 36px;
          color: #fff;
          letter-spacing:2px;
          text-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
          animation: animate 0.4s linear 0.4s backwards;
        }

        .p {
          font-size: 15px;
          padding: 5px 0;
          font-weight: lighter;
          color: #eee;
          text-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
          max-width: 700px;
          animation: animate 0.4s linear 0.6s backwards;
        }

        .btn {
          display: inline-block;
          padding: 9px 30px;
          background: #ea6f2a;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          color: #fff;
          font-weight: bold;
          font-size: 17px;
          margin-top: 10px;
          transition: 0.2s linear;
          animation: animate 0.4s linear 0.1s backwards;
        }

        .btn:hover {
          letter-spacing: 2px;
        }

        @keyframes animate {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(-50px);
          }
        }

        .slide-container {
          display: none;
        }

        .active {
          max-width: 1920px;
          display: block;
        }

        
        #prev {
          position: absolute;
          top: 50%;
          border-radius: 10px;
          transform: translateY(-50%);
          z-index: 100;
          background: #ea6f2a;
          color: #fff;
          font-weight: bold;
          height: 60px;
          width: 50px;
          line-height: 55px;
          font-size: 30px;
          cursor: pointer;
          text-align: center;
        }

        #next{
          position: absolute;
          top:415px;
          left:1550px;
          border-radius: 10px;
          transform: translateY(-50%);
          z-index: 100;
          background: #ea6f2a;
          color: #fff;
          font-weight: bold;
          height: 60px;
          width: 50px;
          line-height: 55px;
          font-size: 30px;
          cursor: pointer;
          text-align: center;
        }

      `}</style>
    </>
  )
}

export default VideoSlider
