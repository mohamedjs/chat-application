import React from "react";

const VerificationCode = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080715]">
      <div className="w-full max-w-sm text-center">
        {/* Emoji */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-6xl">😉</div>
        </div>

        {/* Phone Number & Description */}
        <p className="text-white text-lg font-medium mb-2">+20112310567</p>
        <p className="text-gray-400 text-sm mb-8">
          We’ve sent the code to the Telegram app on your other device.
        </p>

        {/* Code Input */}
        <div className="mb-6">
          <label className="sr-only">Code</label>
          <input
            type="text"
            placeholder="Code"
            className="w-full bg-[#0d0c22] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8e68b4]"
          />
        </div>

        {/* Next Button */}
        <button className="w-full bg-[#8e68b4] hover:bg-[#6b4f8e] text-white py-3 rounded-lg font-semibold flex items-center justify-center transition">
          NEXT
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VerificationCode;
