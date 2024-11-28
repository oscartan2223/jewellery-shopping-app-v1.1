import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // Send a message
  const sendMessage = () => {
    socket.emit('message', messageText);
    setMessageText('');
  };

  // Receive messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  // More code will go here

  return (
    <div className="chat-room">
    </div>
  );
}

export default LiveChat;