import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
//路由用
import { useRouter } from 'next/router'
//抓取redux值
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import styles from '../../../../styles/navbar.module.css'

export default function Navbar() {
  const [isNavbarVisible, setNavbarVisible] = useState(true)
  const shoppingcart = useSelector((state) => state.cart.shoppingcart)
  //抓取redux
  const user = useSelector((state) => state.user.user)
  const { data: userGoogle } = useSession()
  //console.log(userGoogle.user.id);
  const router = useRouter()

  const handleScroll = () => {
    const scrolled = window.scrollY

    if (scrolled > 0 && isNavbarVisible) {
      setNavbarVisible(false)
    } else if (scrolled === 0 && !isNavbarVisible) {
      setNavbarVisible(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isNavbarVisible])

  const goMember = (e) => {
    e.preventDefault() //阻止預設事件
    if (user.member_id || userGoogle) {
      router.push('http://localhost:3000/member/edit-profile')
    } else {
      router.push('http://localhost:3000/login')
    }
  }
  const numberOfItemsInCart = shoppingcart.length

  return (
    <>
      <div
        className={`All container-fluid ${
          isNavbarVisible ? '' : styles.fadeOut
        }`}
      >
        <div className={`nav-bar row ${isNavbarVisible ? '' : styles.fadeOut}`}>
          <header className="col-4">
            <Link href="/">
              <Image
                className="logo"
                src="http://localhost:3000/images/logo.png"
                alt="HealthyFitness"
                width={126}
                height={59}
                style={{
                  position: 'relative',
                  top: '6px',
                  left: '20px',
                }}
              />
            </Link>
          </header>

          <nav className="col-4">
            <ul className="list-unstyled" style={{ height: '100%' }}>
              <li className="active">
                <Link href="/" className={styles.linking}>
                  首頁
                </Link>
              </li>

              <li>
                <Link href="/product" className={styles.linking}>
                  商城
                </Link>
              </li>
              <li>
                <a href="/video/videoList" className={styles.linking}>
                  影音課程
                </a>
              </li>
              <li>
                <Link href="/record/record-index" className={styles.linking}>
                  健康日誌
                </Link>
              </li>
            </ul>
          </nav>
          <div className="col-2"></div>
          <div
            className="col-1"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {userGoogle || user.member_id ? (
              <div className="dropdown">
                <Link
                  className="btn dropBtn dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    alt="大頭貼"
                    src={
                      userGoogle?.user?.image ||
                      (user.avatarname
                        ? `http://localhost:3000/images/members-images/${user.avatarname}`
                        : `http://localhost:3000/images/members-images/avatar.png`)
                    }
                    onClick={goMember}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                  />
                </Link>
                <ul
                  className="dropdown-menu dropdownDiv "
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link
                      href="/member/edit-profile"
                      className={styles.dropdownLink}
                    >
                      編輯個人資料
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/member/favorite-product"
                      className={styles.dropdownLink}
                    >
                      收藏商品
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/member/favorite-video"
                      className={styles.dropdownLink}
                    >
                      收藏影片
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/member/order-list"
                      className={styles.dropdownLink}
                    >
                      購買清單
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link href="/logout" className={styles.dropdownLink}>
                      登出
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="#">
                <i className="fa-solid fa-circle-user" onClick={goMember}></i>
              </Link>
            )}
          </div>
          <div
            className="col-1"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Link href="/cart">
              <div style={{ height: '100%' }}>
                <div className="cart">
                  <i className="bi bi-cart-fill"></i>
                  {numberOfItemsInCart !== 0 && ( // 三元表達式
                    <span className="cart-badge">{numberOfItemsInCart}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}

      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
          @import url('https://fonts.googleapis.com/css2?family=Rambla&display=swap');
          @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css');
          /* 假設你已經定義了購物車圖示的樣式 */

          .cart {
            position: relative;
            left: 11px;
          }

          /* 圓點樣式 */
          .cart-badge {
            position: absolute;
            top: 17%;
            right: 15%;
            background-color: #e8e0e0;
            color: #000000;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.6);
          }

          .nav-bar {
            height: 70px;
            background-color: #414141;
          }
          .All {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 3000;
          }
          nav ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          ul li {
            font-family: 'Noto Sans TC', sans-serif;
          }

          .list-unstyled {
            list-style: none;
          }

          .fa-circle-user {
            color: #e25d31;
            font-size: 50px;
          }

          .cart {
            width: 80px;
            height: 100%;
            background-color: #e25d31;
          }

          .bi-cart-fill {
            position: absolute;
            margin-left: 20px;
            margin-top: 5px;
            color: #414141;
            font-size: 40px;
          }

          .dropBtn {
            padding: 10px;
            background-color: #777777;
          }

          .dropdown {
            background-color: #414141;
          }
          .dropdownDiv {
            background-color: #414141;
          }

          hr {
            color: #fff;
          }
        `}
      </style>
    </>
  )
}
