import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Send the code to your Django backend
      fetch('http://api.trupersona.mohuls.com/api/account/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: 'http://localhost:3000/auth/google/callback',
        }),
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('access_token', data.access_token);
          navigate('/'); // redirect to frontend home
        })
        .catch(err => console.error('Google login error:', err));
    }
  }, [navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;
