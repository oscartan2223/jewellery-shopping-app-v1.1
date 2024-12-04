import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import './LiveChat.css';
import { FaArrowDown, FaImage, FaMicrophone } from 'react-icons/fa';

const socket = io('http://localhost:3000'); // adjust to backend port

const LiveChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioClick, setAudioClick] = useState(false);
  const [closeChat, setCloseChat] = useState(false);

  // Send a message
  const sendMessage = () => {
    if (messageText) {
      socket.emit('message', { text: messageText });
    }
    if (imageFile) {
      // Handle image upload, if any
      const imageUrl = URL.createObjectURL(imageFile); // For local testing or you can upload to a server
      socket.emit('message', { image: imageUrl });
      setImageFile(null);  // Clear image after sending
    }
    setMessageText('');
  };

  // Receive messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    const exampleMessage = [
      { currentRole: true, text: "Testing", datetime: "23/12/2020 14:59pm" },
      { currentRole: false, text: "Works", datetime: "23/12/2020 14:59pm" },
      { currentRole: true, text: "Products?", datetime: "23/12/2020 14:59pm" },
      { currentRole: false, image: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg", datetime: "23/12/2020 15:00pm" },
      { currentRole: false, audio: "/sample.mp3", datetime: "24/12/2020 9:00am" },
    ];
    setMessages(exampleMessage);
  }, []);

  const handleImageUpload = () => {
    // Open file input dialog
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImageFile(file);
      }
    };
    fileInput.click();
  };

  const handleAudioRecord = () => {

  };

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 1200);
    setCloseChat(!closeChat);
  };

  return (
    <div className={`chat-room ${closeChat ? 'close-animation' : ''}`}>
      {!closeChat &&
        <>
          <div className="chat-fragment-1" />
          <div className="chat-fragment-2" />
          <div className="chat-fragment-3" />
          <div className="chat-fragment-4" />
        </>
      }
      <div className="chat-heading">
        <label>Chat</label>
        <FaArrowDown className="chat-collapse" onClick={handleClose} />
      </div>
      <div className="message-container hide-scroll-container">
        {/* Render the chat messages */}
        {messages.map((message, index) => {
          return (
            <div key={index} className={`message ${message.currentRole ? 'sent' : 'received'}`}>
              <div className="message-content">
                {message.text && <p>{message.text}</p>}
                {message.image && <img className="chat-image" onClick={() => window.open(message.image, '_blank')} src={message.image} alt="image" />}
                {message.audio && (
                  <audio controls>
                    <source src={message.audio} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
              <div className="message-time">{message.datetime}</div>
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="message-input-container">
        <div className="message-input">
          <FaImage onClick={handleImageUpload} className="message-input-icon" />
          <FaMicrophone onClick={handleAudioRecord} className="message-input-icon" />
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
