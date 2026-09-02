import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';

const MechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/mechanics').then((res) => setMechanics(res.data.mechanics || [])).catch(() => setMechanics([]));
  }, []);

  const requestAssistance = async (mechanic) => {
    try {
      await api.post('/mechanics/request', {
        mechanicName: mechanic.name,
        serviceType: mechanic.serviceType,
        location: 'Current user location (simulated)',
        note,
      });
      setSelected(mechanic.id);
      setMessage('Mechanic request submitted successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not submit request.');
    }
  };

  return (
    <Layout title="Mechanic Finder">
      <p className="mb-4 text-sm text-slate-500">Nearby mechanic/service locations are displayed using realistic sample data.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mechanics.map((m) => (
          <article key={m.id} className="rounded-xl bg-white p-4 shadow-sm">
            <h3 className="font-semibold">{m.name}</h3>
            <p className="mt-1 text-sm text-slate-600">Service: {m.serviceType}</p>
            <p className="text-sm text-slate-600">Distance: {m.distance}</p>
            <p className="text-sm text-slate-600">Rating: {m.rating}</p>
            <p className="text-sm text-slate-600">Availability: {m.availability}</p>
            <p className="text-sm text-slate-600">Contact: {m.contact}</p>
            <textarea className="mt-2" rows={2} placeholder="Request note (optional)" value={selected === m.id ? note : ''} onChange={(e) => { setSelected(m.id); setNote(e.target.value); }} />
            <button onClick={() => requestAssistance(m)} className="mt-3 bg-blue-600 px-3 py-2 text-sm text-white">Request Assistance</button>
          </article>
        ))}
      </div>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </Layout>
  );
};

export default MechanicsPage;
