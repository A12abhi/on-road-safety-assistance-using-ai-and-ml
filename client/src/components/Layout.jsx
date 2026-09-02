import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
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
  ['AI Chatbot', '/chatbot'],
  ['History', '/history'],
];

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex max-w-7xl gap-6 p-4 lg:p-6">
        <aside className="hidden w-64 shrink-0 rounded-2xl bg-white p-4 shadow md:block">
          <h1 className="mb-4 text-lg font-semibold">OnRoad 360°</h1>
          <nav className="space-y-1">
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <NavLink to="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">
                Admin
              </NavLink>
            )}
          </nav>
        </aside>

        <main className="flex-1 rounded-2xl bg-white p-4 shadow md:p-6">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <p className="text-sm text-slate-500">Welcome</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-100 px-2 py-1 text-xs uppercase">{user?.role}</span>
              <button onClick={logout} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white">
                Logout
              </button>
            </div>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
