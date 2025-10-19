import { useState } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState('login');

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-form ${authType}`}>
        {authType === 'login' ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin({
              email: e.target.email.value,
              password: e.target.password.value
            });
          }}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleRegister({
              name: e.target.name.value,
              email: e.target.email.value,
              password: e.target.password.value,
              userType: e.target.userType.value
            });
          }}>
            <h2>Register</h2>
            <select name="userType">
              <option value="regular">Regular User</option>
              <option value="registered">Registered User</option>
              <option value="client">Client</option>
            </select>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
