import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import api from '../api';

const userPos = [22.5726, 88.3639];
const destinationPos = [22.587, 88.392];

const MapViewPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/api/map/assistance').then((res) => setData(res.data.data)).catch(() => undefined);
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold">Map View Assistance</h2>
      <p className="text-sm text-slate-500">Route, nearby support points, and safer-route suggestion (simulation-based).</p>
      <div className="mt-4 h-96 overflow-hidden rounded-xl border">
        <MapContainer center={userPos} zoom={13} className="h-full w-full">
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={userPos}><Popup>User Location</Popup></Marker>
          <Marker position={destinationPos}><Popup>Destination</Popup></Marker>
          <Polyline positions={[userPos, destinationPos]} color="blue" />
        </MapContainer>
      </div>
      {data && (
        <div className="mt-4 rounded-xl border p-4 text-sm">
          <p className="font-semibold text-red-700">Recommended Safer Route</p>
          <p className="mt-1">{data.routeOptions.join(', ')}</p>
        </div>
      )}
    </section>
  );
};

export default MapViewPage;
