import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';
import api from './api'; // Make sure you have this axios instance
import './App.css';
import TodoList from './components/TodoList';
import OAuthCallback from './components/Auth/OAuthCallback';
import SocialAuthSuccess from './components/Auth/SocialAuthSuccess';
import GoogleCallback from './components/Auth/GoogleCallback';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        try {
          // Verify token by fetching user data
          const response = await api.get('user/');
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsLoggedIn(false);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
          isLoggedIn={isLoggedIn} 
          user={user}
          onLogout={handleLogout}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
            <Route 
              path="/login" 
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
                )
              } 
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route 
              path="/auth/social/success" 
              element={<SocialAuthSuccess />} 
            />
            <Route path="/auth/google/callback" element={<GoogleCallback setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;