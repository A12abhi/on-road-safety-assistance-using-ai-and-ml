import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  'engineCondition',
  'batteryStatus',
  'tireCondition',
  'brakeCondition',
  'oilLevel',
  'coolantLevel',
  'vehicleAge',
  'previousServiceInformation',
  'mileage',
].map((name) => ({ name, label: name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()), type: name === 'previousServiceInformation' ? 'text' : 'number', required: true }));

const VehicleHealthPage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/vehicle/health', payload);
    setResult(data.result);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm title="Vehicle Health Analysis" description="Generate overall and subsystem health with maintenance priority." fields={fields} onSubmit={submit} result={result} loading={loading} />
      {result && <ReportButton reportType="vehicle-health" input={input} result={result} />}
    </div>
  );
};

export default VehicleHealthPage;
