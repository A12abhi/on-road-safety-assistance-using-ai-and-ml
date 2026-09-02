import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet';
import Layout from '../components/Layout';
import api from '../api/client';

const userLocation = [12.9716, 77.5946];
const destination = [12.983, 77.61];

const MapPage = () => {
  const [points, setPoints] = useState({ mechanics: [], fuelStations: [], safeLocations: [], routeSuggestions: [] });

  useEffect(() => {
    api.get('/map/points').then((res) => setPoints(res.data)).catch(() => {});
  }, []);

  return (
    <Layout title="Interactive Assistance Map">
      <p className="mb-3 text-sm text-slate-500">Route and points are simulation-backed when live navigation services are unavailable.</p>
      <div className="overflow-hidden rounded-xl bg-white p-4 shadow-sm">
        <MapContainer center={userLocation} zoom={13} style={{ height: 420, width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={userLocation}><Popup>User location</Popup></Marker>
          <Marker position={destination}><Popup>Destination</Popup></Marker>
          <Polyline positions={[userLocation, destination]} color="blue" />

          {points.mechanics?.map((m) => <Marker key={m.id} position={[m.lat, m.lng]}><Popup>Mechanic: {m.name}</Popup></Marker>)}
          {points.fuelStations?.map((f) => <Marker key={f.id} position={[f.lat, f.lng]}><Popup>Fuel: {f.name}</Popup></Marker>)}
          {points.safeLocations?.map((s) => <Marker key={s.id} position={[s.lat, s.lng]}><Popup>Safe: {s.name}</Popup></Marker>)}
        </MapContainer>
      </div>

      <section className="mt-4 rounded-xl bg-white p-4 shadow-sm">
        <h3 className="font-semibold">Recommended Safer Route</h3>
        <ul className="mt-2 text-sm text-slate-700">
          {(points.routeSuggestions || []).map((opt) => <li key={opt}>• {opt}</li>)}
        </ul>
      </section>
    </Layout>
  );
};

export default MapPage;
