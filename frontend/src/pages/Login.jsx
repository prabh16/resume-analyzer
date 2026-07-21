import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Login to access your dashboard and analysis history.</p>

          {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input id="password" name="password" type="password" className="input-field" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            New here?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
