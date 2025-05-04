import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This is a fallback handler in case the popup messaging fails
    // Try to get tokens from localStorage first
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
      // If we already have tokens (from popup message), just redirect
      navigate('/');
    } else {
      // If no tokens, check URL for parameters (fallback)
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const userData = params.get('user');

      if (token && userData) {
        try {
          localStorage.setItem('access_token', token);
          localStorage.setItem('user', userData);
          navigate('/');
        } catch (err) {
          navigate('/login?error=token_error');
        }
      } else {
        navigate('/login?error=auth_failed');
      }
    }
  }, [navigate]);

  return (
    <div className="auth-success-container">
      <h2>Login Successful</h2>
      <p>Redirecting to your account...</p>
    </div>
  );
};

export default SocialAuthSuccess;