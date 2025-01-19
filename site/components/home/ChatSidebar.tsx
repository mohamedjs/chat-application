import { Search } from 'lucide-react';
import BasicInput from '../master/inputes/BasicInput';
import { Thread } from './index';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  threads: Thread[];
  showUserList: boolean;
  setShowUserList: (show: boolean) => void;
  activeThreadId: number;
  setActiveThreadId: (id: number) => void;
}

const ChatSidebar = ({ 
  threads, 
  showUserList, 
  activeThreadId, 
  setActiveThreadId 
}: ChatSidebarProps) => {
  return (
    <div
      className={`w-full md:w-80 border-r border-border bg-card p-4 md:block 
      ${showUserList ? 'block' : 'hidden'}`}
    >
      {/* Profile Section */}
      <div className="flex items-center p-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          G
        </div>
        <div className="ml-4">
          <h2 className="text-sm font-bold">Georgianna Rohan</h2>
          <p className="text-xs text-muted-foreground">PHP Developer</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-around text-muted-foreground text-sm mb-4">
        {['All', 'Unread', 'Read', 'Group'].map((filter) => (
          <button
            key={filter}
            className="hover:text-foreground transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <BasicInput
          placeholder="Search..."
          icon={<Search className="h-4 w-4" />}
          size="sm"
        />
      </div>

      {/* Thread List */}
      <div className="space-y-2">
        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setActiveThreadId(thread.id)}
            className={cn(
              "flex items-center p-3 rounded-lg cursor-pointer transition-colors",
              "hover:bg-accent",
              activeThreadId === thread.id && "bg-accent/50 hover:bg-accent/50"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground relative">
              {thread.user.charAt(0).toUpperCase()}
              {thread.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground 
                  rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {thread.unread}
                </span>
              )}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-start">
                <p className={cn(
                  "text-sm font-medium",
                  thread.unread > 0 && "font-bold"
                )}>
                  {thread.user}
                </p>
                <p className={cn(
                  "text-xs text-muted-foreground",
                  thread.unread > 0 && "text-primary font-bold"
                )}>
                  {thread.time}
                </p>
              </div>
              <p className={cn(
                "text-xs text-muted-foreground truncate",
                thread.unread > 0 && "text-foreground font-medium"
              )}>
                {thread.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar; 