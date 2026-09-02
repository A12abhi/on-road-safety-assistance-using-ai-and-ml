import AnalysisFormPage from '../components/AnalysisFormPage';

const fields = [
  { name: 'speedVariation', label: 'Speed variation', type: 'number' },
  { name: 'brakingIntensity', label: 'Braking intensity', type: 'number' },
  { name: 'laneSwitchFrequency', label: 'Lane-switch frequency', type: 'number' },
  { name: 'honkIntensity', label: 'Honk intensity', type: 'number' },
  { name: 'vehicleProximity', label: 'Vehicle proximity', type: 'number' },
  { name: 'trafficDensity', label: 'Traffic density', type: 'number' },
  { name: 'drivingDuration', label: 'Driving duration (minutes)', type: 'number' },
  { name: 'roadCondition', label: 'Road condition' },
];

const DrivingAnalysisPage = () => (
  <AnalysisFormPage
    title="Driving Behavior Analysis"
    endpoint="/behavior/analyze"
    fields={fields}
    reportType="Driving Behavior Analysis"
    disclaimer="This behavior/panic-cluster output is AI/ML simulation-based and not a real-time sensor-based guarantee."
    formatResult={(r) => [
      ['AI Safety Score', `${r.aiSafetyScore}/100`],
      ['Risk Level', r.riskLevel],
      ['Driving Category', r.drivingBehaviorCategory],
      ['Hazard Warning', r.hazardWarning],
      ['Panic Cluster Warning', r.panicClusterWarning],
      ['Cluster Density', r.clusterDensity],
      ['Recommended Action', r.recommendedAction],
      ['Contributing Features', r.contributors],
    ]}
  />
);

export default DrivingAnalysisPage;
