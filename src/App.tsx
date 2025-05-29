import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PlanPage from './pages/Plan';
import ActivatePage from './pages/Activate';
import MeasurePage from './pages/Measure';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlanPage />} />
          <Route path="activate" element={<ActivatePage />} />
          <Route path="measure" element={<MeasurePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;