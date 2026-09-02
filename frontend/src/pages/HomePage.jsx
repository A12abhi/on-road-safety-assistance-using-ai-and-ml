import { Link } from 'react-router-dom';

const quickLinks = [
  ['Emergency Assistance', '/emergency'],
  ['Vehicle Health', '/vehicle-health'],
  ['Fuel Assistant', '/fuel'],
  ['Insurance Advisory', '/insurance'],
  ['Emission Testing', '/emission'],
  ['AI Assistant', '/chatbot'],
];

const benefits = [
  'Faster emergency assistance',
  'AI-based vehicle analysis',
  'Preventive maintenance',
  'Fuel estimation',
  'Vehicle health monitoring',
  'Unified vehicle assistance',
];

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-4 py-12 text-white">
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold md:text-4xl">AI-Powered OnRoad 360° Emergency, Fuel, Insurance & Emission Assistance System</h1>
      <p className="mt-4 max-w-3xl text-slate-100">A single responsive digital platform for emergency support, vehicle diagnostics, driving risk analysis, smart maintenance, map-based assistance, and AI-guided recommendations using user-provided/simulated data.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/register" className="bg-blue-500 px-5 py-3 font-semibold text-white">Get Started</Link>
        <Link to="/login" className="bg-white px-5 py-3 font-semibold text-slate-900">Login</Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map(([label, path]) => (
          <Link key={path} to={path} className="rounded-xl bg-white/10 p-4 text-sm font-medium backdrop-blur hover:bg-white/20">{label}</Link>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Key Benefits</h2>
        <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => <li key={benefit}>• {benefit}</li>)}
        </ul>
      </section>
    </div>
  </div>
);

export default HomePage;
