import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Test } from './pages/Test';
import EmotionGame from './pages/EmotionGame';
import { ShapeGame } from './pages/ShapeGame';
import ColorGame from './pages/ColorGame';
import { LogIn, UserPlus } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Autism Assessment
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/test" element={<Test />} />
          <Route path="/emotion-game" element={<EmotionGame />} />
          <Route path="/shape-game" element={<ShapeGame />} />
          <Route path="/color-game" element={<ColorGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
