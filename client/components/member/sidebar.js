import React from 'react'
import Link from 'next/link'
//redux用
import { useState, useSelector, useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'

export default function SideBar() {
  const user_Data = useSelector((state) => state.user.user)
  const { data: userGoogle } = useSession()
  // const userAvatar = userGoogle ? userGoogle.user.image : `http://localhost:3000/images/members-images/${user_Data.avatarname}`;

  //const userAvatar = userGoogle ? userGoogle.user.image : (user_Data?.avatarname ? `http://localhost:3000/images/members-images/${user_Data.avatarname}` : `http://localhost:3000/images/members-images/avatar.png`);

  return (
    <>
      <div>
        <h3 className="mt-4 mb-4 ">
          <img
            src={
              userGoogle?.user?.image ||
              (user_Data.avatarname
                ? `http://localhost:3000/images/members-images/${user_Data.avatarname}`
                : `http://localhost:3000/images/members-images/avatar.png`)
            }
            style={{
              width: '50px', // 設定圖片寬度
              height: '50px', // 設定圖片高度
              borderRadius: '50%', // 將圖片變成正圓形
            }}
            className="me-5"
          />
          {user_Data.name || (userGoogle ? userGoogle.user.name : '')}
        </h3>
        <aside className="d-flex justify-content-center">
          <nav className="nav flex-column">
            <Link
              className="nav-link"
              aria-current="page"
              href="./edit-profile"
            >
              <p className="ms-4">
                <i
                  className="fa-regular fa-pen-to-square"
                  style={{ marginRight: '12px' }}
                ></i>
                個人資料修改
              </p>
            </Link>
            <Link className="nav-link" href="./favorite-product">
              <p className="ms-4">
                <i
                  className="fa-solid fa-bookmark"
                  style={{ marginRight: '17px' }}
                ></i>
                收藏商品
              </p>
            </Link>
            <Link className="nav-link" href="./favorite-video">
              <p className="ms-4">
                <i
                  className="fa-solid fa-video "
                  style={{ marginRight: '10px' }}
                ></i>
                收藏影片
              </p>
            </Link>
            <Link className="nav-link " href="./order-list">
              <p className="ms-4">
                <i
                  className="fa-solid fa-list "
                  style={{ marginRight: '14px' }}
                ></i>
                購買清單
              </p>
            </Link>
            <Link className="nav-link" href="/record/record-index">
              <p className="ms-4">
                <i
                  className="fa-solid fa-note-sticky"
                  style={{ marginRight: '14px' }}
                ></i>
                健康日誌
              </p>
            </Link>
            <Link className="nav-link" href="/logout">
              <p className="ms-4">
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ marginRight: '12px' }}
                ></i>
                登出
              </p>
            </Link>
          </nav>
        </aside>
      </div>

      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

          p {
            font-size: 20px;
            color: #777777;
          }
          p:hover {
            color: #ea6f2a;
            border-left: 5px solid #ea6f2a;
            padding-left: 6px;
          }
        `}
      </style>
    </>
  )
}
