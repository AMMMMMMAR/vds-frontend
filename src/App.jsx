import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageFlowProvider } from './hooks/usePageFlow';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultsPage from './pages/ResultsPage';
import TryOnPage from './pages/TryOnPage';

export default function App() {
  return (
    <BrowserRouter>
      <PageFlowProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/try-on" element={<TryOnPage />} />
        </Routes>
      </PageFlowProvider>
    </BrowserRouter>
  );
}
