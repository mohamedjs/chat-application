import React, { useEffect, useRef, useState } from 'react';
import { Send, AttachFile, Mic, Phone, VideoCall, EmojiEmotions, ArrowBack, Search, AccountCircle } from '@mui/icons-material';

const SampleChat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there! 😊', time: '02:11 AM', sender: 'you' },
    { text: 'Hello!', time: '02:12 AM', sender: 'me' },
    { text: 'How are you doing?', time: '02:12 AM', sender: 'you' },
    { text: 'I am fine, thanks!', time: '02:13 AM', sender: 'me' },
    { text: 'What about you?', time: '02:14 AM', sender: 'you' },
    { text: 'I am also fine, thanks!', time: '02:15 AM', sender: 'me' },
    { text: 'Cool, thanks!', time: '02:16 AM', sender: 'you' },
    { text: 'You are welcome!', time: '02:17 AM', sender: 'me' },
    { text: 'See you later!', time: '02:18 AM', sender: 'you' },
    {
      text:
        'I was wondering if you could help me with something. I am trying to learn React Hooks and Redux. Do you have any good resources?',
      time: '02:19 AM',
      sender: 'you',
    },
  ]);

  const [threads] = useState([
    {
      user: 'mohamed ahmed',
      lastMessage: 'How are you doing?',
      time: '02:12 AM',
    },
    {
      user: 'Sara Smith',
      lastMessage: 'See you tomorrow!',
      time: '01:00 PM',
    },
    {
      user: 'Ali Khan',
      lastMessage: 'What’s the update? 🚀',
      time: '12:45 PM',
    },
    {
      user: 'Emily Rose',
      lastMessage: 'Okay, thanks!',
      time: '11:30 AM',
    },
    {
      user: 'Emily Rose',
      lastMessage: 'Okay, thanks!',
      time: '11:30 AM',
    },
  ]);

  const messagesEndRef = useRef(null);
  const [showUserList, setShowUserList] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Track theme
  const [isSettingsOpen, setIsSettingsOpen] = useState(true); // Control for settings popup
  const [lastSeen, setLastSeen] = useState('yes'); // Track last seen option

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const newMessage = {
      text: 'This is a new message!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'you',
    };
    setMessages([...messages, newMessage]);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const toggleSettingsPopup = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className={`flex h-screen text-white ${isDarkTheme ? 'bg-[#0d0c22]' : 'bg-white'}`}>
      {/* Sidebar */}
      <div
        className={`w-1/4 shadow-[0px_1px_10px_#310141] p-4 md:block ${showUserList ? 'block' : 'hidden'} ${
          isDarkTheme ? 'bg-[#080715]' : 'bg-[#f5f5f5]'
        }`}
      >
        <div className="flex items-center p-4 mb-8">
          <img
            src="https://via.placeholder.com/40" // Placeholder for profile image
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <h2 className={`text-sm font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Georgianna Rohan</h2>
            <p className="text-xs text-[#8e68b4]">PHP Developer</p>
          </div>
        </div>

        {/* Labels */}
        <div className="mb-4">
          <div className="flex justify-around text-[#8e68b4] text-sm mb-2">
            <button className="hover:text-white">All</button>
            <button className="hover:text-white">Unread</button>
            <button className="hover:text-white">Read</button>
            <button className="hover:text-white">Group</button>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full text-sm p-3 rounded-lg outline-none ${isDarkTheme ? 'bg-[#0d0c22] text-white' : 'bg-[#e0e0e0] text-black'}`}
            />
            <Search className={`absolute top-1/2 right-3 transform -translate-y-1/2 ${isDarkTheme ? 'text-[#8e68b4]' : 'text-[#000]'}`} />
          </div>
        </div>

        {/* User Threads */}
        <div className="space-y-4">
          {threads.map((thread, index) => (
            <div
              key={index}
              className={`flex items-center rounded-lg p-3 cursor-pointer hover:bg-[#310141] transition ${
                isDarkTheme ? 'bg-[#0d0c22]' : 'bg-[#f0f0f0]'
              }`}
            >
              <div className="flex-shrink-0 bg-[#8e68b4] w-10 h-10 rounded-full flex items-center justify-center text-sm text-white">
                {thread.user.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 flex-1">
                <p className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>{thread.user}</p>
                <p className="text-[#8e68b4] text-xs truncate">{thread.lastMessage}</p>
              </div>
              <p className="text-[#8e68b4] text-xs">{thread.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className={`flex-1 flex flex-col ${isDarkTheme ? 'bg-[#0d0c22]' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-4 flex items-center justify-between relative ${isDarkTheme ? 'bg-[#080715]' : 'bg-[#f5f5f5]'}`}>
          {/* Back Button: Visible on small screens */}
          <button
            onClick={() => setShowUserList(true)}
            className={`block md:hidden mr-3 ${isDarkTheme ? 'text-[#8e68b4]' : 'text-[#000]'}`}
          >
            <ArrowBack className="text-2xl" />
          </button>

          {/* User Details */}
          <div className="relative flex items-center">
            <AccountCircle className={`text-[#8e68b4] mr-3 text-4xl ${isDarkTheme ? '' : 'text-black'}`} />
            <div>
              <h2 className={`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`} onClick={toggleSettingsPopup}>
                Georgianna Rohan
              </h2>
              <p className="text-sm text-[#8e68b4]">last seen at 02:00 AM</p>
            </div>
          </div>

          {/* Call Buttons */}
          <div className="flex space-x-3">
            <div className={`bg-[#310141] text-white p-3 rounded-full ${isDarkTheme ? '' : 'bg-[#bdbdbd]'}`}>
              <Phone className={`text-xl ${isDarkTheme ? 'text-white' : 'text-black'}`} />
            </div>
            <div className={`bg-[#310141] text-white p-3 rounded-full ${isDarkTheme ? '' : 'bg-[#bdbdbd]'}`}>
              <VideoCall className={`text-xl ${isDarkTheme ? 'text-white' : 'text-black'}`} />
            </div>
          </div>
        </div>

        {/* Settings Popup */}
        {isSettingsOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
              <button
                onClick={toggleSettingsPopup}
                className="absolute top-2 right-2 text-black text-xl"
              >
                X
              </button>
              <h3 className="font-bold text-lg mb-4">Georgianna Rohan</h3>

              {/* Theme Dropdown */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Theme:</label>
                <select
                  className="w-full p-2 bg-gray-200 rounded-lg"
                  value={isDarkTheme ? 'dark' : 'light'}
                  onChange={() => toggleTheme()}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              {/* Last Seen Dropdown */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Last Seen:</label>
                <select
                  className="w-full p-2 bg-gray-200 rounded-lg"
                  value={lastSeen}
                  onChange={(e) => setLastSeen(e.target.value)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.sender === 'me' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`${
                    message.sender === 'me' ? 'bg-[#310141]' : 'bg-[#080715]'
                  } text-sm text-white p-3 rounded-md max-w-xs break-words`}
                >
                  {message.text}
                </div>
                <p className="text-xs text-[#8e68b4] mt-1">{message.time}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className={`p-4  flex items-center space-x-3 ${isDarkTheme ? 'bg-[#080715]' : 'bg-[#f5f5f5]'}`}>
          <button className={`text-[#8e68b4] hover:text-white ${isDarkTheme ? 'text-white' : 'text-black'}`}>
            <AttachFile className="h-6 w-6" />
          </button>
          <button className={`text-[#8e68b4] hover:text-white ${isDarkTheme ? 'text-white' : 'text-black'}`}>
            <EmojiEmotions className="h-6 w-6" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className={`flex-1 p-3 rounded-lg outline-none ${isDarkTheme ? 'bg-[#0d0c22] text-white' : 'bg-[#e0e0e0] text-black'}`}
          />
          <button className={`text-[#8e68b4] hover:text-white ${isDarkTheme ? 'text-white' : 'text-black'}`}>
            <Mic className="h-6 w-6" />
          </button>
          <button
            className="text-green-500 hover:text-white ml-2"
            onClick={sendMessage}
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleChat;
