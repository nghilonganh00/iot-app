import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Activity,
  AlignJustify,
  Bell,
  Home,
  Menu,
  NotebookText,
  Settings,
  X,
} from "lucide-react";
import UserIcon from "../assets/user.jpg";

const TABS = [
  { icon: Home, link: "/dashboard", label: "Dashboard" },
  { icon: Activity, link: "/data-sensors", label: "Data Sensors" },
  { icon: NotebookText, link: "/action-history", label: "Action History" },
];

const Layout = () => {
  const [isExpandMenu, setExpandMenu] = useState(true);
  const [isOpenMenu, setOpenMenu] = useState(false);

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
        className="bg-white text-white flex items-center justify-end px-8 gap-2"
        style={{ gridArea: "header" }}
      >
        <span
          className="relative hover:cursor-pointer"
          onClick={() => setOpenMenu(!isOpenMenu)}
        >
          <img src={UserIcon} width="40" className="rounded-full" />

          {isOpenMenu && (
            <div className="absolute top-10 right-0 shadow-2xl border pt-2 bg-white z-50 py-2">
              <div className="flex items-center justify-between gap-5 px-3 py-3 hover:bg-slate-100 hover:cursor-pointer">
                <div className="text-sm text-gray-800 min-w-24">My profile</div>
              </div>
            </div>
          )}
        </span>
      </header>

      <nav
        className="bg-white text-gray-600 py-2"
        style={{ gridArea: "navbar" }}
      >
        <div className={`flex items-center justify-end px-4 w-full`}>
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
              <div className="px-4">
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    `ease-in-out duration-300 flex items-center justify-start gap-2 pl-4 ${
                      isExpandMenu ? "pr-16" : "pr-4"
                    } py-2.5 rounded-xl  ${
                      isActive
                        ? " bg-[#635bff] text-white shadow"
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
