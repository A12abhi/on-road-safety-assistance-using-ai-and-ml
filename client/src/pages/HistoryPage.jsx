import { useEffect, useState } from 'react';
import api from '../api';

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ date: '', type: '', riskLevel: '' });

  const load = async () => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
    const res = await api.get('/api/history', { params });
    setData(res.data.data || []);
  };

  useEffect(() => {
    load().catch(() => undefined);
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold">Prediction History</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <input type="date" className="rounded border p-2" onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
        <input placeholder="Prediction type" className="rounded border p-2" onChange={(e) => setFilters({ ...filters, type: e.target.value })} />
        <input placeholder="Risk level" className="rounded border p-2" onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })} />
        <button onClick={load} className="rounded bg-blue-600 px-3 py-2 text-white">Filter</button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-2">Prediction ID</th><th className="p-2">Date</th><th className="p-2">Type</th><th className="p-2">Score</th><th className="p-2">Risk</th><th className="p-2">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{item._id.slice(-6)}</td>
                <td className="p-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="p-2">{item.result?.inputType}</td>
                <td className="p-2">{item.result?.score ?? '-'}</td>
                <td className="p-2">{item.result?.riskLevel || '-'}</td>
                <td className="p-2">{item.result?.recommendation || '-'}</td>
              </tr>
            ))}
            {!data.length && (
              <tr><td className="p-4 text-slate-500" colSpan={6}>No history records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HistoryPage;
