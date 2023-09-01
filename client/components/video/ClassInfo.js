import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassInfo = () => {

  return (
    <>
      <div className='container'>
        <h2 className="title">線上健身課程</h2>
        <h4 className="title-1">FITNESS COURSE</h4>
        <div className='info'>
          <div className="slide">
            <div className="image-container">
            <Image
              src='/images/home1.png'
              alt="home"
              width={300}
              height={200}
              style={{
                borderRadius: '5px'
              }}
              />
            <div className="hover-overlay">
              <h2>彈性時間</h2>
            </div>
            </div>
          </div>
          <div className="slide">
            <div className="image-container">
            <Image
              src='/images/home2.png'
              alt="home"
              width={300}
              height={200}
              style={{
                borderRadius: '5px'
              }} />
              <div className="hover-overlay">
              <h2>地點自由</h2>
            </div>
            </div>
          </div>
          <div className="slide">
            <div className="image-container">
            <Image
              src='/images/home3.jpg'
              alt="home"
              width={300}
              height={200}
              style={{
                borderRadius: '5px'
              }} />
            <div className="hover-overlay">
              <h2>經濟實惠</h2>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="image-container">
            <Image
              src='/images/home4.jpg'
              alt=" bread with blueberry"
              width={300}
              height={200}
              style={{
                borderRadius: '5px'
              }} />
            <div className="hover-overlay">
              <h2>彈性教材和追蹤</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .title{
          text-align:center;
          margin-bottom:20px;
          font-weight:bold;
          letter-spacing:5px;
          font-family: 'Noto Sans TC', sans-serif;
          color:#4A4A4A;
        }

        .title-1{
          margin-bottom:40px;
          letter-spacing:4px;
          color: #4A4A4A;
        }

        .info{
          display:flex;
          justify-content:space-between;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 5px;
        }

        .hover-overlay {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.6);
          color: #414141;
          font-family: 'Noto Sans TC', sans-serif;
          font-size:10px;
          letter-spacing:5px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.5s, top 0.5s;
        }
        .image-container:hover .hover-overlay {
          top: 0;
          opacity: 1;
        }

        `}</style>
    </>
  );
};

export default ClassInfo;