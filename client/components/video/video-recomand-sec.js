import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VideoRecomandSec({
  VideoID,
  Title,
  muscleName,
  Description,
  vidthumbnail,
}) {
  const router = useRouter()

  const handleButtonClick = () => {
    // 導航到商品詳情頁面，並傳遞 VideoID 作為參數
    router.push(`/video/${VideoID}`, undefined, { shallow: true, scroll: false }).then(() => {
    window.location.reload();
    });
  };
  return (
    <>
      <div>
        <a href="#" style={{ textDecoration: 'none' }}>
          <div className="view">
            <Image
              className="vidthumbnail"
              src={`http://localhost:3000/images/video_image/${vidthumbnail}`}
              alt="vidthumbnail"
              onClick={handleButtonClick}
              width={247}
              height={145}
              style={{
                borderRadius: '10px',
              }}
            />
            <div className="vid-info">
              <Link
                href="#"
                onClick={handleButtonClick}
                style={{ textDecoration: 'none' }}
              >
                <p className="title">{Title}</p>
              </Link>
              <p className="info-type">{muscleName}</p>
              <p className="info-desc">{Description}</p>
            </div>
          </div>
        </a>
      </div>
      <style jsx>{`
        .vid-info p {
          padding-left: 20px;
          margin-bottom: 5px;
        }

        .view {
          display: flex;
          align-items: center;
          margin-top: 50px;
          padding-left: 70px;
          margin-bottom: 20px;
        }

        .title {
          font-size: 16px;
          font-weight: bold;
          color: #e25d31;
          letter-spacing: 2px;
        }
        .info-type {
          font-size: 15px;
          color: #716b6b;
          letter-spacing: 1.5px;
        }

        .info-desc {
          font-size: 13px;
          color: #414141;
          letter-spacing: 2px;
        }

        .vid-info {
          width: 50%;
        }
      `}</style>
    </>
  )
}
