import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormPage } from './pages/FormPage';
import { Toaster } from 'react-hot-toast';
import './api/api';
import LoginPage from './pages/LoginPage';
import Navbar from './layout/Navbar';
import { Website } from './pages/Website/Website';

export default function App() {
  return (
    <Router>
      <div className="mx-auto max-w-7xl">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/fb" exact element={<FormPage />} />
          <Route path="/website" exact element={<Website />} />
        </Routes>
      </div>
    </Router>
  )
}
