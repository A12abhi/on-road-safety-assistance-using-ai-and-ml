import AnalysisFormPage from '../components/AnalysisFormPage';

const fields = [
  { name: 'vehicleType', label: 'Vehicle type' },
  { name: 'fuelType', label: 'Fuel type' },
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number' },
  { name: 'mileage', label: 'Mileage', type: 'number' },
  { name: 'engineCondition', label: 'Engine condition' },
  { name: 'coValue', label: 'CO value', type: 'number' },
  { name: 'hcValue', label: 'HC value', type: 'number' },
  { name: 'noxValue', label: 'NOx value', type: 'number' },
  { name: 'smokeLevel', label: 'Smoke level', type: 'number' },
];

const EmissionPage = () => (
  <AnalysisFormPage
    title="Emission Testing"
    endpoint="/emission/analyze"
    fields={fields}
    reportType="Emission Evaluation"
    disclaimer="This emission output is an application-level evaluation, not an official government emission certificate."
    formatResult={(r) => [
      ['Emission Status', r.emissionStatus],
      ['Emission Score', `${r.emissionScore}/100`],
      ['Explanation', r.explanation],
      ['Recommended Maintenance', r.recommendedMaintenance],
      ['Disclaimer', r.disclaimer],
    ]}
  />
);

export default EmissionPage;
