import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoClassPrice = ({ classprice }) => {
  return (
    <>
    <div className="discount">
      <p className="discount-1">現正優惠</p>
      <p className="price-1">NT$3,099</p>
      <p className="price-2">NT${classprice}</p>
    </div>
      <style jsx>
        {`
          .discount{
            font-family: 'Noto Sans TC', sans-serif;
            margin-top:10px;
          }
          .discount p {
            font-family: 'Noto Sans TC', sans-serif;
            margin-bottom: 5px;
          }

          .discount-1 {
            font-family: 'Noto Sans TC', sans-serif;
            font-weight:bold;
            font-size: 30px;
            color: #414141;
          }

          .price-1 {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 22px;
            color: #777777;
            text-decoration: line-through;
          }

          .price-2 {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 30px;
            font-weight:bold;
            color: #e25d31;
          }
        `}
      </style>
    </>
  );
};

export default VideoClassPrice;
