import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock users for demo
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@agriadmin.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'Administrator'
  },
  {
    id: 2,
    email: 'user@agriadmin.com',
    password: 'user123',
    name: 'Regular User',
    role: 'Manager'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('agriAdminUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('agriAdminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Create a user object without the password
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('agriAdminUser', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    } else {
      setError('Invalid email or password');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agriAdminUser');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};