import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/home/home';
import Dashboard from '../views/dashboard/dashboard';
import Authentication from '../views/authentification/authentification';
const AllRoutes = () => {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="*" element={<p style={{ color: 'black' }}>Not found page</p>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />

          <Route path="/auth" element={<Authentication />} />
        </Route>
      </Routes>
    </div>
  );
};
export default AllRoutes;
