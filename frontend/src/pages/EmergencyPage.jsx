import AnalysisFormPage from '../components/AnalysisFormPage';

const fields = [
  { name: 'currentLocation', label: 'Current location' },
  { name: 'destination', label: 'Destination' },
  { name: 'vehicleType', label: 'Vehicle type' },
  { name: 'emergencyType', label: 'Emergency type', type: 'select', options: ['Vehicle breakdown', 'Accident', 'Low fuel', 'Engine problem', 'Battery problem', 'Tire problem', 'Other'] },
  { name: 'vehicleCondition', label: 'Vehicle condition', type: 'select', options: ['Good', 'Needs Attention', 'Poor'] },
  { name: 'fuelStatus', label: 'Fuel status', type: 'select', options: ['Full', 'Half', 'Low'] },
  { name: 'drivingBehavior', label: 'Driving behavior' },
  { name: 'description', label: 'Issue description', type: 'textarea' },
];

const EmergencyPage = () => (
  <AnalysisFormPage
    title="Emergency Assistance"
    endpoint="/emergency"
    fields={fields}
    submitLabel="Submit Emergency Request"
    reportType="Emergency Report"
    disclaimer="Risk levels are AI/ML simulation-based guidance and are not a replacement for official emergency services."
    formatResult={(r) => [
      ['Risk Score', r.riskScore],
      ['Risk Level', r.riskLevel],
      ['Recommended Action', r.recommendedAction],
      ['Nearest Safe Location', r.nearestSafeLocation],
      ['Model', r.modelType],
      ['Analysis Mode', r.analysisMode],
    ]}
  />
);

export default EmergencyPage;
