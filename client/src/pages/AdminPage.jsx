import { useEffect, useState } from 'react';
import api from '../api';
import StatCard from '../components/StatCard';

const AdminPage = () => {
  const [dashboard, setDashboard] = useState(null);

  const load = async () => {
    const { data } = await api.get('/api/admin/dashboard');
    setDashboard(data.data);
  };

  const updateEmergency = async (id, status) => {
    await api.put(`/api/emergency/${id}`, { status });
    await load();
  };

  useEffect(() => {
    load().catch(() => undefined);
  }, []);

  if (!dashboard) return <p>Loading admin dashboard...</p>;

  const stats = [
    ['Total users', dashboard.totalUsers],
    ['Active emergency requests', dashboard.activeEmergencyRequests],
    ['High-risk cases', dashboard.highRiskCases],
    ['Vehicle health reports', dashboard.vehicleHealthReports],
    ['Prediction history', dashboard.predictionHistory],
    ['Maintenance records', dashboard.maintenanceRecords],
    ['Emission evaluations', dashboard.emissionEvaluations],
    ['Mechanic requests', dashboard.mechanicRequests],
    ['Chat interactions', dashboard.chatInteractions],
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold">Administrator Dashboard</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {stats.map(([title, value]) => (<StatCard key={title} title={title} value={value} />))}
      </div>

      <h3 className="mt-6 text-lg font-semibold">Emergency Requests</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-2">Request ID</th><th className="p-2">User</th><th className="p-2">Emergency Type</th><th className="p-2">Risk</th><th className="p-2">Location</th><th className="p-2">Time</th><th className="p-2">Status</th><th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.emergencyTable.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{item._id.slice(-6)}</td>
                <td className="p-2">{item.user?.name}</td>
                <td className="p-2">{item.emergencyType}</td>
                <td className="p-2">{item.riskLevel}</td>
                <td className="p-2">{item.currentLocation}</td>
                <td className="p-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2 space-x-1">
                  <button onClick={() => updateEmergency(item._id, 'Accepted')} className="rounded bg-indigo-100 px-2 py-1">Accept</button>
                  <button onClick={() => updateEmergency(item._id, 'Processing')} className="rounded bg-amber-100 px-2 py-1">Process</button>
                  <button onClick={() => updateEmergency(item._id, 'Closed')} className="rounded bg-emerald-100 px-2 py-1">Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPage;
