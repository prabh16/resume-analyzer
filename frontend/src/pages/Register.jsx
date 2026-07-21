import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await register(form.name, form.email, form.password);
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
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">Start analyzing your resume against real job descriptions.</p>

          {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="label">Full Name</label>
              <input id="name" name="name" className="input-field" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input id="password" name="password" type="password" className="input-field" value={form.password} onChange={handleChange} minLength={6} required />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
