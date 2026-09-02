import { Link } from 'react-router-dom';

const HomePage = () => {
  const actions = [
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

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">AI-Powered OnRoad 360° Emergency, Fuel, Insurance & Emission Assistance System</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          A unified vehicle support platform for emergency help, behavior analysis, vehicle health, fuel prediction,
          maintenance guidance, insurance advisory, emission evaluation, mechanic finding, map assistance, and AI chatbot support.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/register" className="rounded-lg bg-blue-500 px-4 py-2 font-medium">
            Get Started
          </Link>
          <Link to="/login" className="rounded-lg border border-slate-400 px-4 py-2">
            Login
          </Link>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {actions.map(([label, path]) => (
            <Link key={path} to={path} className="rounded-xl bg-white/10 p-4 hover:bg-white/20">
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-white/10 p-5">
          <h2 className="text-xl font-semibold">Key Benefits</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="rounded bg-white/10 px-3 py-2 text-sm">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
