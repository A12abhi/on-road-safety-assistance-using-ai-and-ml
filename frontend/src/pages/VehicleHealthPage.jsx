import AnalysisFormPage from '../components/AnalysisFormPage';

const conditionOptions = ['Excellent', 'Good', 'Needs Attention', 'Critical'];

const fields = [
  { name: 'engineCondition', label: 'Engine condition', type: 'select', options: conditionOptions },
  { name: 'batteryStatus', label: 'Battery status', type: 'select', options: conditionOptions },
  { name: 'tireCondition', label: 'Tire condition', type: 'select', options: conditionOptions },
  { name: 'brakeCondition', label: 'Brake condition', type: 'select', options: conditionOptions },
  { name: 'oilLevel', label: 'Oil level' },
  { name: 'coolantLevel', label: 'Coolant level' },
  { name: 'vehicleAge', label: 'Vehicle age', type: 'number' },
  { name: 'previousServiceInformation', label: 'Previous service information' },
  { name: 'mileage', label: 'Mileage', type: 'number' },
];

const VehicleHealthPage = () => (
  <AnalysisFormPage
    title="Vehicle Health Analysis"
    endpoint="/vehicle/health"
    fields={fields}
    reportType="Vehicle Health"
    disclaimer="Vehicle health output is generated from application-level AI/ML logic and should be validated through mechanic inspection."
    formatResult={(r) => [
      ['Overall Vehicle Health Score', `${r.overallVehicleHealthScore}/100`],
      ['Engine Health', r.engineHealth],
      ['Battery Health', r.batteryHealth],
      ['Brake Health', r.brakeHealth],
      ['Tire Health', r.tireHealth],
      ['Maintenance Priority', r.maintenancePriority],
      ['Recommendations', r.recommendations],
    ]}
  />
);

export default VehicleHealthPage;
