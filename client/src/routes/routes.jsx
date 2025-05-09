import Landing from '../pages/public/landing.jsx';
import Login from '../pages/public/login.jsx';
import Signup from '../pages/public/register.jsx';
import Home from '../pages/private/Home.jsx';
import Nearby from '../pages/private/Nearby.jsx';
import SellProducts from '../pages/private/SellProducts.jsx';
import RentInstruments from '../pages/private/RentInstruments.jsx';
import Schemes from '../pages/private/Schemes.jsx';
import Technique from '../pages/private/Technique.jsx';

import React from 'react';
import PrivateRoute from '../components/PrivateRoute.jsx';
import { path } from 'framer-motion/client';

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
  {
    path: '/nearby-markets',
    element: (
      <PrivateRoute>
        <Nearby />
      </PrivateRoute>
    ),
  },
  {
    path: '/nearby-markets/:id',
    element: (
      <PrivateRoute>
        <Nearby />
      </PrivateRoute>
    ),
  },
  {
    path: '/sell-products',
    element: (
      <PrivateRoute>
        <SellProducts />
      </PrivateRoute>
    ),
  },{
    path: '/rent-instruments',
    element: (
      <PrivateRoute>
        <RentInstruments />
      </PrivateRoute>
    ),
  },
  {
    path: '/govt-schemes',
    element: (
      <PrivateRoute>
        <Schemes />
      </PrivateRoute>
    ),
  },
  {
    path: '/learn-techniques',
    element: (
      <PrivateRoute>
        <Technique />
      </PrivateRoute>
    ),
  }
];

export default routes;
