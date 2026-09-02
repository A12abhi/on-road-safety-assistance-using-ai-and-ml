import AnalysisFormPage from '../components/AnalysisFormPage';

const fields = [
  { name: 'vehicleType', label: 'Vehicle type' },
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number' },
  { name: 'vehicleValue', label: 'Vehicle value', type: 'number' },
  { name: 'usageType', label: 'Usage type', type: 'select', options: ['Personal', 'Commercial', 'Mixed'] },
  { name: 'previousClaimInformation', label: 'Previous claim information', type: 'select', options: ['Yes', 'No'] },
  { name: 'coveragePreference', label: 'Coverage preference', type: 'select', options: ['Basic', 'Comprehensive', 'Premium'] },
  { name: 'approximateAnnualUsage', label: 'Approximate annual usage (km)', type: 'number' },
];

const InsurancePage = () => (
  <AnalysisFormPage
    title="Insurance Advisory"
    endpoint="/insurance/recommend"
    fields={fields}
    reportType="Insurance Recommendation"
    disclaimer="Insurance recommendations are informational only and are not a legal/financial quote or policy commitment."
    formatResult={(r) => [
      ['Recommendation', r.recommendation],
      ['Comparison', r.comparison?.map((item) => `${item.type}: ${item.bestFor}`)],
      ['Disclaimer', r.disclaimer],
      ['Model', r.modelType],
    ]}
  />
);

export default InsurancePage;
