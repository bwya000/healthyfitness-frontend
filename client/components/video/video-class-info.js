import React, { useEffect } from 'react';
import Image from 'next/image'
import Class from '@/public/images/icon-class.png'
import Home from '@/public/images/icon-home.png'
import Money from '@/public/images/icon-money.png'
import Time from '@/public/images/icon-time.png'
import 'animate.css';
import { useInView } from 'react-intersection-observer';

export default function VideoClassInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, 
  });

  const animateClassName = inView ? 'animate__animated animate__fadeInUp' : '';
  return (
    <>
      <div>
        <div className='info'>
          <div className='container p-0'>
            <div className='row' style={{ paddingTop: '100px'}}>
              <h1 className={`title ${animateClassName}`} ref={ref} >線上健身課程</h1>
              <div className='col-3 animate__animated animate__fadeInUp' style={{ paddingLeft: '10px' }}>
                <div className={`card ${animateClassName}`} ref={ref} style={{ borderRadius: '20px', boxShadow: ' 3px 3px rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image src={Time} width={100} height={100} style={{ marginTop: '20px' }} />
                    <div className="card-body" style={{ padding: '20px' }}>
                      <p className="card-title">彈性時間</p>
                      <p className="card-text">線上健身課程允許你根據自己的時間表自由安排課程
                        <br/>
                        無需受限於特定的上課時間
                        <br/>
                        你可以在早晨、午休、晚間或週末隨時參與課程
                        讓健身適應你的生活節奏</p>
                    </div>
                  </div>
                  </div>
              </div>
              <div className='col-3' style={{ paddingLeft: '10px' }}>
                <div className={`card ${animateClassName}`} ref={ref} style={{ borderRadius: '20px', boxShadow: ' 3px 3px rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image src={Home} width={100} height={100} style={{ marginTop: '20px' }} />
                    <div className="card-body" style={{ padding: '20px' }}>
                      <p className="card-title">地點自由</p>
                      <p className="card-text">無論你身在何處只要有網路連接你就能夠參與線上健身課程
                        <br/>
                        你可以在家中、辦公室、旅行中或任何你喜歡的地方隨時開展健身活動，不受地理位置的限制</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-3' style={{ paddingLeft: '10px' }}>
                <div className={`card ${animateClassName}`} ref={ref} style={{ borderRadius: '20px', boxShadow: ' 3px 3px rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Image src={Money} width={100} height={100} style={{marginTop:'20px'}} />
                    <div className="card-body" style={{ padding: '20px' }}>
                      <p className="card-title">經濟實惠</p>
                      <p className="card-text">相較於實體健身中心的會員費用
                        <br/>
                        線上健身課程通常具有更經濟實惠的價格
                        你可以透過訂閱或按需購買的方式 選擇適合你預算的方案
                        同時節省了交通和場地租用等額外費用</p>
                  </div>
                  </div>
                </div>
              </div>
              <div className='col-3' style={{ paddingLeft: '10px' }}>
                <div className={`card ${animateClassName}`} ref={ref} style={{ borderRadius: '20px', boxShadow: ' 3px 3px rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image src={Class} width={100} height={100} style={{ marginTop: '20px' }} />
                    <div className="card-body" style={{ padding: 'px' }}>
                      <p className="card-title">彈性教材和追蹤</p>
                      <p className="card-text">線上健身課程通常提供教學影片、教材和追蹤工具，讓你能夠根據自己的進度學習和鍛鍊
                        <br />
                        你可以重複觀看教學影片，按自己的步調進行學習和練習，同時使用追蹤工具追蹤自己的進展和成果</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .card-title{
          font-family: 'Noto Sans TC', sans-serif;
          font-size:25px;
          text-align:center;
          color:#6D6969;
          letter-spacing:1px;
        }

        .card-text{
          font-family: 'Noto Sans TC', sans-serif;
          font-size:16px;
          letter-spacing:3px;
          color:#676767;
          line-height: 2.5; 
        }
        .card {
          width:320px;
          height:460px;
        }
        .title {
          text-align:center;
          margin-bottom:50px;
          font-family: 'Noto Sans TC', sans-serif;
          font-size:40px;
          color:#676767;
        }
        `}
      </style>
    </>
  )
}
