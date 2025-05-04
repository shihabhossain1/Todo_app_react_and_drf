import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaMicrosoft, FaFacebook, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.signupSuccess) {
      setSuccessMessage('Signup successful! Please login with your credentials.');
    }
  }, [location.state]);
  

  const handleGoogleLogin = () => {
    const clientId = '';
    const redirectUri = encodeURIComponent('https://api.trupersona.mohuls.com/api/account/auth/google/callback/');
    const scope = encodeURIComponent('openid email profile');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
    
    window.location.href = authUrl;
  };
  

  // microsoft
const handleMicrosoftLogin = () => {
  const clientId = '29bae955-c8e7-482c-a175-fa6e30f0c00f';
  const redirectUri = encodeURIComponent('https://api.novel.mohuls.com/api/accounts/auth/microsoft/callback/');
  const scope = encodeURIComponent('openid profile email User.Read');
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scope}&prompt=select_account`;
  window.location.href = authUrl;
};
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Get JWT tokens from Django endpoint
      const tokenResponse = await axios.post(
        'http://127.0.0.1:8000/api/token/',
        { username, password }
      );

      const { access, refresh } = tokenResponse.data;
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Step 2: Get user data (you'll need to create this endpoint in Django)
      const userResponse = await axios.get(
        'http://127.0.0.1:8000/api/account/user/',
        {
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      // Update global state
      setUser(userResponse.data);
      setIsLoggedIn(true);
      
      // Redirect to home page
      navigate('/');

    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // For now, we'll just simulate a successful login
    // In a real app, this would redirect to the provider's OAuth page
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="social-login">
        <p className="divider">or continue with</p>
        <div className="social-icons">
          <button 
              className="social-btn google" 
              onClick={handleGoogleLogin}
            >
            <FaGoogle className="social-icon" />
          </button>


          <button
            className="social-btn microsoft"
            onClick={() => handleMicrosoftLogin('Microsoft')}
            disabled={isLoading}
          >
            <FaMicrosoft className="social-icon" />
          </button>

          <button 
            className="social-btn facebook" 
            onClick={() => handleSocialLogin('Facebook')}
            disabled={isLoading}
          >
            <FaFacebook className="social-icon" />
          </button>
          <button 
            className="social-btn github" 
            onClick={() => handleSocialLogin('GitHub')}
            disabled={isLoading}
          >
            <FaGithub className="social-icon" />
          </button>
        </div>
      </div>

      <p className="auth-link">
        Forgot password? <a href="/forgot-password">Reset here</a>
      </p>
      <p className="auth-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;