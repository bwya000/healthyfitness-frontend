//購買課程用 --- start
'use client'
import useAuthGuard from '@/pages/authGuard' //路由守衛
import { useRouter } from 'next/router' //定義前往付款所需元件
import videoProduct from '@/data/creditcardOnline/videoProduct.json' //定義前往付款所需元件
import { useDispatch ,useSelector} from 'react-redux' //redux
import { setbuyvideoCourse } from '@/pages/store/cartSlice' //購物車碎片
import axios from 'axios'
import { setfamousevideo,setnewvideo,sethardvideo,resetCourse } from '@/pages/store/cartSlice' // 課程組合碎片
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' //react的alert
//購買課程用 --- end

import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import VideoClassCard from './video-class-card'
import VideoClassPrice from './video-class-price'
import 'bootstrap/dist/css/bootstrap.min.css'
import mline from '@/public/images/video_line/m-line.png'




export default function VideoClass() {
 //*****************************購買課程用 --- start *****************************************************
 const auth = useAuthGuard()//路由守衛直接掛在第一行
 //如果使用者存在才能做事
 const handleLinePay = () => {
       confirmAlert({
       title: '您必須登入才能購買此課程',
       message: '確認要導向至登入頁面？',
       buttons: [
           {
           label: '確定',
           onClick: () => {
               router.push("http://localhost:3000/login")
           },
           },
           {
           label: '取消',
           onClick: () => {},
           },
       ],
       })
 }
 const dispatch = useDispatch();   // redux抓
 const famousevideo = useSelector((state)=>state.cart.famousevideo) //熱門課程
 const newvideo = useSelector((state)=>state.cart.newvideo) //熱民課程
 const hardvideo = useSelector((state)=>state.cart.hardvideo) //熱民課程
 const member_id = useSelector((state)=>state.user.user.member_id)//取會員id

 //stripe課程網路商店ID
 const famousrPay = videoProduct.videoProduct[0].famouseCor //買熱門組合
 const newPay = videoProduct.videoProduct[0].newCor //買新手組合
 const hardPay = videoProduct.videoProduct[0].hardCor //買高強度組合

 //網頁跳轉清資料,以便日後新增
 const router = useRouter();
 useEffect(() => {
   const exitingFunction = () => {
     dispatch(resetCourse()) //離開頁面清理redux
   };

   router.events.on("routeChangeStart", exitingFunction);

   return () => {
     dispatch(resetCourse()) //離開頁面清理redux
     router.events.off("routeChangeStart", exitingFunction);
   };
 }, []);
 //定義付款操作 
 const [creditvardStatus, setcreditvardStatus] = useState(false) //用勾子把付款狀態true or false 追蹤
 useEffect(() => {
     const handleLocalStorageChange = () => { // 定義一個localStorage變化的函數
     const storedCredicard = localStorage.getItem('credicard')
     if (storedCredicard === 'success') {
         //如果 credicard 已付款 -> 把值改成"true"
         setcreditvardStatus(true)
     }
     }

     // 監聽定義一個localStorage變化的函數的變化
     window.addEventListener('storage', handleLocalStorageChange)

     // 組件卸載,移除監聽事件
     return () => {
     window.removeEventListener('storage', handleLocalStorageChange)
     }
 }, [])
 useEffect(() => {
     if (creditvardStatus) {
     // 如果 creditvardStatus 為 true，執行跳轉
     router.push('http://localhost:3000/cart/linepay/videoCourse_confirm')
     }
 }, [creditvardStatus])  

 //點擊付款每個商品,使用開新分頁的方式,前往信用卡付款事件
 const gocredicard = (paynowObj) => {
     localStorage.setItem('paynow', JSON.stringify(paynowObj))
     const url = 'http://localhost:3000/cart/linepay/credicard'
     window.open(url, '_blank')
 }
//*****************************購買課程用 --- end *****************************************************  
  const [dataVedio, setdataVedio] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    async function getVedio() {
      const url = 'http://localhost:3005/api/getVedio';
      const response = await fetch(url);
      const res = await response.json();
      setdataVedio(res.video.sort(() => Math.random() - 0.5));
    }
    getVedio();
  }, []);


  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * 3 < dataVedio.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredVideosGroup1 = dataVedio.filter((v) => v.multipackgroup_id === 1);
  const firstVideoGroup1 = filteredVideosGroup1.length > 0 ? filteredVideosGroup1[0] : null;

  const filteredVideosGroup2 = dataVedio.filter((v) => v.multipackgroup_id === 2);
  const firstVideoGroup2 = filteredVideosGroup2.length > 0 ? filteredVideosGroup2[0] : null;

  const filteredVideosGroup3 = dataVedio.filter((v) => v.multipackgroup_id === 3);
  const firstVideoGroup3 = filteredVideosGroup3.length > 0 ? filteredVideosGroup3[0] : null;



  return (
    <>
      {/*熱門組合*/}
      <div className="container" style={{ padding: 0 }}>
        <div className="row mb-5">
          <div>
            <Image
              className="plan-img"
              src={mline}
              alt="mline"
              width={1250}
              height={1}
              style={{
                position: 'relative',
                top: '-34px',
                left: '40px',
              }}
            />
            <p className="hot-text">熱門組合</p>
          </div>
          <div className='card-container'>
          <div className='swiper-sec'>
            <Swiper spaceBetween={40} slidesPerView={3}>
              {dataVedio
                .filter((v) => v.multipackgroup_id === 1)
                .slice(currentPage * 3, (currentPage + 1) * 3)
                .map((video) => {
                  dispatch(setfamousevideo(video.VideoID)) //抓取熱門課程存進redux
                  return <>
                   <div key={video.Title} >
                    <SwiperSlide>
                      <VideoClassCard
                        Title={video.Title}
                        classname={video.classname}
                        vidthumbnail={video.vidthumbnail}
                      />
                    </SwiperSlide>
                  </div>
                  </>
                }
                )}
            </Swiper>
          </div>
            <div className='price'>
              {firstVideoGroup1 !== null && (
                <VideoClassPrice classprice={firstVideoGroup1.classprice} />
              )}
            </div>
          <div>
            <div className='btn1'
            onClick={async ()=>{
            //買熱門組合執行的動作 --- start
            if(auth){
              // famousevideo 寫入資料庫
              const orderHouse = {
                course : famousevideo, //熱門課程
                memberid: member_id, //會員id
              }
              //把資料寫進資料庫
              const res = await axios.post(
                        'http://localhost:3005/api/cart/buyvideo/orderCourse',
                        orderHouse
              )
              //把購買的課程存進redux
              const oneforall = {
                order:res.data.success,
                memberid:member_id,
                price:1999,
                shortId:res.data.shortId,
                stateDate:res.data.stateDate,
              }
              dispatch(setbuyvideoCourse(oneforall))
              //製作信用卡需要的格式
              const paynowObj = {
                        lineItems: [
                        {
                            price: famousrPay,
                            quantity: 1,
                        },
                        ],
              }
              //執行帶入的參數
              gocredicard(paynowObj)
            }else{
              handleLinePay()
            }

            }}
            //買熱門組合執行的動作 --- end
            >
              <div className='pay-text' style={{ 'cursor': 'pointer', }}>
                <p>立即購買</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div>
            <Image
              className="plan-img"
              src={mline}
              alt="mline"
                width={1250}
              height={1}
              style={{
                position: 'relative',
                top: '75px',
                left: '40px',
              }}
            />
            <p className="new-text">適合新手</p>
          </div>
          <div className='swiper-sec'>
            <Swiper spaceBetween={40} slidesPerView={3}>
              {dataVedio
                .filter((v) => v.multipackgroup_id === 2)
                .slice(currentPage * 3, (currentPage + 1) * 3)
                .map((video) => {
                  dispatch(setnewvideo(video.VideoID)) //抓取新手課程存進redux
                  return <>
                   <div key={video.Title} >
                    <SwiperSlide>
                      <VideoClassCard
                        Title={video.Title}
                        classname={video.classname}
                        vidthumbnail={video.vidthumbnail}
                      />
                    </SwiperSlide>
                  </div>
                  </>
                }
                )}
            </Swiper>
          </div>
            <div className='price'>
              {firstVideoGroup2 !== null && (
                <VideoClassPrice classprice={firstVideoGroup2.classprice} />
              )}
            </div>
          <div>
            <div className='btn1'
              onClick={async ()=>{
                  //買熱門組合執行的動作 --- start
                  if(auth){
                      // famousevideo 寫入資料庫
                      const orderHouse = {
                        course : newvideo, // 新手課程
                        memberid: member_id, //會員id
                      }
                      //把資料寫進資料庫
                      const res = await axios.post(
                                'http://localhost:3005/api/cart/buyvideo/orderCourse',
                                orderHouse
                      )
                      //把購買的課程存進redux
                      const oneforall = {
                        order:res.data.success,
                        memberid:member_id,
                        price:899,
                        shortId:res.data.shortId,
                        stateDate:res.data.stateDate,
                      }
                      dispatch(setbuyvideoCourse(oneforall))
                      //製作信用卡需要的格式
                      const paynowObj = {
                                lineItems: [
                                {
                                    price: newPay,
                                    quantity: 1,
                                },
                                ],
                      }
                      //執行帶入的參數
                      gocredicard(paynowObj)
                  }else{
                    handleLinePay()
                  }                        
                    }}
            >
            <div className='pay-text' style={{ 'cursor': 'pointer', }}>
              <p>立即購買</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div>
            <Image
              className="plan-img"
              src={mline}
              alt="mline"
                width={1250}
              height={1}
              style={{
                position: 'relative',
                top: '80px',
                left: '40px',
              }}
            />
            <p className="hard-text">高強度挑戰</p>
          </div>
          <div className='swiper-sec'>
            <Swiper spaceBetween={40} slidesPerView={3}>
              {dataVedio
                .filter((v) => v.multipackgroup_id === 3)
                .slice(currentPage * 3, (currentPage + 1) * 3)
                .map((video) => {
                  dispatch(sethardvideo(video.VideoID)) //抓取高強度課程存進redux
                  return <>
                   <div key={video.Title} >
                    <SwiperSlide>
                      <VideoClassCard
                        Title={video.Title}
                        classname={video.classname}
                        vidthumbnail={video.vidthumbnail}
                      />
                    </SwiperSlide>
                  </div>
                  </>
                }
                )}
            </Swiper>
            </div>
            <div className='price'>
              {firstVideoGroup3 !== null && (
                <VideoClassPrice classprice={firstVideoGroup3.classprice} />
              )}
            </div>
        </div>
        <div>
          <div className='btn1'
            onClick={async ()=>{
              //買熱門組合執行的動作 --- 
              if(auth)
              {
                  // famousevideo 寫入資料庫
                  const orderHouse = {
                    course : hardvideo, //高強度課程
                    memberid: member_id, //會員id
                  }
                  //把資料寫進資料庫
                  const res = await axios.post(
                            'http://localhost:3005/api/cart/buyvideo/orderCourse',
                            orderHouse
                  )
                  //把購買的課程存進redux
                  const oneforall = {
                    order:res.data.success,
                    memberid:member_id,
                    price:1999,
                    shortId:res.data.shortId,
                    stateDate:res.data.stateDate,
                  }
                  dispatch(setbuyvideoCourse(oneforall))
                  //製作信用卡需要的格式
                  const paynowObj = {
                            lineItems: [
                            {
                                price: hardPay,
                                quantity: 1,
                            },
                            ],
                  }
                  //執行帶入的參數
                  gocredicard(paynowObj)
              }
              else{
                handleLinePay()
              }                
            }}
          >
            <div className='pay-text' style={{ 'cursor': 'pointer', }}>
              <p>立即購買</p>
            </div>
          </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        .price {
          padding-left:10px;
        }
          .pay-text{
            padding-left:5%;
          }  
          
        .card-container {
          display: flex;
          flex-direction: column;
          justify-content:center;
          height: 100%;
          }
  
          .swiper-sec {
            margin-top:20px;
          }

          .hot-text {
            font-family: 'Noto Sans TC', sans-serif;
            margin-top: -65px;
            padding-left: 583px;
            font-size: 27px;
            color: #ea6f2a;
            letter-spacing: 3.5px;
          }

          .new-text {
            font-family: 'Noto Sans TC', sans-serif;
            margin-top: 50px;
            padding-left: 583px;
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
            width: 200px;
            height: 70px;
            margin-left:1090px;
            margin-top:-60px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 26px;
            transition: all 0.3s;
            }
            .btn1:hover {
            width: 200px;
            height: 70px;
            background-color: #f36f36;
            border: transparent;
            border-radius: 26px;
            transform: translateY(-10px);
            box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1),
          -4px -4px 12px rgba(0, 0, 0, 0.08);
            }
            .btn1 p {
              position: relative;
              top: 20px;
              left: 45px;
              font-family: 'Noto Sans TC', sans-serif;
              font-size: 20px;
              letter-spacing: 2px;
              color: #ffffff;
            }
        `}
      </style>
    </>
  )
}
