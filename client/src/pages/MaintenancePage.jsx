import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number', required: true },
  { name: 'mileage', label: 'Mileage', type: 'number', required: true },
  { name: 'lastServiceDate', label: 'Last service date', type: 'text', required: true },
  { name: 'engineCondition', label: 'Engine condition', type: 'number', required: true },
  { name: 'brakeCondition', label: 'Brake condition', type: 'number', required: true },
  { name: 'tireCondition', label: 'Tire condition', type: 'number', required: true },
  { name: 'oilCondition', label: 'Oil condition', type: 'number', required: true },
];

const MaintenancePage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/maintenance/predict', payload);
    setResult(data.result);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm title="Smart Maintenance" description="Decision Tree/Random Forest style maintenance priority and checklist." fields={fields} onSubmit={submit} result={result} loading={loading} />
      {result && <ReportButton reportType="maintenance" input={input} result={result} />}
    </div>
  );
};

export default MaintenancePage;
