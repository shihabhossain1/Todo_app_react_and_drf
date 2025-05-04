import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    // In a real app, you would call an API here
    console.log('Password reset requested for:', email);
    
    setMessage('Password reset link has been sent to your email');
    setError('');
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Reset Password
        </button>
      </form>
      <p className="auth-link">
        Remember your password? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default ForgotPassword;