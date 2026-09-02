import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  { name: 'vehicleType', label: 'Vehicle type', required: true },
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number', required: true },
  { name: 'vehicleValue', label: 'Vehicle value', type: 'number', required: true },
  { name: 'usageType', label: 'Usage type', required: true },
  { name: 'previousClaims', label: 'Previous claim information', required: true },
  { name: 'coveragePreference', label: 'Coverage preference', required: true },
  { name: 'annualUsage', label: 'Approx annual usage (km)', type: 'number', required: true },
];

const InsurancePage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/insurance/recommend', payload);
    setResult(data.result);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm title="Insurance Advisory" description="Informational recommendation and comparison only (not binding quote)." fields={fields} onSubmit={submit} result={result} loading={loading} />
      {result && <ReportButton reportType="insurance" input={input} result={result} />}
    </div>
  );
};

export default InsurancePage;
