import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  { name: 'currentLocation', label: 'Current location', required: true },
  { name: 'destination', label: 'Destination', required: true },
  { name: 'vehicleType', label: 'Vehicle type', required: true },
  { name: 'emergencyType', label: 'Emergency type', type: 'select', required: true, options: ['Vehicle breakdown', 'Accident assistance', 'Low fuel', 'Engine problem', 'Battery problem', 'Tire problem', 'Other emergency'] },
  { name: 'vehicleCondition', label: 'Vehicle condition (good/moderate/poor/critical)' },
  { name: 'fuelStatus', label: 'Fuel status (high/medium/low/empty)' },
  { name: 'drivingBehavior', label: 'Driving behavior (stable/normal/aggressive/panic)' },
  { name: 'description', label: 'Issue description' },
];

const EmergencyPage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/emergency', payload);
    setResult(data.data);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm
        title="Emergency Assistance"
        description="Submit emergency details to calculate risk level and get assistance options."
        fields={fields}
        onSubmit={submit}
        result={result}
        loading={loading}
      />
      {result && <ReportButton reportType="emergency" input={input} result={result} />}
    </div>
  );
};

export default EmergencyPage;
