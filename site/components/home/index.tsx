'use client'

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import SettingsPopup from './SettingsPopup';
import ChatSidebar from './ChatSidebar';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import useWindowSize from '@/hooks/useWindowSize';

export interface Message {
  text: string;
  time: string;
  sender: 'me' | 'you';
}

export interface Thread {
    id: number;
    user: string;
    lastMessage: string;
    time: string;
    unread: number;
}

const Chat = () => {
  const { width } = useWindowSize();
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi there! 😊', time: '02:11 AM', sender: 'you' },
    { text: 'Hey, how are you?!', time: '02:12 AM', sender: 'me' },
    { text: 'Hello!', time: '02:12 AM', sender: 'you' },

    { text: 'The meeting is scheduled for tomorrow!', time: '02:12 AM', sender: 'me' },

    { text: 'Thanks for your help!', time: '02:12 AM', sender: 'you' },

    // ... other initial messages
  ]);

  const [threads] = useState<Thread[]>([
    {
        id: 1,
        user: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
        unread: 2
      },
      {
        id: 2,
        user: 'Alice Smith',
        lastMessage: 'The meeting is scheduled for tomorrow',
        time: '09:45 AM',
        unread: 0
      },
      {
        id: 3,
        user: 'Bob Johnson',
        lastMessage: 'Thanks for your help!',
        time: 'Yesterday',
        unread: 1
      },
      {
        id: 4,
        user: 'Emma Wilson',
        lastMessage: 'Please review the document',
        time: 'Yesterday',
        unread: 0
      }
    // ... other threads
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showUserList, setShowUserList] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useTheme();
  const [activeThreadId, setActiveThreadId] = useState(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hide sidebar automatically when screen is small and chat is selected
  useEffect(() => {
    if (width < 768 && activeThreadId) {
      setShowUserList(false);
    }
  }, [activeThreadId, width]);

  // Show sidebar automatically when screen becomes large
  useEffect(() => {
    if (width >= 768) {
      setShowUserList(true);
    }
  }, [width]);

  // Fix for mobile viewport height
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  const sendMessage = (text: string) => {
    const newMessage = {
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: (messages.length % 2 == 0 ? 'you':'me') as const,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex bg-background text-foreground shadow-2xl h-[100vh] h-[calc(var(--vh,1vh)*100)]">
      <ChatSidebar 
        threads={threads}
        showUserList={showUserList}
        setShowUserList={setShowUserList}
        activeThreadId={activeThreadId}
        setActiveThreadId={setActiveThreadId}
      />

      {(!showUserList || width >= 768) && (
        <div className="flex-1 flex flex-col min-h-0">
          <ChatHeader 
            showUserList={showUserList}
            setShowUserList={setShowUserList}
            setIsSettingsOpen={setIsSettingsOpen}
            isMobile={width < 768}
          />

          <ChatMessages 
            messages={messages}
            messagesEndRef={messagesEndRef}
          />

          <ChatInput onSendMessage={sendMessage} />
        </div>
      )}

      {isSettingsOpen && (
        <SettingsPopup onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

export default Chat;
