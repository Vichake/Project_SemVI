import React, { useState } from 'react';
import { 
  Home, Users, BookOpen, BarChart2, 
  Settings, LogOut, Menu, X,
  Tractor, Map, FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { title: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { title: 'Farmers', icon: <Users size={20} />, path: '/farmers' },
    { title: 'Schemes', icon: <FileText size={20} />, path: '/schemes' },
    { title: 'Instruments', icon: <Tractor size={20} />, path: '/instruments' },
    { title: 'Locations', icon: <Map size={20} />, path: '/locations' },
    { title: 'Content', icon: <BookOpen size={20} />, path: '/content' },
    { title: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full bg-green-600 text-white shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-20 bg-white shadow-xl w-64 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:static lg:h-screen lg:z-10`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Tractor className="text-green-600" size={24} />
              <h1 className="text-xl font-bold text-green-800">AgriAdmin</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 w-full"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;