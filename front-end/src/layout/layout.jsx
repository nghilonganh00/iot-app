import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Activity,
  AlignJustify,
  Home,
  NotebookText,
  Settings,
  X,
} from "lucide-react";
import { PROFILES } from "../libs/profileData";

const TABS = [
  { icon: Home, link: "/dashboard", label: "Dashboard" },
  { icon: Activity, link: "/data-sensors", label: "Data Sensors" },
  { icon: NotebookText, link: "/action-history", label: "Action History" },
  // { icon: Home, link: "/dashboard2", label: "Dashboard" },
];

const Layout = () => {
  const [isExpandMenu, setExpandMenu] = useState(true);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const profileMenuRef = useRef(null);
  const currentUser = PROFILES[currentUserIndex];

  useEffect(() => {
    const savedCurrentUserIndex = localStorage.getItem("currentUserIndex");

    if (savedCurrentUserIndex) {
      setCurrentUserIndex(parseInt(savedCurrentUserIndex, 10));
    }

    const handleIndexUpdate = () => {
      const updatedIndex = localStorage.getItem("currentUserIndex");
      if (updatedIndex) {
        setCurrentUserIndex(parseInt(updatedIndex, 10));
      }
    };

    window.addEventListener("currentUserIndexUpdated", handleIndexUpdate);

    return () => {
      window.removeEventListener("currentUserIndexUpdated", handleIndexUpdate);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <div
      className="grid h-screen w-screen font-[roboto] bg-slate-100"
      style={{
        gridTemplateAreas: `"navbar header"
                            "navbar content"`,
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "60px 1fr",
      }}
    >
      <header
        className="bg-white flex items-center justify-end px-8 gap-2"
        style={{ gridArea: "header" }}
      >
        <div className="relative" ref={profileMenuRef}>
          <img
            src={
              currentUser.avatar ||
              "https://matdash-angular-free.netlify.app/assets/images/profile/user-1.jpg"
            }
            alt="User Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          />

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
              <div className="p-2 border-b max-h-40 overflow-auto">
                <p className="font-bold text-gray-800 truncate">
                  {currentUser.name || "Tên người dùng"}
                </p>
                <p className="text-gray-600 truncate">
                  {currentUser.email || "email@example.com"}
                </p>
              </div>
              <div className="py-1 border-b">
                <NavLink
                  to="/user-profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  My profile
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </header>

      <nav
        className="bg-white text-gray-600 py-2"
        style={{ gridArea: "navbar" }}
      >
        <div
          className={`flex items-center px-4 w-full ${
            isExpandMenu ? "justify-end" : "justify-center"
          }`}
        >
          <div
            className="p-2 rounded-full hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => setExpandMenu(!isExpandMenu)}
          >
            {isExpandMenu ? (
              <AlignJustify className="float-right text-[#635bff] size-8" />
            ) : (
              <X className="float-right text-[#635bff] size-8" />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center pt-2">
          <div className="space-y-2">
            {TABS.map((tab, index) => (
              <div className="px-4" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `ease-in-out duration-300 flex items-center justify-start gap-2 pl-4 ${
                      isExpandMenu ? "pr-16" : "pr-4"
                    } py-2.5 rounded-xl  ${
                      isActive
                        ? "bg-[#635bff] text-white shadow"
                        : "hover:bg-gray-100"
                    }`
                  }
                  to={tab.link}
                >
                  <tab.icon className="size-5 " strokeWidth={1.5} />
                  {isExpandMenu && (
                    <div className="font-medium">{tab.label}</div>
                  )}
                </NavLink>
              </div>
            ))}
          </div>

          <div className="mt-auto px-6 py-4 hover:cursor-pointer">
            <Settings className="h-6 w-6 text-white" />
          </div>
        </div>
      </nav>

      <main
        className="bg-white overflow-auto pr-6"
        style={{ gridArea: "content" }}
      >
        <div className="w-full h-full bg-slate-100 rounded-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
