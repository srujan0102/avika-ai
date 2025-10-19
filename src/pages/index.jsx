import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <h1>Welcome to Avika</h1>
      {user ? (
        <div className="user-dashboard">
          <h2>Hi, {user.name}!</h2>
          <div className="dashboard-links">
            <a href="/chat">Chat with Avika</a>
            <a href="/journal">Write in Journal</a>
            <a href="/mood">Check Mood Meter</a>
          </div>
        </div>
      ) : (
        <div className="login-section">
          <a href="/auth/login">Login</a>
          <a href="/auth/register">Register</a>
        </div>
      )}
    </div>
  );
}

