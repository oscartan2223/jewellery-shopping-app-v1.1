import React, { useState, useEffect, useRef } from 'react';
import { FaArrowDown, FaImage, FaMicrophone, FaPause, FaStop, FaPlay } from 'react-icons/fa';
import './LiveChat.css';

const LiveChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0); // Recording time in seconds
  const [volume, setVolume] = useState(0); // Volume level (0-255)
  const [closeChat, setCloseChat] = useState(false);
  
  const analyserRef = useRef(null); // For audio analyzer
  const intervalRef = useRef(null); // For recording time

  // Function to format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Get minutes part
    const remainingSeconds = seconds % 60; // Get seconds part
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // Format as mm:ss
  };

  const sendMessage = () => {
    if (messageText) {
      const newMessage = {
        currentRole: true,
        text: messageText,
        datetime: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    setMessageText('');
  };

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
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      const newMessage = {
        currentRole: true,
        image: imageUrl,
        datetime: new Date().toLocaleString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    fileInput.click();
  };

  const handleAudioRecord = () => {
    if (isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(intervalRef.current); // Stop the timer when stopped
    } else {
      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          setAudioStream(stream);
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          // Create an analyser node for real-time audio analysis
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256; // Defines the frequency bin size (adjust for different visualizations)
          analyserRef.current = analyser;

          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);

          // Store audio data in chunks
          recorder.ondataavailable = (e) => {
            setAudioChunks((prevChunks) => [...prevChunks, e.data]);
          };

          // When recording stops, create audio file URL
          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            setAudioChunks([]); // Reset the chunks
            stream.getTracks().forEach(track => track.stop()); // Stop all tracks to release resources
          };

          recorder.start();
          setIsRecording(true);
          setIsPaused(false);

          // Start recording time counter
          intervalRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
          }, 1000);
        })
        .catch((err) => {
          console.error('Error accessing microphone: ', err);
        });
    }
  };

  const handlePause = () => {
    if (isRecording && !isPaused) {
      mediaRecorder.pause();
      setIsPaused(true);
      clearInterval(intervalRef.current); // Stop the timer when paused
      setVolume(0); // Reset the volume to 0 when paused
    } else if (isRecording && isPaused) {
      mediaRecorder.resume();
      setIsPaused(false);
  
      // Start a new interval when resuming the recording
      intervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0); // Reset the recording time to 0 when stopped
      clearInterval(intervalRef.current); // Stop the timer when stopped

      // Create and send the audio message immediately
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const newMessage = {
        currentRole: true,
        audio: audioUrl,
        datetime: new Date().toLocaleString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setAudioChunks([]); // Reset the chunks
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 500);
    setCloseChat(!closeChat);
  };

  const updateVolume = () => {
    if (isRecording && !isPaused && analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
  
      // Get the average volume level
      const sum = dataArray.reduce((acc, value) => acc + value, 0);
      const averageVolume = sum / dataArray.length;
      setVolume(averageVolume);
    }
  
    requestAnimationFrame(updateVolume);
  };

  useEffect(() => {
    if (isRecording && !isPaused) {
      updateVolume(); // Start updating volume when recording is active
    } else {
      setVolume(0); // Reset volume to 0 when recording is paused
    }
  }, [isRecording, isPaused]);

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
        {messages.map((message, index) => (
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
        ))}
      </div>

      {/* Message input */}
      <div className="message-input-container">
        {!isRecording ? (
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
        ) : (
          <div className="message-input">
            {!isPaused ? <FaPause onClick={handlePause} className="message-input-icon" /> : <FaPlay onClick={handlePause} className="message-input-icon" />}
            <span className="recording-info">
              <span className="time">{formatTime(recordingTime)}</span> {/* Display the formatted recording time */}
              <div className="volume-bar">
                <div style={{ width: `${volume}%` }} className="volume-bar-inner"></div>
              </div>
            </span>
            <FaStop onClick={handleStop} className="message-input-icon m-0" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
