import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes/routes.jsx';
import { UserProvider } from './context/userContext.jsx'; // 👈 import the provider

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); 
    }
  }, []);

  return (
    <Router>
      <UserProvider> 
        <Routes>
          {routes.map((route, index) => {
            if ((route.path === '/login' || route.path === '/register' || route.path === '/') && token) {
              return <Route key={index} path={route.path} element={<Navigate to="/home" />} />;
            }
            return <Route key={index} path={route.path} element={route.element} />;
          })}
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
