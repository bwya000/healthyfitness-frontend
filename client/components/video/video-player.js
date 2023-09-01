import React, { useEffect, useState } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { Modal, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function VideoPlayer({ vidURL, auth }) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const handleButtonClick = () => {
    router.push(`/login`)
  }

  useEffect(() => {
    const player = new Plyr('#player-youtube', {
      autoplay: true,
      rel: 0,
      showinfo: 0,
    })

    player.on('timeupdate', (event) => {
      const currentTime = event.detail.plyr.currentTime
      const maxDuration = 30

      if (!auth && currentTime >= maxDuration) {
        player.pause()
        setShowModal(true)
      }
    })

    return () => {
      player.destroy()
    }
  }, [auth])

  return (
    <>
      <div className="container">
        <div id="player-youtube">
          <iframe src={vidURL} title="YouTube Video" allow="autoplay"></iframe>
        </div>
      </div>
      {/* 彈跳視窗 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} style={{zIndex:'4000'}}>
        <Modal.Header closeButton>
          <Modal.Title>請注意！</Modal.Title>
        </Modal.Header>
        <Modal.Body>您沒有權限觀看完整影片，請登入確認</Modal.Body>
        <Modal.Footer>
          {!auth && (
            <Button className="btn-primary" variant="primary" onClick={handleButtonClick}>
              立即登入
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
        .player-container {
          position:relative;
          left:350px;
          width:60%; /* 設定影片播放器寬度 */
        }
        #player-youtube {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
 
        
      `}</style>
    </>
  )
}
