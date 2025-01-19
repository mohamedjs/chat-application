import { Message } from './index';

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({ messages, messagesEndRef }: ChatMessagesProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-background">
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
                message.sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              } p-3 rounded-lg max-w-xs break-words`}
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