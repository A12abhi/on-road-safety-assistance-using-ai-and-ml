import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mb-4 text-sm text-slate-500">Access your OnRoad 360 dashboard.</p>
        <div className="space-y-3">
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-4 w-full bg-blue-600 px-4 py-2 text-white disabled:bg-blue-300">{loading ? 'Please wait...' : 'Login'}</button>
        <p className="mt-3 text-sm">No account? <Link to="/register" className="text-blue-700">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
