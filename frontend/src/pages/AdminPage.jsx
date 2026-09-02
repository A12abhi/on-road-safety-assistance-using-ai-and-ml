import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import api from '../api/client';

const AdminPage = () => {
  const [dashboard, setDashboard] = useState({ totals: {}, emergencyRequests: [] });
  const [statusUpdate, setStatusUpdate] = useState({});

  const load = async () => {
    const { data } = await api.get('/admin/dashboard').catch(() => ({ data: { totals: {}, emergencyRequests: [] } }));
    setDashboard(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateEmergency = async (requestId, status) => {
    await api.put(`/emergency/${requestId}`, { status });
    setStatusUpdate((s) => ({ ...s, [requestId]: status }));
    await load();
  };

  return (
    <Layout title="Administrator Dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <DashboardCard title="Total users" value={dashboard.totals.totalUsers || 0} />
        <DashboardCard title="Active emergency" value={dashboard.totals.activeEmergencyRequests || 0} tone="red" />
        <DashboardCard title="High-risk cases" value={dashboard.totals.highRiskCases || 0} tone="amber" />
        <DashboardCard title="Prediction history" value={dashboard.totals.predictionHistory || 0} />
        <DashboardCard title="Chat interactions" value={dashboard.totals.chatInteractions || 0} />
      </div>

      <section className="mt-5 rounded-xl bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold">Emergency Request Management</h3>
        <div className="overflow-auto">
          <table className="mt-3 w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-2">Request ID</th><th>User</th><th>Emergency Type</th><th>Risk Level</th><th>Location</th><th>Time</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {(dashboard.emergencyRequests || []).map((row) => (
                <tr key={row.requestId} className="border-t">
                  <td className="py-2">{String(row.requestId).slice(0, 8)}</td>
                  <td>{String(row.user).slice(0, 8)}</td>
                  <td>{row.emergencyType}</td>
                  <td>{row.riskLevel}</td>
                  <td>{row.location}</td>
                  <td>{new Date(row.time).toLocaleString()}</td>
                  <td>{statusUpdate[row.requestId] || row.status}</td>
                  <td>
                    <select onChange={(e) => updateEmergency(row.requestId, e.target.value)} defaultValue="">
                      <option value="" disabled>Update</option>
                      <option value="accepted">Accept request</option>
                      <option value="processing">Mark processing</option>
                      <option value="assistance-provided">Provide assistance status</option>
                      <option value="closed">Close request</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!dashboard.emergencyRequests?.length && <tr><td className="py-2 text-slate-500" colSpan={8}>No emergency requests available.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPage;
