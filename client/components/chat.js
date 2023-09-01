// VisitorChat.js
import { Widget, addResponseMessage } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import EmojiPicker from 'emoji-picker-react' //emoji
import { useState } from 'react'

const chat = () => {
  const user = useSelector((state) => state.user.user)
  const [socket, setSocket] = useState(null)
  const [logo, setLogo] = useState(null)

  //emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleNewUserMessage = (newMessage) => {
    if (socket) {
      const messageObject = {
        name: user.name,
        message: newMessage,
      }
      socket.send(JSON.stringify(messageObject))
    }
  }
  useEffect(() => {
    // 當用戶第一次造訪此網頁,執行歡迎
    const visitedBefore = localStorage.getItem('visitedSupportChatPage')
    if (!visitedBefore) {
      const firstView = `歡迎來到
      HEALTHY FINESS
      準備好迎接全新的你!
      🧘‍♀[挑選最佳裝備](http://localhost:3000/product)
      🏋‍♀[發現健身秘籍](http://localhost:3000/video/videoList)
      `
      // 首次拜訪
      addResponseMessage(firstView)
      //會員首次造訪
      if (user.name) {
        const memberView = `${user.name}歸來
        正如驕陽再次升起
        讓我們一同在健康的道路上繼續前行。
        `
        addResponseMessage(memberView)
      }
      localStorage.setItem('visitedSupportChatPage', 'true')
    }
    const inputlogo = `http://localhost:3000/images/support.svg`
    setLogo(inputlogo)
    const newSocket = new WebSocket('ws://localhost:3001/visitor') // 使用 /visitor 連接到後端

    newSocket.addEventListener('open', () => {
      console.log('WebSocket connected')
    })

    //接收回覆的訊息
    newSocket.addEventListener('message', (event) => {
      addResponseMessage(event.data)
    })
    newSocket.addEventListener('close', () => {
      console.log('WebSocket disconnected')
    })
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title={`HEALTHY FITNESS`}
        subtitle={user.name ? user.name : '您目前的身分-訪客'}
        profileAvatar={logo}
        emojis={toggleEmojiPicker}
      />

      {/* emoji */}
      {showEmojiPicker && <EmojiPicker onClick={toggleEmojiPicker} />}
    </>
  )
}

export default chat
