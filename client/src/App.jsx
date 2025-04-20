import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes/routes.jsx';

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
      <Routes>
        {routes.map((route, index) => {
          // Prevent access to /login or /register if already logged in
          if ((route.path === '/login' || route.path === '/register' || route.path === '/') && token) {
            return <Route key={index} path={route.path} element={<Navigate to="/home" />} />;
          }
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
    </Router>
  );
};

export default App;
