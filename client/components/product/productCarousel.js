import React from 'react'
import Image from 'next/image'
import slide1 from '@/public/images/product-use/slide1.png'
import slide2 from '@/public/images/product-use/slide2.png'
import slide3 from '@/public/images/product-use/slide3.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

export default function PrdocrSlice() {
  const settings = {
    dots: false, // Set dots to false to remove them    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 4000, // Set the interval between slides (in milliseconds)
  }
  return (
    <>
      <div>
        <Slider {...settings} className="mb-3">
          <div>
            <Image
              className="slide1"
              src={slide1}
              alt="slide1"
              width={1330}
              height={720}
              layout="responsive"
            />
          </div>
          <div>
            <Image
              className="slide2"
              src={slide2}
              alt="slide2"
              width={1330}
              height={720}
              layout="responsive"
            />
          </div>
          <div>
            <Image
              className="slide3"
              src={slide3}
              alt="slide3"
              width={1330}
              height={720}
              layout="responsive"
            />
          </div>
        </Slider>
      </div>
      {/* <div id="carouselExampleIndicators" className="carousel slide">
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
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              className="slide1"
              src={slide1}
              alt="slide1"
              width={1330}
              height={720}
              layout="responsive"
            />
          </div>
          <div className="carousel-item">
            <Image
              className="slide1"
              src={slide1}
              alt="slide1"
              width={1330}
              height={720}
              layout="responsive"
            />
          </div>
          <div className="carousel-item">
            <Image
              className="slide1"
              src={slide1}
              alt="slide1"
              width={1330}
              height={720}
              layout="responsive"
            />
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
          <span className="visually-hidden">上一頁</span>
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
          <span className="visually-hidden">下一頁</span>
        </button>
      </div> */}
      <style jsx>
        {`
          .carousel .carousel-item {
            height: 720px;
            background: #777;
          }
          .carousel-inner > .carousel-item > .image-container {
            position: relative;
            width: 100%;
            height: 720px;
            overflow: hidden;
          }
          .carousel-inner > .carousel-item > .image-container img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </>
  )
}
