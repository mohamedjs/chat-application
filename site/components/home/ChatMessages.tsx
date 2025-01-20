import { Message } from './index';

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({ messages, messagesEndRef }: ChatMessagesProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto min-h-0 bg-background shadow-inner overscroll-y-contain">
      <div className="space-y-4 h-full">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.sender === 'me' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`${
                message.sender === 'me'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10'
                  : 'bg-secondary text-secondary-foreground shadow-md'
              } p-3 rounded-lg max-w-[85%] sm:max-w-xs break-words transition-shadow hover:shadow-lg`}
            >
              {message.text}
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {message.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages; 