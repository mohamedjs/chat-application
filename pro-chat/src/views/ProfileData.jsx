import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";

const ProfileData = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#080715]">
      <div className="w-full max-w-sm text-center">
        {/* Profile Image Upload */}
        <div className="relative flex items-center justify-center mb-8">
          <label htmlFor="profile-upload" className="cursor-pointer">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="bg-[#8e68b4] w-20 h-20 rounded-full flex items-center justify-center">
                <AccountCircle className="text-white text-6xl" />
              </div>
            )}
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-medium mb-8">Profile Data</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name *"
              className="w-full bg-[#0d0c22] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8e68b4]"
            />
            <input
              type="text"
              placeholder="Last Name *"
              className="w-full bg-[#0d0c22] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8e68b4]"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address *"
            className="w-full bg-[#0d0c22] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8e68b4]"
          />
        </div>

        {/* Next Button */}
        <button className="mt-6 w-full bg-[#8e68b4] hover:bg-[#6b4f8e] text-white py-3 rounded-lg font-semibold flex items-center justify-center transition">
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

export default ProfileData;
