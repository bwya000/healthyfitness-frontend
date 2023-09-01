import React, { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'

const VideoGallery = () => {
  const videoData = [
    {
      title: '20分鐘居家全身啞鈴訓練',
      videoUrl: '/video/20分鐘居家全身啞鈴訓練 1min.mp4',
      imageUrl: '/images/video_image/20分鐘居家全身啞鈴訓練【中級版】.jpeg',
    },
    {
      title: '15分鐘高強度全身肌肉徒手訓練',
      videoUrl: '/video/15分鐘高強度全身肌肉徒手訓練 1min.mp4',
      imageUrl:
        '/images/video_image/15分鐘高强度全身肌肉徒手訓練【中級版】.jpeg',
    },
    {
      title: '20分鐘居家高強度全身肌肉徒手訓練',
      videoUrl: '/video/20分鐘居家高強度全身肌肉徒手訓練 1min.mp4',
      imageUrl:
        '/images/video_image/20分鐘居家高强度全身肌肉徒手訓練【高級版】.jpeg',
    },
    {
      title: '5分鐘簡單全身熱身',
      videoUrl: '/video/5分鐘簡單全身熱身 1min.mp4',
      imageUrl: '/images/video_image/5分鐘簡單全身熱身.jpeg',
    },
    {
      title: '10分鐘腿部徒手訓練',
      videoUrl: '/video/10分鐘腿部徒手訓練 1min.mp4',
      imageUrl: '/images/video_image/10分鐘腿部徒手訓練.jpeg',
    },
  ]
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const currentVideo = videoData[currentVideoIndex]
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleVideoClick = (videoIndex) => {
    setCurrentVideoIndex(videoIndex)
    setIsPlaying(true) // Start playing the video when a new one is selected
  }

  useEffect(() => {
    // Watch for changes in the currentVideo and isPlaying states
    if (videoRef.current && isPlaying) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentVideo, isPlaying])

  return (
    <>
      <div>
        <div className="video-container">
          <div class="overlayText">
            <p id="topText">
              {' '}
              <br />
              現正播放 | {currentVideo.title} |{' '}
              <a href="/video/video-subscribe">立即訂閱</a>以觀看完整版
            </p>
          </div>
          <video controls poster="" className="video" ref={videoRef} >
            <source src={currentVideo.videoUrl} type="video/mp4" />
            <track default kind="captions" srcLang="en" />
          </video>
        </div>
        <div className="scrollBox">
          {videoData.map((video, index) => (
            <div key={index} className="box">
              <Image
                src={video.imageUrl}
                alt="Video Thumbnail"
                width={265}
                height={159}
              />
              <div className="box-content">
                <h6>{video.title}</h6>
                <button className="btn" onClick={() => handleVideoClick(index)}>
                  點擊試閱
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          #topText {
            font-family: 'Noto Sans TC', sans-serif;
            position: absolute;
            left:259px;
            padding-left:27px;
            width: 52%;
            height: 5%;
            background-color: #ccc;
            letter-spacing: 3px;
            color: #fff;
            font-size: 20px;
            z-index: 2;
            background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          }

          a {
            color: #ea6f2a;
          }
          .scrollBox {
            position:relative;
            left:-220px;
            float: right;
            width: 350px;
            height: 60vh;
            margin: 20px 5px;
            margin-top: -560px;
            overflow-y: scroll;
            background: #f4f1f1;
          }

          .container .video {
            float: left;
            width: 100%;
            height: 100%;
            margin: 25px 20px;
            border-radius: 10px;
          }
          video {
            padding-left:240px;
            width: 65%;
            height: 100%;
            outline: none;
          }

          .box {
            overflow: hidden;
            max-width: 400px;
            margin: 10px 10px;
            display: inline-block;
            position: relative;
            border-radius: 10px;
          }
          .box:hover {
            box-shadow: 0px 5px 20px 0px #121212;
          }

          .box img {
            width: 100%;
            display: block;
          }
          .btn {
            display: inline-block;
            text-decoration: none;
            background: #ea6f2a;
            color: #fff;
            padding: 0.5em 1.2em;
            margin-top: 0.8rem;
            margin-left: 10px;
            position: relative;
            transition: 0.2s ease-in-out;
            border-radius: 3px;
          }
          .btn:hover {
            box-shadow: 10px 15px 20px 0px #000000;
            transform: scale(1.3);
          }
          h3 {
            color: #fff;
            margin: 0 10px;
          }
          .box .box-content {
            position: absolute;
            top: 90%;
            width: 100%;
            height: 100%;
            color: #fff;
            text-align: center;
            opacity: 0;
            z-index: 2;
            transition: all 0.5s ease-in-out;
          }
          .box::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            opacity: 0;
            z-index: 1;
            transform: scaleY(0);
            transform-origin: 100% 100%;
            background: rgba(0, 0, 0, 0.73);
            transition: all 0.3s ease-in-out;
          }
          .box:hover .box-content {
            opacity: 1;
            top: 30%;
          }
          .box:hover::after {
            opacity: 1;
            transform: scaleY(1);
          }

          @media screen and (max-width: 768px) {
            video {
              display: none;
            }

            .scrollBox {
              display: none;
            }
          }
           {
            /* @media (max-width: 1310px) {
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              text-align: center;
            }
          }
          @media (max-width: 865px) {
            .container .video {
              width: 95%;
              float: none;
            }
            .container .scrollBox {
              float: none;
            }
          }
          @media (max-width: 775px) {
            .container .video {
              width: 95%;
            }
          }
          @media (max-width: 500px) {
            .container .video {
              width: 97%;
            }
          } */
          }
        `}
      </style>
    </>
  )
}

export default VideoGallery