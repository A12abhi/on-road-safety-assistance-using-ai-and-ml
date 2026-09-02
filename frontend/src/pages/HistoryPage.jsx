import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';

const HistoryPage = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({ inputType: '', riskLevel: '' });

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/history').catch(() => ({ data: { records: [] } }));
      setRecords(data.records || []);
    };
    load();
  }, []);

  const filtered = useMemo(
    () => records.filter((r) =>
      (!filter.inputType || r.inputType.toLowerCase().includes(filter.inputType.toLowerCase())) &&
      (!filter.riskLevel || String(r.riskLevel).toLowerCase().includes(filter.riskLevel.toLowerCase())),
    ),
    [records, filter],
  );

  return (
    <Layout title="Prediction History">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 grid gap-2 md:grid-cols-3">
          <input placeholder="Filter by prediction type" value={filter.inputType} onChange={(e) => setFilter({ ...filter, inputType: e.target.value })} />
          <input placeholder="Filter by risk level" value={filter.riskLevel} onChange={(e) => setFilter({ ...filter, riskLevel: e.target.value })} />
        </div>
        <div className="overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-2">Prediction ID</th><th>User</th><th>Date/Time</th><th>Input Type</th><th>Prediction</th><th>Score</th><th>Risk Level</th><th>Recommendation</th></tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr className="border-t" key={r._id}>
                  <td className="py-2">{String(r._id).slice(0, 8)}</td>
                  <td>{String(r.userId).slice(0, 8)}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>{r.inputType}</td>
                  <td>{r.prediction}</td>
                  <td>{r.score ?? 'N/A'}</td>
                  <td>{r.riskLevel}</td>
                  <td>{r.recommendation}</td>
                </tr>
              ))}
              {!filtered.length && <tr><td className="py-2 text-slate-500" colSpan={8}>No prediction records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
