import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardPage = () => {
  const { user } = useAuth();
  const [emergency, setEmergency] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [er, hr] = await Promise.all([
        api.get('/emergency').catch(() => ({ data: { requests: [] } })),
        api.get('/history').catch(() => ({ data: { records: [] } })),
      ]);
      setEmergency(er.data.requests || []);
      setHistory(hr.data.records || []);
    };
    load();
  }, []);

  const latest = history[0] || {};

  return (
    <Layout title="User Dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Vehicle" value={user?.vehicleInformation?.vehicleType || 'N/A'} subtitle={user?.vehicleInformation?.vehicleNumber || ''} />
        <DashboardCard title="Current vehicle health" value={latest.inputType === 'Vehicle Health' ? latest.prediction : 'Pending'} tone="green" />
        <DashboardCard title="Latest safety status" value={emergency[0]?.riskLevel || 'No incidents'} tone="red" />
        <DashboardCard title="Fuel prediction" value={history.find((h) => h.inputType === 'Fuel Prediction')?.prediction || 'Not generated'} tone="amber" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <DashboardCard title="Maintenance reminder" value={history.find((h) => h.inputType === 'Smart Maintenance')?.prediction || 'Pending'} tone="slate" />
        <DashboardCard title="Latest emission result" value={history.find((h) => h.inputType === 'Emission Testing')?.prediction || 'Pending'} tone="slate" />
        <DashboardCard title="Insurance recommendation" value={history.find((h) => h.inputType === 'Insurance Advisory')?.prediction || 'Pending'} tone="slate" />
      </div>

      <section className="mt-5 rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Recent Emergency Requests</h3>
        <div className="mt-3 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-2">Type</th><th>Status</th><th>Risk</th><th>Time</th></tr>
            </thead>
            <tbody>
              {emergency.slice(0, 5).map((item) => (
                <tr key={item._id} className="border-t"><td className="py-2">{item.emergencyType}</td><td>{item.status}</td><td>{item.riskLevel}</td><td>{new Date(item.createdAt).toLocaleString()}</td></tr>
              ))}
              {!emergency.length && <tr><td className="py-2 text-slate-500" colSpan={4}>No emergency requests found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-5 rounded-xl bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Prediction Snapshot</h3>
        <Bar
          data={{
            labels: ['Safety', 'Vehicle Health', 'Fuel', 'Emission'],
            datasets: [{
              label: 'Scores (0-100)',
              data: [
                history.find((h) => h.inputType === 'Driving Analysis')?.score || 0,
                history.find((h) => h.inputType === 'Vehicle Health')?.score || 0,
                Math.min(100, history.find((h) => h.inputType === 'Fuel Prediction')?.score || 0),
                history.find((h) => h.inputType === 'Emission Testing')?.score || 0,
              ],
              backgroundColor: '#2563eb',
            }],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
          height={100}
        />
      </section>
    </Layout>
  );
};

export default DashboardPage;
