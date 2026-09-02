const LEVELS = ['Low', 'Moderate', 'High', 'Critical'];

const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const riskLabel = (score) => {
  if (score < 35) return LEVELS[0];
  if (score < 60) return LEVELS[1];
  if (score < 80) return LEVELS[2];
  return LEVELS[3];
};

const behaviorAnalyze = (input) => {
  const score = clamp(
    100 - (
      Number(input.speedVariation || 0) * 0.18 +
      Number(input.brakingIntensity || 0) * 0.22 +
      Number(input.laneSwitchFrequency || 0) * 0.2 +
      Number(input.honkIntensity || 0) * 0.1 +
      Number(input.vehicleProximity || 0) * 0.2 +
      Number(input.trafficDensity || 0) * 0.1
    ),
  );
  const riskLevel = riskLabel(100 - score);
  const panicScore = clamp((Number(input.brakingIntensity || 0) + Number(input.honkIntensity || 0) + Number(input.laneSwitchFrequency || 0)) / 3);
  const clusterStatus = panicScore > 75 ? 'Panic' : panicScore > 50 ? 'Warning' : 'Normal';
  return {
    aiSafetyScore: Number(score.toFixed(1)),
    riskLevel,
    drivingBehaviorCategory: score > 75 ? 'Stable' : score > 50 ? 'Needs Caution' : 'Unstable',
    hazardWarning: riskLevel === 'High' || riskLevel === 'Critical' ? 'Unstable driving pattern detected' : 'No immediate hazard',
    panicClusterWarning: clusterStatus,
    clusterDensity: Number((panicScore / 100).toFixed(2)),
    recommendedAction: score < 50 ? 'Reduce speed, avoid abrupt braking, increase safe distance.' : 'Maintain current pattern and monitor traffic changes.',
    contributors: ['Braking intensity', 'Lane switching', 'Speed variation', 'Vehicle proximity', 'Honk intensity', 'Cluster density'],
    modelType: 'Random Forest + K-Means simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const emergencyRisk = (input) => {
  const map = {
    accident: 90,
    'vehicle breakdown': 70,
    'engine problem': 75,
    'battery problem': 65,
    'tire problem': 60,
    'low fuel': 45,
    other: 55,
  };
  const base = map[(input.emergencyType || '').toLowerCase()] || 50;
  const fuelPenalty = input.fuelStatus?.toLowerCase().includes('low') ? 15 : 0;
  const conditionPenalty = input.vehicleCondition?.toLowerCase().includes('poor') ? 15 : 0;
  const score = clamp(base + fuelPenalty + conditionPenalty);
  const level = riskLabel(score);
  const recommendedAction = level === 'Critical'
    ? 'Call emergency support, move away from traffic, and share live location.'
    : level === 'High'
      ? 'Move to safer shoulder, switch on hazard lights, request mechanic support.'
      : 'Proceed with caution and track nearby assistance points.';
  return {
    riskScore: score,
    riskLevel: level,
    recommendedAction,
    nearestSafeLocation: 'Nearest police/help booth or fuel station (simulated suggestion)',
    modelType: 'Decision Tree simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const vehicleHealth = (input) => {
  const params = ['engineCondition', 'batteryStatus', 'tireCondition', 'brakeCondition'];
  const scoreMap = { excellent: 95, good: 80, 'needs attention': 55, critical: 25 };
  const scoreAvg = params.reduce((sum, key) => {
    const v = String(input[key] || 'good').toLowerCase();
    return sum + (scoreMap[v] || 70);
  }, 0) / params.length;

  const agePenalty = Number(input.vehicleAge || 0) * 1.2;
  const mileagePenalty = Number(input.mileage || 0) / 10000;
  const overall = clamp(scoreAvg - agePenalty - mileagePenalty);

  const label = overall > 85 ? 'Excellent' : overall > 70 ? 'Good' : overall > 45 ? 'Needs Attention' : 'Critical';
  return {
    overallVehicleHealthScore: Number(overall.toFixed(1)),
    engineHealth: input.engineCondition,
    batteryHealth: input.batteryStatus,
    brakeHealth: input.brakeCondition,
    tireHealth: input.tireCondition,
    maintenancePriority: label,
    recommendations: [
      'Check engine tune-up schedule',
      'Inspect brake pads and fluid',
      'Check tire pressure and alignment',
      'Validate battery terminals and charge',
    ],
    modelType: 'Random Forest simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const fuelPredict = (input) => {
  const distance = Number(input.distanceToDestination || 0);
  const mileage = Math.max(1, Number(input.averageMileage || 1));
  const trafficMultiplier = input.trafficCondition === 'High' ? 1.2 : input.trafficCondition === 'Moderate' ? 1.1 : 1;
  const roadMultiplier = input.roadCondition === 'Poor' ? 1.15 : 1;
  const consumption = (distance / mileage) * trafficMultiplier * roadMultiplier;
  const required = Number(consumption.toFixed(2));
  const fuelLevel = Number(input.currentFuelLevel || 0);
  const remainingRange = Number((fuelLevel * mileage / trafficMultiplier).toFixed(2));
  return {
    requiredFuel: required,
    estimatedFuelConsumption: required,
    estimatedRemainingRange: remainingRange,
    refuelingStatus: remainingRange < distance ? 'Refueling Required' : 'Sufficient Fuel',
    modelType: 'Linear Regression simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const maintenancePredict = (input) => {
  const score = clamp(
    100 - (
      Number(input.vehicleAge || 0) * 4 +
      Number(input.mileage || 0) / 5000 +
      (String(input.engineCondition).toLowerCase().includes('critical') ? 30 : 0) +
      (String(input.brakeCondition).toLowerCase().includes('attention') ? 20 : 0) +
      (String(input.tireCondition).toLowerCase().includes('attention') ? 15 : 0)
    ),
  );
  return {
    maintenancePriority: score > 70 ? 'Routine' : score > 45 ? 'High' : 'Immediate',
    suggestedService: score > 70 ? 'General inspection and fluid top-up' : 'Brake, tire and engine inspection required',
    nextServiceRecommendation: score > 70 ? 'Within 90 days' : score > 45 ? 'Within 30 days' : 'Within 7 days',
    maintenanceChecklist: ['Engine oil check', 'Brake pad inspection', 'Coolant level check', 'Tire pressure and tread check'],
    modelType: 'Decision Tree + Random Forest simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const insuranceRecommend = (input) => {
  const age = Number(input.vehicleAge || 0);
  const claims = String(input.previousClaimInformation || '').toLowerCase().includes('yes');
  const usage = Number(input.approximateAnnualUsage || 0);
  const vehicleValue = Number(input.vehicleValue || 0);
  const risk = clamp(age * 6 + (claims ? 25 : 5) + usage / 1000);
  const plan = risk > 70 || vehicleValue > 800000 ? 'Premium coverage' : risk > 45 ? 'Comprehensive coverage' : 'Basic coverage';
  return {
    recommendation: plan,
    comparison: [
      { type: 'Basic coverage', bestFor: 'Low usage and older vehicles' },
      { type: 'Comprehensive coverage', bestFor: 'Balanced protection and cost' },
      { type: 'Premium coverage', bestFor: 'High value/high usage vehicles' },
    ],
    disclaimer: 'Recommendation is informational only and not a binding insurance quote.',
    modelType: 'Logistic Regression + KNN simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const emissionAnalyze = (input) => {
  const co = Number(input.coValue || 0);
  const hc = Number(input.hcValue || 0);
  const nox = Number(input.noxValue || 0);
  const smoke = Number(input.smokeLevel || 0);
  const penalty = co * 0.8 + hc * 0.1 + nox * 0.5 + smoke * 0.7;
  const score = clamp(100 - penalty);
  return {
    emissionStatus: score > 65 ? 'Pass' : 'Needs Attention',
    emissionScore: Number(score.toFixed(1)),
    explanation: score > 65 ? 'Emissions are within acceptable simulated limits.' : 'Emission values indicate likely maintenance requirement.',
    recommendedMaintenance: score > 65 ? 'Maintain periodic service schedule.' : 'Check catalytic converter, combustion efficiency and filters.',
    disclaimer: 'Application-level evaluation only, not an official government emission certificate.',
    modelType: 'Decision Tree simulation',
    analysisMode: 'AI/ML simulation-based result',
  };
};

const audioDiagnostics = ({ fileName, duration = 0 }) => {
  const tag = fileName?.toLowerCase() || '';
  const condition = tag.includes('knock') ? 'Possible engine knocking pattern' : tag.includes('rough') ? 'Possible rough idling pattern' : 'No severe anomaly detected in sample';
  const confidence = tag.includes('knock') || tag.includes('rough') ? 0.83 : 0.67;
  return {
    audioFileName: fileName,
    recordingDuration: duration,
    analysisStatus: 'Completed',
    possibleEngineCondition: condition,
    confidenceIndicator: confidence,
    suggestedAction: confidence > 0.8 ? 'Schedule mechanic inspection soon.' : 'Continue monitoring and run another sample after warm-up.',
    modelType: 'Audio classification simulation',
    analysisMode: 'Simulation-based result (not professional mechanical diagnosis)',
  };
};

const chatRespond = (question) => {
  const q = String(question || '').toLowerCase();
  if (q.includes('stopped') || q.includes('breakdown')) {
    return 'Please move to a safe location if possible, turn on hazard lights, and create an Emergency Assistance request from the emergency module.';
  }
  if (q.includes('fuel')) return 'Use Fuel Assistant to estimate required fuel and nearby station options before continuing your trip.';
  if (q.includes('battery')) return 'Switch off non-essential electrical loads and request mechanic/battery assistance from the mechanics module.';
  if (q.includes('emission')) return 'Use Emission Testing to evaluate CO/HC/NOx/smoke levels and follow recommended maintenance actions.';
  return 'I can help with emergency steps, fuel planning, maintenance, emission checks, insurance guidance, and mechanic support.';
};

module.exports = {
  behaviorAnalyze,
  emergencyRisk,
  vehicleHealth,
  fuelPredict,
  maintenancePredict,
  insuranceRecommend,
  emissionAnalyze,
  audioDiagnostics,
  chatRespond,
  riskLabel,
};
