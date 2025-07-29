import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
  MessageCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "../ui";

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-colors w-full text-left hover:bg-gray-100 ${
        active ? "font-bold" : ""
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xl hidden xl:block">{label}</span>
    </button>
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div className="w-16 xl:w-64 h-screen sticky top-0 flex flex-col p-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 px-4">
          <MessageCircle className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold hidden xl:block">Echo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <SidebarItem icon={Home} label="Home" active />
        <SidebarItem icon={Search} label="Explore" />
        <SidebarItem icon={Bell} label="Notifications" />
        <SidebarItem icon={Mail} label="Messages" />
        <SidebarItem icon={Bookmark} label="Bookmarks" />
        <SidebarItem icon={User} label="Profile" />
        <SidebarItem icon={MoreHorizontal} label="More" />
      </nav>

      {/* Echo Button */}
      <div className="mb-4">
        <Button className="w-full xl:w-full w-12 h-12 xl:h-auto rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg">
          <span className="hidden xl:block">Echo</span>
          <MessageCircle className="h-6 w-6 xl:hidden" />
        </Button>
      </div>

      {/* User Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-100 w-full transition-colors"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">
              {user?.display_name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden xl:block text-left">
            <p className="font-semibold text-sm">{user?.display_name}</p>
            <p className="text-gray-500 text-sm">@{user?.username}</p>
          </div>
          <MoreHorizontal className="h-4 w-4 hidden xl:block ml-auto" />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2 min-w-48 z-50">
            <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded w-full text-left">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded w-full text-left text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out @{user?.username}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
