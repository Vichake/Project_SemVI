import Landing from '../pages/public/landing.jsx';
import Login from '../pages/public/login.jsx';
import Signup from '../pages/public/register.jsx';
import Home from '../pages/private/Home.jsx';
import React from 'react';
import PrivateRoute from '../components/PrivateRoute.jsx';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    
  },
];

export default routes;
