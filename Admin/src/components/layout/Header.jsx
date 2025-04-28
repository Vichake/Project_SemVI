import React from 'react';
import { FaBell, FaEnvelope, FaSearch, FaUser } from 'react-icons/fa'; // Using react-icons
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-lg">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch size={18} className="text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Mobile title */}
        <div className="md:hidden flex-1 text-center">
          <h1 className="text-lg font-semibold text-green-800">AgriAdmin</h1>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <FaBell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>

          <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <FaEnvelope size={20} />
            <span className="absolute top-1 right-1 bg-green-500 rounded-full w-2 h-2"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
            </div>
            <div className="h-9 w-9 bg-green-100 rounded-full flex items-center justify-center text-green-700">
              <FaUser size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
