import React from 'react'
import Image from 'next/image'
import DoughnutChart from './chart/doughnutchart'
import Calorie from '@/public/img-record/calorie.png'
import Protein from '@/public/img-record/protein.png'
import Fat from '@/public/img-record/fat.png'
import Carbohydrates from '@/public/img-record/carbohydrates.png'

export default function Modal({FoodData}) {
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
     
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body d-flex align-item-center justify-content-around p-0">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4 img-container">
                 
                    <img
                      src={`http://localhost:3000/img-record/img-food/${FoodData.FoodImgID}`}
                      className="modal-swiper-slide-card"
                      alt=""
                    /> <p className='p-style'> {FoodData.FoodName}</p>
                  </div>
                  <div className="col-8">
                      <div className="dountchart-container">
                        <DoughnutChart FoodImgID={FoodData.FoodImgID}/>
                      </div>
                      <div className="d-flex justify-content-around align-item-center label-style pb-4">
                        <Image src={Calorie} />
                        <span className='span-style'>熱量</span>
                        <Image src={Protein} />
                        <span className='span-style'>蛋白質</span>
                        <Image src={Fat} />
                        <span className='span-style'>脂肪</span>
                        <Image src={Carbohydrates} />
                        <span className='span-style'>碳水化合物</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .img-container{
          padding:0;
          overflow: hidden;
          position: relative;
          display: inline-block;
        }
        .modal-swiper-slide-card {
          object-fit: cover;
          display: block;
          width: 100%;
          height: 100%;
        }
        .img-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4); /* 半透明的黑色遮罩 */
          pointer-events: none; /* 讓遮罩不影響滑鼠事件 */
        }
        .dountchart-container {
          margin: 30px 0 30px 55px;
        }
        .p-style {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          font-size: 30px;
          color: white;
          letter-spacing: 5px;
          text-align: center; 
          width: 100%; 
        }
        .span-style{
          color: #414141;
          font-weight: bold;
          line-height: 35px;
          letter-spacing: 3px;
        }
      `}</style>
    </>
  )
}
