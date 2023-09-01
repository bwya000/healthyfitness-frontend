import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavoriteVideo } from '@/pages/store/favoriteVideoSlice'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2

export default function FavoriteCard({
  VideoID,
  Title,
  muscleName,
  vidthumbnail,
}) {
  const dispatch = useDispatch()
  const member_id = useSelector((state) => state.user.user.member_id)

  const handleRemoveFavorite = async () => {
    dispatch(removeFavoriteVideo(VideoID))
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/removeFavoriteVideo/?member_id=${member_id}&VideoID=${VideoID}`
      )
      console.log(response.data.success)
      Swal.fire({
        icon: 'success',
        title: '移除成功',
        text: '影片已移除收藏！',
        confirmButtonColor: '#EA6F2A',
      })
    } catch (error) {
      console.error('Error removing from favorites:', error)
    }
  }

  return (
    <>
      <div className="card" style={{ width: '18rem', height: '18rem' }}>
        <Image
          src={`http://localhost:3000/images/video_image/${vidthumbnail}`}
          width={180}
          height={180}
          className="card-img-top"
          alt="..."
          style={{ borderRadius: '20px 20px 0 0' }}
        />
        <div className="card-body" style={{ position: 'relative' }}>
          <h5 className="card-text">{Title}</h5>
          <p className="card-text">{muscleName}</p>
          <button
            onClick={handleRemoveFavorite}
            style={{
              background: 'none',
              border: 'none',
              color: '#e25d31',
              cursor: 'pointer',
              position: 'absolute',
              bottom: '10px', // 距离底部的距离
              left: '50%', // 水平居中
              transform: 'translateX(-50%)', // 将按钮水平居中
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <i
              className="fa-solid fa-circle-minus"
              style={{ color: '#e25d31', fontSize: 20 }}
            />
            移除收藏
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            width: calc(
              33.33% - 20px
            ); /* Adjust the width based on your layout */
            position: relative;

            border-radius: 20px;
          }
          .remove-favorite {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            color: #e25d31;
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
          }

          .remove-favorite i {
            font-size: 18px;
          }
        `}
      </style>
    </>
  )
}
