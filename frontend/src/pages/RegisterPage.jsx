import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
    adminCode: '',
    vehicleInformation: { vehicleNumber: '', vehicleType: '', fuelType: '', mileage: '', vehicleAge: '' },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const setVehicle = (key, value) => setForm({ ...form, vehicleInformation: { ...form.vehicleInformation, [key]: value } });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        ...form,
        vehicleInformation: {
          ...form.vehicleInformation,
          mileage: Number(form.vehicleInformation.mileage || 0),
          vehicleAge: Number(form.vehicleInformation.vehicleAge || 0),
        },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
          {form.role === 'admin' && <input placeholder="Admin invite code" value={form.adminCode} onChange={(e) => setForm({ ...form, adminCode: e.target.value })} />}
          <input placeholder="Vehicle Number" value={form.vehicleInformation.vehicleNumber} onChange={(e) => setVehicle('vehicleNumber', e.target.value)} />
          <input placeholder="Vehicle Type" value={form.vehicleInformation.vehicleType} onChange={(e) => setVehicle('vehicleType', e.target.value)} />
          <input placeholder="Fuel Type" value={form.vehicleInformation.fuelType} onChange={(e) => setVehicle('fuelType', e.target.value)} />
          <input type="number" placeholder="Average Mileage" value={form.vehicleInformation.mileage} onChange={(e) => setVehicle('mileage', e.target.value)} />
          <input type="number" placeholder="Vehicle Age" value={form.vehicleInformation.vehicleAge} onChange={(e) => setVehicle('vehicleAge', e.target.value)} />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-4 w-full bg-blue-600 px-4 py-2 text-white disabled:bg-blue-300">{loading ? 'Creating account...' : 'Register'}</button>
        <p className="mt-3 text-sm">Already have an account? <Link to="/login" className="text-blue-700">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
