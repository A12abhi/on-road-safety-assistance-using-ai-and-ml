import AnalysisFormPage from '../components/AnalysisFormPage';

const fields = [
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number' },
  { name: 'mileage', label: 'Mileage', type: 'number' },
  { name: 'lastServiceDate', label: 'Last service date', type: 'date' },
  { name: 'engineCondition', label: 'Engine condition' },
  { name: 'brakeCondition', label: 'Brake condition' },
  { name: 'tireCondition', label: 'Tire condition' },
  { name: 'oilCondition', label: 'Oil condition' },
];

const MaintenancePage = () => (
  <AnalysisFormPage
    title="Smart Maintenance"
    endpoint="/maintenance/predict"
    fields={fields}
    reportType="Maintenance Report"
    disclaimer="Maintenance outputs are AI/ML decision-support and do not replace certified service evaluation."
    formatResult={(r) => [
      ['Maintenance Priority', r.maintenancePriority],
      ['Suggested Service', r.suggestedService],
      ['Next Service Recommendation', r.nextServiceRecommendation],
      ['Maintenance Checklist', r.maintenanceChecklist],
      ['Model', r.modelType],
    ]}
  />
);

export default MaintenancePage;
