import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    vehicleType: 'Car',
    fuelType: 'Petrol',
    age: '',
    mileage: '',
  });

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: 'user',
        vehicle: {
          vehicleType: form.vehicleType,
          fuelType: form.fuelType,
          age: Number(form.age || 0),
          mileage: Number(form.mileage || 0),
        },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {['name', 'email', 'phone', 'password'].map((field) => (
            <input
              key={field}
              className="rounded border p-2"
              placeholder={field[0].toUpperCase() + field.slice(1)}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
            />
          ))}
          <select className="rounded border p-2" onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}>
            <option>Car</option><option>Bike</option><option>SUV</option>
          </select>
          <select className="rounded border p-2" onChange={(e) => setForm({ ...form, fuelType: e.target.value })}>
            <option>Petrol</option><option>Diesel</option><option>CNG</option><option>EV</option>
          </select>
          <input className="rounded border p-2" placeholder="Vehicle age" type="number" onChange={(e) => setForm({ ...form, age: e.target.value })} />
          <input className="rounded border p-2" placeholder="Mileage" type="number" onChange={(e) => setForm({ ...form, mileage: e.target.value })} />
        </div>
        {error && <p className="mt-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
        <button className="mt-4 w-full rounded bg-blue-600 p-2 text-white">Create Account</button>
        <p className="mt-3 text-sm">Already have an account? <Link className="text-blue-700" to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
