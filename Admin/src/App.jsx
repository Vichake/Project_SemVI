import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FarmersPage from './pages/FarmersPage';
import SchemesPage from './pages/SchemesPage';
import InstrumentsPage from './pages/InstrumentsPage';
import ContentPage from './pages/ContentPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="farmers" element={<FarmersPage />} />
            <Route path="schemes" element={<SchemesPage />} />
            <Route path="instruments" element={<InstrumentsPage />} />
            <Route path="content" element={<ContentPage />} />
            
            {/* Additional routes can be added here */}
            <Route path="locations" element={<div className="p-4">Locations page coming soon</div>} />
            <Route path="analytics" element={<div className="p-4">Analytics page coming soon</div>} />
            <Route path="settings" element={<div className="p-4">Settings page coming soon</div>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;