import React, { useState } from "react";
import DocIcon from "../assets/doc_icon.png";
import PdfIcon from "../assets/pdf_icon.png";
import Github from "../assets/github_icon.png";
import { Link } from "react-router-dom";

const PROFILES = [
  {
    name: "Lê Văn Thiện",
    email: "thienlv.b21cn687@stu.pti.edu.vn",
    phone: "0123456789",
    address: "Vĩnh Tường",
    avatar:
      "https://matdash-angular-free.netlify.app/assets/images/profile/user-1.jpg",
  },
  {
    name: "Nguyễn Thị Cẩm Tú",
    email: "tuntc.b21cn752@stu.ptit.edu.vn",
    phone: "0987654321",
    address: "Vĩnh Tường",
    avatar:
      "https://matdash-angular-free.netlify.app/assets/images/profile/user-2.jpg",
  },
];

const UserProfile = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(
    parseInt(localStorage.getItem("currentUserIndex"), 10) || 0
  );

  const handleSwitchUser = (index) => {
    setCurrentProfileIndex(index);
    localStorage.setItem("currentUserIndex", index.toString());
    window.dispatchEvent(new Event("currentUserIndexUpdated"));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROFILES.map((profile, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-6 relative"
          >
            {currentProfileIndex === index && (
              <div className="absolute top-4 right-4">
                <svg
                  className="w-6 h-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href="https://github.com/nghilonganh00/iot-app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Github} alt="Github" className="size-8" />
                  </a>
                  <img src={DocIcon} alt="Doc API" className="size-8" />
                  <img src={PdfIcon} alt="PDF" className="size-8" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={profile.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={profile.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={profile.phone}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={profile.address}
                  />
                </div>
              </div>
            </div>

            <button
              className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#635bff] rounded-md shadow-sm"
              onClick={() => handleSwitchUser(index)}
            >
              Sử dụng tài khoản này
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
