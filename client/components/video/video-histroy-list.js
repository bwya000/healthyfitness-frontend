import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const VideoHistoryList = ({ VideoID, Title, Description, watchdate, vidthumbnail }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`http://localhost:3000/video/${VideoID}`)
  };

  return (
    <div className="history-list-container">
      <div className="history">
        <a href="#" className="history-1" onClick={handleButtonClick}>
          <Image
            className="fitVideo"
            src={`http://localhost:3000/images/video_image/${vidthumbnail}`}
            alt="video"
            width={380}
            height={213}
            style={{
              marginRight: '50px',
              borderRadius: '10px',
            }}
          />
          <div className="text">
            <p className="title">{Title}</p>
            <p className="desc">{Description}</p>
            <div className='viewDate'>觀看日期 | {watchdate}</div>
          </div>
        </a>
      </div>

      <style jsx>
        {`
          .history-list-container {
            background-color:rgba(255,255,255,.3);
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
            padding: 40px;  
            border-Radius:30px;
          }

          .viewDate {
            color: #A2A4A9;
          }

          .history-1 {
            display: flex;
            text-decoration: none;
            margin-bottom: 40px;
          }

          .title {
            font-size: 22px;
            color: #ea6f2a;
            letter-spacing: 1.5px;
          }

          .desc {
            font-size: 16px;
            color: #777777;
            letter-spacing: 1.5px;
            white-space: normal;
          }

          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default VideoHistoryList;