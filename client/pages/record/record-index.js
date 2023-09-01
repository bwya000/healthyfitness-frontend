import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Home from '@/public/img-record/home.png'
import Foodwhite from '@/public/img-record/food-white.png'
import Sportwhite from '@/public/img-record/sport-white.png'
import Personwhite from '@/public/img-record/person-white.png'
import Buttonbg from '@/public/img-record/button-bg.png'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import IndexLeft from '@/components/record/index-left'
import Indexright from '@/components/record/index-right'
import loadingGif from '@/public/img-record/loading.gif'

export default function RecordIndex() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 2000
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [])
  return (
    <>
      <div className="container-fluid p-0" style={{ marginTop: '70px' }}>
        <div className="row" style={{width: '100%'}}>
          <div className="col-1">
            {/* <!-- sidebar --> */}
            <div className="row sidebar-icon-position sidebar-height sidebar text-center p-0">
              <div className="col sidebar-icon-position-img ps-0">
                <Link href="record-index">
                  <Image
                    src={Home}
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '84px',
                      left: '67px',
                      zIndex: '2',
                    }}
                  />
                  <Image
                    src={Buttonbg}
                    className="sidebar-icon-bg"
                    style={{
                      position: 'absolute',
                      top: '17px',
                      left: '48px',
                      zIndex: '1',
                    }}
                    alt=""
                  />
                </Link>
              </div>
              <div className="col sidebar-icon-position-img ps-0">
                <Link href="foodrecord">
                  <Image src={Foodwhite} alt="" />
                </Link>
              </div>
              <div className="col sidebar-icon-position-img ps-0">
                <Link href="sportrecord">
                  <Image src={Sportwhite} alt="" />
                </Link>
              </div>
              <div
                className="col sidebar-icon-position-img ps-0"
                style={{ position: 'relative' }}
              >
                <Link href="bodyrecord">
                  <Image src={Personwhite} className="sidebar-icon" alt="" />
                </Link>
              </div>
            </div>
          </div>
          <style jsx>
            {`
              .sidebar {
                height: 92.5vh;
                width: 200px;
                background-color: #eb6100;
              }

              .logo-icon {
                width: 80%;
                height: 80%;
              }

              .sidebar-icon-position {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }

              .sidebar-icon-position-img {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }

              .sidebar-icon {
                position: absolute;
                top: 75px;
                left: 75px;
                z-index: 2;
              }

              .sidebar-icon-bg {
                position: absolute;
                top: 20px;
                left: 48px;
                z-index: 1;
              }

              {/* .chart_container {
                background-color: #eae8e8;
                padding: 20px 0;
                border-radius: 15px;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
              }

              .chart_container_white {
                background-color: #ffffff;
                padding: 20px 0;
                border-radius: 15px;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
              } */}
            `}
          </style>
          {loading ? (
            <div style={{position: 'absolute', width: '100px', height: '100px', top: '50%', left: '50%'}}>
              <Image src={loadingGif} alt="Loading" />
            </div>
          ) : (
            <>
              <IndexLeft />
              <Indexright />
            </>
          )}
        </div>
      </div>
    </>
  )
}
