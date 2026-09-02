import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  { name: 'vehicleType', label: 'Vehicle type', required: true },
  { name: 'fuelType', label: 'Fuel type', required: true },
  { name: 'currentFuelLevel', label: 'Current fuel level (L)', type: 'number', required: true },
  { name: 'distanceToDestination', label: 'Distance to destination (km)', type: 'number', required: true },
  { name: 'averageMileage', label: 'Average mileage (km/L)', type: 'number', required: true },
  { name: 'trafficCondition', label: 'Traffic condition', type: 'select', required: true, options: ['low', 'medium', 'high'] },
  { name: 'roadCondition', label: 'Road condition', type: 'select', required: true, options: ['smooth', 'moderate', 'rough'] },
];

const FuelPage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/fuel/predict', payload);
    setResult(data.result);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm title="Fuel Assistant" description="Linear Regression style fuel estimation with nearby station suggestions." fields={fields} onSubmit={submit} result={result} loading={loading} />
      {result && <ReportButton reportType="fuel" input={input} result={result} />}
    </div>
  );
};

export default FuelPage;
