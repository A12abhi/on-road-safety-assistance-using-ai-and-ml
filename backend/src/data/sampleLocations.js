const mechanics = [
  { id: 'm1', name: 'RapidFix Garage', serviceType: 'Engine & Electrical', distance: '1.2 km', rating: 4.6, availability: 'Open', contact: '+91-9000001111', lat: 12.974, lng: 77.594 },
  { id: 'm2', name: 'City Wheel Care', serviceType: 'Tire & Brake', distance: '2.4 km', rating: 4.3, availability: 'Busy', contact: '+91-9000002222', lat: 12.979, lng: 77.602 },
  { id: 'm3', name: 'GreenLine Auto', serviceType: 'General Service', distance: '3.1 km', rating: 4.5, availability: 'Open', contact: '+91-9000003333', lat: 12.968, lng: 77.588 },
];

const fuelStations = [
  { id: 'f1', name: 'City Fuel Hub', distance: '0.9 km', lat: 12.972, lng: 77.598 },
  { id: 'f2', name: 'Highway Petrol Point', distance: '2.8 km', lat: 12.981, lng: 77.607 },
];

const safeLocations = [
  { id: 's1', name: 'Traffic Help Booth', lat: 12.976, lng: 77.601 },
  { id: 's2', name: 'Police Aid Point', lat: 12.969, lng: 77.592 },
];

module.exports = { mechanics, fuelStations, safeLocations };
