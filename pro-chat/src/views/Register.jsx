import React from "react";
import Logo from "../components/login/Logo";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080715]">
      <div className="w-full max-w-sm text-center">
        {/* Chat Icon */}
        <div className="flex items-center justify-center mb-1">
            <Logo />
        </div>

        {/* Header */}
        <h1 className="text-white text-2xl font-semibold mb-4">Ratatouille</h1>
        <p className="text-gray-400 text-sm mb-8">
          Please confirm your country code and enter your phone number.
        </p>

        {/* Country Dropdown */}
        <div className="mb-4">
          <label className="block text-left text-[#8e68b4] text-sm mb-2">
            Countries
          </label>
          <div className="relative">
            <select className="w-full bg-[#0d0c22] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8e68b4]">
              <option value="Egypt">🇪🇬 Egypt +20</option>
              <option value="USA">🇺🇸 USA +1</option>
              <option value="India">🇮🇳 India +91</option>
              <option value="UK">🇬🇧 UK +44</option>
            </select>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="mb-6">
          <label className="block text-left text-[#8e68b4] text-sm mb-2">
            Phone
          </label>
          <input
            type="text"
            placeholder="+20"
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

export default Register;
