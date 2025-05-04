import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (code) {
      // Send the code back to the parent window
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_CODE',
        code
      }, window.location.origin);
      
      window.close();
    } else if (error) {
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error
      }, window.location.origin);
      
      window.close();
    }
  }, [searchParams]);

  return (
    <div className="oauth-callback">
      <p>Processing Google authentication...</p>
    </div>
  );
};

export default OAuthCallback;