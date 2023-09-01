import React from 'react'
import Image from 'next/image'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function VideoCarousel() {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src="/images/slide1.png"
              className="d-block w-100"
              width={1920}
              height={385}
              alt="slide1"
            />
            <div className="carousel-caption custom-caption">
              <h3>“準備好，迎接嶄新的你”</h3>
              <Image
                src="/images/change.png"
                alt="..."
                width={38}
                height={350}
                style={{
                  position: 'absolute',
                  left: '-190px',
                  top: '-93px',
                }}
              />
              <Image
                alt="..."
                src="/images/star.png"
                width={70}
                height={83}
                style={{
                  position: 'absolute',
                  left: '800px',
                  top: '80px',
                }}
              />
              <div className="btn">
                <a href="/register">JOIN US</a>
                <Image
                  alt="..."
                  src="/images/arrow.png"
                  width={166}
                  height={19}
                  style={{
                    position: 'relative',
                    left: '10px',
                    top: '-30px',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src="/images/slide2.png"
              className="d-block w-100"
              width={1920}
              height={385}
              alt="slide2"
            />
            <div className="carousel-caption custom-caption">
              <h4>無盡健身之旅</h4>
              <h5>享受365天的無限健身課程和資源</h5>
              <Image
                alt="..."
                src="/images/change.png"
                width={38}
                height={350}
                style={{
                  position: 'absolute',
                  left: '-190px',
                  top: '-65px',
                }}
              />
              <Image
                alt="..."
                src="/images/circle.png"
                width={390}
                height={118}
                style={{
                  position: 'absolute',
                  left: '750px',
                  top: '140px',
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <style jsx>
        {`
          .custom-caption {
            display: flex;
            flex-direction: column;
            margin-top: 50px; /* 調整上方間距 */
          }
          .custom-caption h3 {
            font-family: 'Noto Sans TC', sans-serif;
            padding-left: -10px;
            letter-spacing: 9px;
            font-weight: 700;
            color: #414141;
            font-size: 63px;
            margin-bottom: 80px;
            text-align: left;
            text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
          }
          .custom-caption h4 {
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 9px;
            font-weight: 700;
            color: #414141;
            font-size: 70px;
            padding-left: 60px;
            margin-bottom: 50px;
            text-align: left;
            text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
          }
          .custom-caption h5 {
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 9px;
            font-weight: 700;
            color: #414141;
            font-size: 40px;
            padding-left: 60px;
            margin-bottom: 60px;
            text-align: left;
            text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
          }
          .custom-caption a {
            font-family: 'Rambla', sans-serif;
            padding-left: -20px;
            margin-top: -40px;
            margin-bottom: 10px;
            text-decoration: none;
            font-weight: 700;
            color: #414141;
            font-size: 30px;
            letter-spacing: 2px;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .custom-caption a:hover {
            transition: 0.2s linear;
            letter-spacing: 5px;
          }

          .btn {
            display: flex;
            flex-direction: column;
            align-items: center; /* 將內容在垂直方向上置中對齊 */
            gap: 10px; /* 設定元素間的垂直間距 */
          }
        `}
      </style>
    </>
  )
}
