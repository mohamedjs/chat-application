import { ArrowLeft, Phone, Video } from 'lucide-react';
import BasicButton from '../master/buttons/BasicButton';

interface ChatHeaderProps {
  showUserList: boolean;
  setShowUserList: (show: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const ChatHeader = ({ 
  showUserList, 
  setShowUserList, 
  setIsSettingsOpen,
  isMobile 
}: ChatHeaderProps) => {
  return (
    <div className="p-4 flex items-center justify-between bg-card border-b border-border shadow-md shadow-primary/5">
      {isMobile && (
        <button
          onClick={() => setShowUserList(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}

      <div className="flex items-center" onClick={() => setIsSettingsOpen(true)}>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          G
        </div>
        <div className="ml-3">
          <h2 className="font-bold">Georgianna Rohan</h2>
          <p className="text-sm text-muted-foreground">last seen at 02:00 AM</p>
        </div>
      </div>

      <div className="flex gap-2">
        <BasicButton variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </BasicButton>
        <BasicButton variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </BasicButton>
      </div>
    </div>
  );
};

export default ChatHeader; 