import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  { name: 'vehicleType', label: 'Vehicle type', required: true },
  { name: 'fuelType', label: 'Fuel type', required: true },
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number', required: true },
  { name: 'mileage', label: 'Mileage', type: 'number', required: true },
  { name: 'engineCondition', label: 'Engine condition', type: 'number', required: true },
  { name: 'coValue', label: 'CO value', type: 'number', required: true },
  { name: 'hcValue', label: 'HC value', type: 'number', required: true },
  { name: 'noxValue', label: 'NOx value', type: 'number', required: true },
  { name: 'smokeLevel', label: 'Smoke level', type: 'number', required: true },
];

const EmissionPage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/emission/analyze', payload);
    setResult(data.result);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm
        title="Emission Testing"
        description="Application-level emission evaluation only (not official certificate)."
        fields={fields}
        onSubmit={submit}
        result={result}
        loading={loading}
        disclaimer="Result is an app-level evaluation unless connected to authorized testing service."
      />
      {result && <ReportButton reportType="emission" input={input} result={result} />}
    </div>
  );
};

export default EmissionPage;
