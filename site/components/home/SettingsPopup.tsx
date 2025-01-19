'use client'

import { X } from 'lucide-react';
import BasicButton from '../master/buttons/BasicButton';
import { useTheme } from 'next-themes';
import { useState } from 'react';

interface SettingsPopupProps {
  onClose: () => void;
}

const SettingsPopup = ({ onClose }: SettingsPopupProps) => {
  const { theme, setTheme } = useTheme();
  const [lastSeen, setLastSeen] = useState('yes');

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg relative w-80 border border-border">
        <BasicButton
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </BasicButton>

        <h3 className="font-bold text-lg mb-6">Settings</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Theme</label>
            <select
              className="w-full p-2 rounded-md bg-background border border-border"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last Seen</label>
            <select
              className="w-full p-2 rounded-md bg-background border border-border"
              value={lastSeen}
              onChange={(e) => setLastSeen(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup; 