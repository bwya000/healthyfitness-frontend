import React, { useEffect, useState } from 'react';
import VideoRecomandSec from '@/components/video/video-recomand-sec'


export default function VideoRecomand() {
  const [dataVedio, setdataVedio] = useState([])

  useEffect(() => {
    async function getVedio() {
      const url = 'http://localhost:3005/api/getVedio';
      const response = await fetch(url);
      const res = await response.json();
      // 使用 Fisher-Yates 随機洗牌算法
      const shuffledData = [...res.video];
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }

      // 截取前4條數據
      const limitedData = shuffledData.slice(0, 4);
      setdataVedio(limitedData);
    }
    getVedio();
  }, []);

  return (
    <>
      <div>
        <div className="content">
          <p className="text">為您推薦</p>
          
          {dataVedio.map((video) => (
            <div key={video.VideoID}>
              <VideoRecomandSec
                VideoID={video.VideoID}
                Title = {video.Title }
                muscleName = {video.muscleName }
                Description = {video.Description }
                vidthumbnail = {video.vidthumbnail} />
              </div>
            ))}
          </div>
      </div>
      <style jsx>{`
        .content {
          width:700px;
          height:950px;
          margin-top: 50px;
          margin-left: 40px;
          margin-bottom: 20px;
          background-color:#ECE9E9;
          border-Radius:30px;
        }

        .text {
          padding:20px 20px 0 70px;
          font-size: 35px;
          color: #4b4b4b;
        }
      `}</style>
    </>
  )
}
