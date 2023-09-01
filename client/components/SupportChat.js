// SupportChat.js
import { Widget, addUserMessage,addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import EmojiPicker from 'emoji-picker-react';//emoji

const SupportChat = () => {


  const user = useSelector((state)=>state.user.user)
  const [socket, setSocket] = useState(null);
  const [logo, setLogo] = useState(null);

  //emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleNewUserMessage = (newMessage) => {
    if (socket) {
      const messageObject = {
        name: '客服',
        message: newMessage
      };
      socket.send(JSON.stringify(messageObject));
    }
  };

  useEffect(() => {
    const inputlogo = `http://localhost:3000/images/members-images/${user.avatarname}`
    setLogo(inputlogo)
    const newSocket = new WebSocket('ws://localhost:3001/support'); // 使用 /support 连接到后端
    
    newSocket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });
    
    newSocket.addEventListener('message', (event) => {
      console.log(`Received: ${event.data}`);
      addResponseMessage(event.data);
    });
    
    newSocket.addEventListener('close', () => {
      console.log('WebSocket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <>
    <Widget 
      handleNewUserMessage={handleNewUserMessage}
      title="廠商"
      subtitle="買家訊息"
      profileAvatar={logo}
      emojis={toggleEmojiPicker}
    />
      {/* emoji */}
      {showEmojiPicker && (
        <EmojiPicker onClick={toggleEmojiPicker}/>
      )}
    </>

  );
};

export default SupportChat;

