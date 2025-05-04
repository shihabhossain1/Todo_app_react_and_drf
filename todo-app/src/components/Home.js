import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <div className="home-container">
      <h1>Welcome {user?.username || 'User'}!</h1>
      <p>You are successfully logged in.</p>

      <button
        onClick={() => navigate('/todo')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
      >
        Go to To-Do List
      </button>
    </div>
  );
};

export default Home;