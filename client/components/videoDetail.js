import React, { useEffect, useState } from 'react'
import useAuthGuard from '../pages/authGuard' //使用路由守衛
import { useRouter } from 'next/router'
import VideoPlayer from './video/video-player'
import VideoDetailCard from './video/video-detail-card'
import VideoRecomand from './video/video-recomand'
//redux用
import { useDispatch,useSelector } from 'react-redux';
import { addHistory } from '@/pages/store/historySlice'
//api呼叫用
import axios from 'axios'


export default function VideoDetail() {
  const auth = useAuthGuard()//路由守衛直接掛在第一行
  //抓取memberID
  const member_id = useSelector((state) => state.user.user.member_id) 
  const [detailvedio, setDetailvedio] = useState(null); 
  const router = useRouter()
  const { vid } = router.query

  //宣告rexu存儲
  const dispatch = useDispatch();

  useEffect(() => {
    async function getvedioDetail() {
      if (vid) {
        const urlapi = `http://localhost:3005/api/getvedioDetail?videoID=${vid}`
        const response = await fetch(urlapi)
        const res = await response.json()
        const vedioItem = res.videoDetail[0]
        setDetailvedio(vedioItem)
        
        //要存入redux的物件
        const historyData = {
          VideoID: vid,
          watchdate: new Date().toISOString(),
          Title: vedioItem.Title,
          Description: vedioItem.Description,
          vidthumbnail: vedioItem.vidthumbnail,
          memberid:member_id,
        }
        //存入觀看紀錄redux
        dispatch(addHistory(historyData))
        //寫入資料庫  
        const historyRes = await axios.post('http://localhost:3005/api/postHistory',historyData );
      }
      
    }
    getvedioDetail()

  }, [vid],
    router.isReady)

  return (
    <>
      {detailvedio ? (
        <div>
          <div className='box5'>
            <VideoPlayer vidURL={detailvedio.vidURL} auth={auth} maxDuration={30} />
          </div>
          <div className='all container'>
            <div className="box3">
              <VideoDetailCard
                Title={detailvedio.Title}
                ReleaseDate={detailvedio.ReleaseDate}
                Description={detailvedio.Description}
                classname={detailvedio.classname}
                muscleName={detailvedio.muscleName}
              /> 
            </div>
            <div className="box4">
              <VideoRecomand />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <style jsx>{`
        .container {
          background-color: #f4f1f1;
          max-width: 100%;
          height: 100%;
        }

        .all {
          padding:0 200px 0 200px;
          display: flex;
        }

        .box3 {
          margin-top: 20px;
          padding-left: 100px;
        }

        .box5 {
          background-color:#f4f1f1;
          margin-top: 70px;
        }
      `}</style>
    </>
  )
}
