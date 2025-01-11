"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const DarkSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed left-[30px] bottom-[30px] z-[99] transform rotate-90 md:left-[10px] sm:left-[4px]">
      <ul className="flex items-center justify-center bg-background shadow-md border-2 border-border rounded-full">
        <li>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative text-xs font-medium uppercase tracking-wider flex flex-row-reverse items-center justify-center w-10 h-10 transition duration-400"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-foreground" />
            ) : (
              <Moon className="w-4 h-4 text-foreground" />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DarkSwitch;
