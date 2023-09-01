import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import VideoClassCard from './video-class-card';
import 'bootstrap/dist/css/bootstrap.min.css';
import mline from '@/public/images/video_line/m-line.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/navigation'; // 引入 Navigation 樣式
import 'swiper/css/bundle';
SwiperCore.use([Navigation]);

export default function VideoRelease() {
  const [dataVedio, setdataVedio] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [swiper1, setSwiper1] = useState(null);


  useEffect(() => {
    async function getVedio() {
      const url = 'http://localhost:3005/api/getVedio';
      const response = await fetch(url);
      const res = await response.json();
      setdataVedio(res.video.sort(() => Math.random() - 0.5));
    }
    getVedio();
  }, []);

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext1 = () => {
    if (swiper1) {
      swiper1.slideNext();
    }
  };

  const handlePrev1 = () => {
    if (swiper1) {
      swiper1.slidePrev();
    }
  };

  return (
    <>
      <div className="container" style={{ padding: 0 }}>
        <div className="row mb-5">
          <div>
            <Image
              className="plan-img"
              src={mline}
              alt="mline"
              width={1200}
              height={1}
              style={{
                position: 'relative',
                top: '-67px',
                left: '100px',
              }}
            />
            <p className="hot-text">最新釋出</p>
          </div>
          <div className="card-container">
            <div className="swiper-sec" id='swiper1'>
              <Swiper
                spaceBetween={40}
                slidesPerView={3}
                navigation={{
                  nextEl: '#swiper1 .swiper-button-next',
                  prevEl: '#swiper1 .swiper-button-prev',
                }}
                onSwiper={setSwiper1} // 設定 swiper 實例
              >
                {dataVedio
                  .filter((v) => v.multipackgroup_id === 1)
                  .map((video) => (
                    <SwiperSlide key={video.Title}>
                      <VideoClassCard
                        Title={video.Title}
                        classname={video.classname}
                        vidthumbnail={video.vidthumbnail}
                      />
                    </SwiperSlide>
                  ))}
                <div className="swiper-button-next" onClick={handleNext1}></div>
                <div className="swiper-button-prev" onClick={handlePrev1}></div>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div>
            <Image
              className="plan-img"
              src={mline}
              alt="mline"
              width={1200}
              height={1}
              style={{
                position: 'relative',
                top: '86px',
                left: '100px',
              }}
            />
            <p className="new-text">值得等待</p>
          </div>
          <div className="swiper-sec">
            <Swiper
              spaceBetween={40}
              slidesPerView={3}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              onSwiper={setSwiper}
            >
              {dataVedio
                .filter((v) => v.multipackgroup_id === 2)
                .map((video) => (
                  <SwiperSlide key={video.Title}>
                    <VideoClassCard
                      Title={video.Title}
                      classname={video.classname}
                      vidthumbnail={video.vidthumbnail}
                    />
                  </SwiperSlide>
                ))}
              <div className="swiper-button-next" onClick={handleNext}></div>
              <div className="swiper-button-prev" onClick={handlePrev}></div>
            </Swiper>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .card-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          }
  
          .swiper-sec {
            padding-left:100px;
            margin-top:20px;
          }

          .hot-text {
            font-family: 'Noto Sans TC', sans-serif;
            margin-top: -95px;
            padding-left: 630px;
            font-size: 27px;
            color: #ea6f2a;
            letter-spacing: 3.5px;
          }

          .new-text {
            font-family: 'Noto Sans TC', sans-serif;
            margin-top: 50px;
            padding-left: 630px;
            font-size: 27px;
            color: #ea6f2a;
            letter-spacing: 3.5px;
          }

          .hard-text {
            font-family: 'Noto Sans TC', sans-serif;
            margin-top: 50px;
            padding-left: 560px;
            font-size: 27px;
            color: #ea6f2a;
            letter-spacing: 3.5px;
          }

            .btn1 {
            width: 230px;
            height: 75px;
            margin-left:1050px;
            margin-top:-165px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 26px;
            }
            .btn1:hover {
            width: 230px;
            height: 75px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 26px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            }
            .btn1 p {
              position: relative;
              top: 25px;
              left: 25px;
              font-family: 'Rambla', sans-serif;
              font-size: 20px;
              letter-spacing: 2px;
              color: #ffffff;
              }

              .swiper-button-next {
                margin-right:50px;
                color:#ea6f2a;
              }

              .swiper-button-prev{
                color:#ea6f2a;
              }
        `}
      </style>
    </>
  )
}