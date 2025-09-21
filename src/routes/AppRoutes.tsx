import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NovaFlowLanding from '../pages/NovaFlowLanding';
import Dashboard from '../pages/Dashboard';
import { NextPage } from '../pages/NextPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NovaFlowLanding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/t-min" element={<NextPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;