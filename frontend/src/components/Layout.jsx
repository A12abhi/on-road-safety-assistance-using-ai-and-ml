import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  ['Dashboard', '/dashboard'],
  ['Emergency', '/emergency'],
  ['Driving Analysis', '/driving-analysis'],
  ['Vehicle Health', '/vehicle-health'],
  ['Audio Diagnostics', '/audio-diagnostics'],
  ['Fuel Assistant', '/fuel'],
  ['Mechanic Finder', '/mechanics'],
  ['Map View', '/map'],
  ['Maintenance', '/maintenance'],
  ['Insurance', '/insurance'],
  ['Emission', '/emission'],
  ['AI Assistant', '/chatbot'],
  ['Prediction History', '/history'],
];

const Layout = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-screen w-64 bg-slate-900 p-5 text-white lg:block">
          <h1 className="text-lg font-bold">OnRoad 360°</h1>
          <p className="mt-1 text-xs text-slate-300">AI-Powered Assistance Platform</p>
          <nav className="mt-5 space-y-1">
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                {label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Admin Dashboard
              </NavLink>
            )}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <header className="mb-5 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">Logged in as {user?.name} ({user?.role})</p>
              </div>
              <button onClick={logout} className="bg-red-600 px-4 py-2 text-sm font-medium text-white">Logout</button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
