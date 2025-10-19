// src/components/Auth.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState('login');

  const handleLogin = async (credentials) => {
    // Implement secure authentication flow
    await authenticate(credentials);
    router.push('/dashboard');
  };

  const handleRegister = async (userData) => {
    // Implement registration flow
    await register(userData);
    router.push('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className={`auth-form ${authType}`}>
        {authType === 'login' ? (
          <>
            <h2>Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin({
                email: e.target.email.value,
                password: e.target.password.value
              });
            }}>
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRegister({
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                userType: e.target.userType.value
              });
            }}>
              <select name="userType">
                <option value="regular">Regular User</option>
                <option value="registered">Registered User</option>
                <option value="client">Client</option>
              </select>
              <input type="text" name="name" placeholder="Name" />
              <input type="email" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <button type="submit">Register</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};