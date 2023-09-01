import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';

const VideoClassCard = ({ Title, classname, vidthumbnail }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div>
          <Image
            className="card-img-top"
            src={`http://localhost:3000/images/video_image/${vidthumbnail}`}
            alt="vidthumbnail"
            width={330}
            height={200}
            style={{ borderRadius: '10px', overflow: 'hidden' }}
          />
        </div>
        <div className="card-body">
          <div>
            <div style={{ textDecoration: 'none' }}>
              <h2 className="card-title">{Title}</h2>
            </div>
            <p className="card-text">{classname}</p>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card-container {
            width: 100%;
            margin-bottom: 30px;
            display: flex; 
            flex-direction: column;
            }

          .card {
            width: 400px;
            height: 320px;
            box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.08),
          -4px -4px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: all 0.3s;
            cursor: pointer;
            box-sizing: border-box;
            border-radius: 10px;
            padding: 10px;
          }

          .card:hover{
            box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1),
          -4px -4px 12px rgba(0, 0, 0, 0.08);
        }

          .card-text{
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 1px;
            text-align:center;
            font-weight: normal;
            font-size: 14px;
            letter-spacing: 1.5px;
            color: #747474;
            margin-top: 15px;
            margin-bottom: -20px;
          }

          .card-title {
            font-family: 'Noto Sans TC', sans-serif;
            text-align:center;
            font-weight: bold;
            letter-spacing: 1px;
            font-weight: normal;
            font-size: 16px;
            color: #4F4C4C;
            margin-bottom: 5px; 
          }

          .card-body {
            flex: 1;
            display: flex;
            width: 100%; /* 設置寬度為 100% */
            flex-direction: column;
            justify-content: space-between;
            margin: 12px;
          }
        `}
      </style>
    </div>
  );
};

export default VideoClassCard;
