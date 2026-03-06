import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Login from './pages/login';
import Register from './pages/register';   
import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoute.jsx'
import Logout from './pages/logout.jsx';

function App() {
return (
    <>
    <Router>
      <Navbar /> {/* Stays on all pages */}
      <Routes>
        {/* Public Route: Accessible to everyone */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" 
        element={
        <ProtectedRoute> <HomePage /> </ProtectedRoute>
        } 
        />
        <Route path="/" 
        element={
        <ProtectedRoute> <HomePage /> </ProtectedRoute>
        }/>
      </Routes>
    </Router>
    </>
  )
}

export default App
