import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const { user, login, register } = useAuth();
  const router = useRouter();
  const { route } = router.query;

  if (user) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      if (route === 'login') {
        await login(
          formData.get('email'),
          formData.get('password')
        );
      } else {
        await register({
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          userType: formData.get('userType')
        });
      }
      router.push('/');
    } catch (error) {
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>{route === 'login' ? 'Login' : 'Register'}</h2>
        
        {route === 'register' && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <select name="userType" required>
              <option value="">Select User Type</option>
              <option value="regular">Regular User</option>
              <option value="registered">Registered User</option>
              <option value="client">Client</option>
            </select>
          </>
        )}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        
        <button type="submit">
          {route === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}
