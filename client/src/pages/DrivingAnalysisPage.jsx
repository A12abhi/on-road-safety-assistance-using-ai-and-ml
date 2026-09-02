import { useState } from 'react';
import ModuleForm from '../components/ModuleForm';
import ReportButton from '../components/ReportButton';
import api from '../api';

const fields = [
  'speedVariation',
  'brakingIntensity',
  'laneSwitchFrequency',
  'honkIntensity',
  'vehicleProximity',
  'trafficDensity',
  'drivingDuration',
  'roadCondition',
].map((name) => ({ name, label: name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()), type: name === 'roadCondition' ? 'text' : 'number', required: true }));

const DrivingAnalysisPage = () => {
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (payload) => {
    setLoading(true);
    const { data } = await api.post('/api/behavior/analyze', payload);
    setResult(data.result);
    setInput(payload);
    setLoading(false);
  };

  return (
    <div>
      <ModuleForm title="Driving Behavior Analysis" description="AI Safety Score, risk level, behavior category, hazard and panic cluster warning." fields={fields} onSubmit={submit} result={result} loading={loading} />
      {result && <ReportButton reportType="driving-analysis" input={input} result={result} />}
    </div>
  );
};

export default DrivingAnalysisPage;
