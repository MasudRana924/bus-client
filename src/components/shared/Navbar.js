import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Bus,
  MapPin,
  User,
  LogOut,
  ChevronDown,
  Bell,
  Check,
} from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your bus ticket is confirmed", time: "2m ago", read: false },
    { id: 2, message: "Seat 12 booked successfully", time: "10m ago", read: false },
    { id: 3, message: "Payment received", time: "1h ago", read: false },
    { id: 4, message: "Upcoming trip reminder", time: "3h ago", read: false },
    { id: 5, message: "Discount offer available", time: "5h ago", read: false },
    { id: 6, message: "New route added", time: "1d ago", read: false },
    { id: 7, message: "Profile updated", time: "2d ago", read: false },
    { id: 8, message: "Referral bonus", time: "3d ago", read: false },
    { id: 9, message: "System maintenance", time: "4d ago", read: false },
    { id: 10, message: "Welcome aboard!", time: "5d ago", read: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center lg:w-1/2 lg:mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <Bus className="text-blue-600" size={30} />
          </Link>
          <Link to="/" className="font-bold text-xl text-blue-600">
            TransitPro
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={24} className="text-gray-600" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b">
                  <h4 className="font-semibold text-gray-800">Notifications</h4>
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto scrollbar-hide">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b flex items-center justify-between hover:bg-gray-50 ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-blue-600"
                        >
                          <Check size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center bg-blue-50 px-3 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              <User size={20} className="text-blue-600 mr-2" />
              Profile
              <ChevronDown
                size={18}
                className={`ml-2 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                  <p className="text-xs text-gray-400">Standard User</p>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <User size={18} className="mr-3 text-blue-600" />
                  Dashboard
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center px-4 py-3 hover:bg-red-50 text-red-600 border-t border-gray-100"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
