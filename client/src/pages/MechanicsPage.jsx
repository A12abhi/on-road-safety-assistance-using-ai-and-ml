import { useEffect, useState } from 'react';
import api from '../api';

const MechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/api/mechanics').then((res) => setMechanics(res.data.data || [])).catch(() => undefined);
  }, []);

  const requestHelp = async (mechanicName) => {
    await api.post('/api/mechanics/request', { mechanicName, issue: 'General roadside assistance' });
    setStatus(`Request sent to ${mechanicName}.`);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold">Mechanic Finder</h2>
      <p className="text-sm text-slate-500">Nearby mechanic options using map-linked simulated data.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {mechanics.map((item) => (
          <article key={item.name} className="rounded-xl border p-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-slate-600">{item.serviceType}</p>
            <p className="mt-2 text-sm">Distance: {item.distanceKm} km</p>
            <p className="text-sm">Rating: {item.rating}</p>
            <p className="text-sm">Availability: {item.availability}</p>
            <p className="text-sm">Contact: {item.phone}</p>
            <button onClick={() => requestHelp(item.name)} className="mt-3 rounded bg-blue-600 px-3 py-2 text-sm text-white">
              Request Assistance
            </button>
          </article>
        ))}
      </div>
      {status && <p className="mt-3 rounded bg-emerald-100 p-2 text-sm text-emerald-700">{status}</p>}
    </section>
  );
};

export default MechanicsPage;
