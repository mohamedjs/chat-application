'use client'
import { Paperclip, Smile, Mic, Send } from 'lucide-react';
import BasicButton from '../master/buttons/BasicButton';
import BasicInput from '../master/inputes/BasicInput';
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-card border-t border-border">
      <div className="flex items-center gap-2">
        <BasicButton variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </BasicButton>
        <BasicButton variant="ghost" size="icon">
          <Smile className="h-5 w-5" />
        </BasicButton>
        
        <BasicInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />

        <BasicButton variant="ghost" size="icon">
          <Mic className="h-5 w-5" />
        </BasicButton>
        <BasicButton 
          variant="default"
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </BasicButton>
      </div>
    </div>
  );
};

export default ChatInput; 