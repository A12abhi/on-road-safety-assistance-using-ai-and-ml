import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../api';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [emergency, setEmergency] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [historyRes, emergencyRes] = await Promise.all([api.get('/api/history'), api.get('/api/emergency')]);
      setHistory(historyRes.data.data || []);
      setEmergency(emergencyRes.data.data || []);
    };

    load().catch(() => undefined);
  }, []);

  const latest = history[0]?.result || {};
  const chartData = history.slice(0, 6).map((item, idx) => ({ name: `#${idx + 1}`, score: item.result?.score || 0 }));

  return (
    <section>
      <h2 className="text-2xl font-semibold">User Dashboard</h2>
      <p className="mt-1 text-sm text-slate-500">Vehicle overview, latest AI/simulation insights, and quick status.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <StatCard title="Vehicle" value={user?.vehicle?.vehicleType || 'N/A'} hint={`${user?.vehicle?.fuelType || '-'} fuel`} />
        <StatCard title="Vehicle Health" value={latest.result?.overallVehicleHealthScore || latest.score || 'Pending'} />
        <StatCard title="Fuel Prediction" value={latest.result?.requiredFuel ? `${latest.result.requiredFuel}L` : 'Pending'} />
        <StatCard title="Latest Emission" value={latest.result?.emissionStatus || 'Pending'} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Recent Emergency Requests</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {emergency.slice(0, 5).map((item) => (
              <li key={item._id} className="rounded bg-slate-50 p-2">
                {item.emergencyType} • {item.riskLevel} • {item.status}
              </li>
            ))}
            {!emergency.length && <li className="text-slate-500">No emergency requests yet.</li>}
          </ul>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Recent Prediction Scores</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
