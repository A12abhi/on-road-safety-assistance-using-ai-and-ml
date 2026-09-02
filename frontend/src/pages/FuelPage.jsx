import AnalysisFormPage from '../components/AnalysisFormPage';

const fields = [
  { name: 'vehicleType', label: 'Vehicle type' },
  { name: 'fuelType', label: 'Fuel type' },
  { name: 'currentFuelLevel', label: 'Current fuel level (liters)', type: 'number' },
  { name: 'distanceToDestination', label: 'Distance to destination (km)', type: 'number' },
  { name: 'averageMileage', label: 'Average mileage (km/l)', type: 'number' },
  { name: 'trafficCondition', label: 'Traffic condition', type: 'select', options: ['Low', 'Moderate', 'High'] },
  { name: 'roadCondition', label: 'Road condition', type: 'select', options: ['Good', 'Moderate', 'Poor'] },
];

const FuelPage = () => (
  <AnalysisFormPage
    title="Fuel Assistant"
    endpoint="/fuel/predict"
    fields={fields}
    reportType="Fuel Prediction"
    disclaimer="Fuel estimation is AI/ML simulation-based and should be treated as planning guidance only."
    formatResult={(r) => [
      ['Fuel Required', `${r.requiredFuel} L`],
      ['Estimated Fuel Consumption', `${r.estimatedFuelConsumption} L`],
      ['Estimated Remaining Range', `${r.estimatedRemainingRange} km`],
      ['Refueling Status', r.refuelingStatus],
      ['Model', r.modelType],
    ]}
  />
);

export default FuelPage;
