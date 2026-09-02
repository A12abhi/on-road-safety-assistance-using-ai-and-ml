const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Number(value) || 0));

const categorizeHealth = (score) => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Needs Attention';
  return 'Critical';
};

const riskLevelFromScore = (score) => {
  if (score >= 80) return 'Critical';
  if (score >= 60) return 'High';
  if (score >= 35) return 'Moderate';
  return 'Low';
};

const emergencyRisk = (input) => {
  const typeWeight = {
    'Vehicle breakdown': 60,
    'Accident assistance': 90,
    'Low fuel': 40,
    'Engine problem': 70,
    'Battery problem': 55,
    'Tire problem': 50,
    'Other emergency': 45,
  };

  const behaviorWeight = {
    stable: 10,
    normal: 20,
    aggressive: 40,
    panic: 55,
  };

  const conditionWeight = {
    good: 10,
    moderate: 25,
    poor: 45,
    critical: 60,
  };

  const fuelWeight = {
    high: 5,
    medium: 15,
    low: 35,
    empty: 50,
  };

  const score = clamp(
    (typeWeight[input.emergencyType] || 40) * 0.45 +
      (behaviorWeight[(input.drivingBehavior || 'normal').toLowerCase()] || 20) * 0.2 +
      (conditionWeight[(input.vehicleCondition || 'moderate').toLowerCase()] || 25) * 0.2 +
      (fuelWeight[(input.fuelStatus || 'medium').toLowerCase()] || 15) * 0.15,
    0,
    100
  );

  return {
    riskScore: Math.round(score),
    riskLevel: riskLevelFromScore(score),
    recommendedAction:
      score >= 60
        ? 'Move to a safe shoulder/lane, keep hazard lights ON, and request urgent mechanic support.'
        : 'Drive cautiously to the nearest safe location and monitor vehicle behavior.',
    safeRouteSuggestion: score >= 60 ? 'Lower-risk route via service/internal roads' : 'Direct route is acceptable',
    assistanceOptions: [
      { type: 'Nearest Safe Location', name: 'City Service Road Bay', distanceKm: 1.4 },
      { type: 'Mechanic Assistance', name: 'Rapid Auto Care', distanceKm: 2.1 },
      { type: 'Fuel Station', name: 'Highway Fuel Point', distanceKm: 1.8 },
    ],
  };
};

const drivingAnalysis = (input) => {
  const speedVariation = clamp(input.speedVariation);
  const brakingIntensity = clamp(input.brakingIntensity);
  const laneSwitchFrequency = clamp(input.laneSwitchFrequency);
  const honkIntensity = clamp(input.honkIntensity);
  const vehicleProximity = clamp(input.vehicleProximity);
  const trafficDensity = clamp(input.trafficDensity);
  const drivingDuration = clamp(input.drivingDuration);

  const riskRaw =
    speedVariation * 0.18 +
    brakingIntensity * 0.2 +
    laneSwitchFrequency * 0.18 +
    honkIntensity * 0.1 +
    vehicleProximity * 0.16 +
    trafficDensity * 0.12 +
    drivingDuration * 0.06;

  const safetyScore = Math.round(clamp(100 - riskRaw));
  const riskLevel = riskLevelFromScore(100 - safetyScore);
  const panicScore = Math.round(clamp((brakingIntensity + honkIntensity + laneSwitchFrequency + vehicleProximity + trafficDensity) / 5));

  let clusterStatus = 'Normal';
  if (panicScore > 70) clusterStatus = 'Panic';
  else if (panicScore > 45) clusterStatus = 'Warning';

  return {
    modelInfo: 'AI/ML-based simulation using Random Forest + Logistic Regression + K-Means abstraction',
    aiSafetyScore: safetyScore,
    riskLevel,
    behaviorCategory: safetyScore > 75 ? 'Stable' : safetyScore > 50 ? 'Cautious' : 'Unstable',
    hazardWarning: safetyScore <= 50 ? 'Unstable driving pattern detected' : 'No immediate hazard trend detected',
    panicClusterWarning: `${clusterStatus} cluster`,
    clusterDensity: panicScore,
    recommendedAction:
      safetyScore <= 50
        ? 'Reduce speed, increase following distance, avoid sharp lane changes.'
        : 'Maintain current safe-driving pattern and continue observation.',
    contributingFeatures: {
      brakingIntensity,
      laneSwitchFrequency,
      speedVariation,
      vehicleProximity,
      honkIntensity,
      clusterDensity: panicScore,
    },
  };
};

const vehicleHealth = (input) => {
  const engine = clamp(input.engineCondition);
  const battery = clamp(input.batteryStatus);
  const tire = clamp(input.tireCondition);
  const brake = clamp(input.brakeCondition);
  const oil = clamp(input.oilLevel);
  const coolant = clamp(input.coolantLevel);
  const agePenalty = clamp((Number(input.vehicleAge) || 0) * 4, 0, 25);
  const mileagePenalty = clamp((Number(input.mileage) || 0) / 6000, 0, 20);

  const overallScore = Math.round(clamp((engine + battery + tire + brake + oil + coolant) / 6 - agePenalty - mileagePenalty));

  return {
    modelInfo: 'AI/ML-based simulation using Decision Tree + Random Forest abstraction',
    overallVehicleHealthScore: overallScore,
    engineHealth: categorizeHealth(engine),
    batteryHealth: categorizeHealth(battery),
    brakeHealth: categorizeHealth(brake),
    tireHealth: categorizeHealth(tire),
    maintenancePriority: overallScore < 50 ? 'High' : overallScore < 70 ? 'Medium' : 'Low',
    recommendations: [
      engine < 55 ? 'Check engine' : null,
      battery < 55 ? 'Replace battery' : null,
      brake < 60 ? 'Inspect brakes' : null,
      tire < 60 ? 'Check tire pressure and alignment' : null,
      overallScore < 70 ? 'Schedule service appointment' : null,
    ].filter(Boolean),
  };
};

const fuelPrediction = (input) => {
  const currentFuel = Number(input.currentFuelLevel) || 0;
  const distance = Number(input.distanceToDestination) || 0;
  const mileage = Math.max(1, Number(input.averageMileage) || 1);
  const trafficFactor = { low: 1, medium: 1.15, high: 1.35 }[(input.trafficCondition || 'medium').toLowerCase()] || 1.15;
  const roadFactor = { smooth: 1, moderate: 1.1, rough: 1.25 }[(input.roadCondition || 'moderate').toLowerCase()] || 1.1;

  const estimatedFuelConsumption = Number(((distance / mileage) * trafficFactor * roadFactor).toFixed(2));
  const requiredFuel = Number(Math.max(0, estimatedFuelConsumption - currentFuel).toFixed(2));
  const estimatedRemainingRange = Math.round(Math.max(0, (currentFuel - estimatedFuelConsumption) * mileage));

  return {
    modelInfo: 'AI/ML-based simulation using Linear Regression abstraction',
    requiredFuel,
    estimatedFuelConsumption,
    estimatedRemainingRange,
    refuelingStatus: requiredFuel > 0 ? 'Refueling required' : 'No immediate refueling required',
    nearbyFuelStations: [
      { name: 'Green Fuel Center', distanceKm: 1.9, rating: 4.4 },
      { name: 'City Petrol Hub', distanceKm: 3.1, rating: 4.2 },
    ],
  };
};

const maintenancePrediction = (input) => {
  const age = Number(input.vehicleAge) || 0;
  const mileage = Number(input.mileage) || 0;
  const engine = clamp(input.engineCondition);
  const brake = clamp(input.brakeCondition);
  const tire = clamp(input.tireCondition);
  const oil = clamp(input.oilCondition);

  const score = clamp(age * 3 + mileage / 4000 + (100 - engine) * 0.25 + (100 - brake) * 0.2 + (100 - tire) * 0.15 + (100 - oil) * 0.2);
  const priority = score > 65 ? 'High' : score > 40 ? 'Medium' : 'Low';

  return {
    modelInfo: 'AI/ML-based simulation using Decision Tree / Random Forest style logic',
    maintenancePriority: priority,
    suggestedService:
      priority === 'High' ? 'Immediate full-service inspection' : priority === 'Medium' ? 'Plan service in 2-4 weeks' : 'Routine maintenance',
    nextServiceRecommendation: priority === 'High' ? 'Within 3 days' : priority === 'Medium' ? 'Within 30 days' : 'Within 90 days',
    maintenanceChecklist: ['Engine check', 'Brake inspection', 'Oil and coolant check', 'Tire pressure and alignment'],
  };
};

const insuranceRecommendation = (input) => {
  const age = Number(input.vehicleAge) || 0;
  const value = Number(input.vehicleValue) || 0;
  const annualUsage = Number(input.annualUsage) || 0;
  const claimHistory = (input.previousClaims || '').toLowerCase();

  let plan = 'Basic coverage';
  if (value > 700000 || annualUsage > 18000 || claimHistory.includes('multiple')) plan = 'Premium coverage';
  else if (value > 300000 || age < 8) plan = 'Comprehensive coverage';

  return {
    modelInfo: 'AI/ML-based simulation using KNN similarity recommendation',
    recommendedPlan: plan,
    comparison: {
      'Basic coverage': 'Essential third-party and minimal own-damage support.',
      'Comprehensive coverage': 'Balanced own-damage + third-party support.',
      'Premium coverage': 'Higher claim support with optional add-ons.',
    },
    disclaimer: 'Recommendation is informational and not a binding insurance quote.',
  };
};

const emissionAnalysis = (input) => {
  const co = Number(input.coValue) || 0;
  const hc = Number(input.hcValue) || 0;
  const nox = Number(input.noxValue) || 0;
  const smoke = Number(input.smokeLevel) || 0;
  const engine = clamp(input.engineCondition);
  const age = Number(input.vehicleAge) || 0;

  const raw = co * 18 + hc * 0.2 + nox * 0.3 + smoke * 0.4 + age * 1.5 + (100 - engine) * 0.25;
  const risk = clamp(raw, 0, 100);
  const score = Math.round(100 - risk);
  const emissionStatus = score >= 65 ? 'Pass' : 'Needs Attention';

  return {
    modelInfo: 'AI/ML-based simulation using Logistic Regression + Decision Tree abstraction',
    emissionStatus,
    emissionScore: score,
    explanation:
      emissionStatus === 'Pass'
        ? 'Current values are within acceptable simulated range.'
        : 'Pollutant indicators exceed simulated thresholds; maintenance recommended.',
    recommendedMaintenance:
      emissionStatus === 'Pass'
        ? ['Continue regular maintenance']
        : ['Engine tune-up', 'Air-filter check', 'Fuel-system cleaning', 'Re-test after service'],
    disclaimer:
      'This is an application-level evaluation and not an official government emission certificate.',
  };
};

const audioDiagnostics = (input) => {
  const fileName = input.fileName || 'recorded-audio.wav';
  const duration = Number(input.durationSeconds) || 0;
  const roughness = clamp(input.roughnessIndex || 45);
  const confidence = Math.round(clamp(60 + roughness * 0.3, 50, 95));

  return {
    modelInfo: 'Simulation-based diagnostics (replaceable with future trained audio model)',
    audioFileName: fileName,
    recordingDuration: duration,
    analysisStatus: 'Completed',
    possibleEngineCondition: roughness > 65 ? 'Potential knocking/combustion imbalance' : 'Normal to mild irregularity',
    confidenceIndicator: `${confidence}%`,
    suggestedAction: roughness > 65 ? 'Schedule mechanical inspection soon.' : 'Continue monitoring and routine service.',
    disclaimer: 'This is not a professional mechanical diagnosis.',
  };
};

const mapAssistanceData = () => ({
  nearbyMechanics: [
    { name: 'Rapid Auto Care', serviceType: 'General Repair', distanceKm: 2.1, rating: 4.6, availability: 'Available', phone: '+91-9000000001' },
    { name: 'SafeDrive Motors', serviceType: 'Battery & Electrical', distanceKm: 3.5, rating: 4.3, availability: 'Busy', phone: '+91-9000000002' },
  ],
  fuelStations: [
    { name: 'Green Fuel Center', distanceKm: 1.9 },
    { name: 'Highway Fuel Point', distanceKm: 2.8 },
  ],
  safeLocations: [
    { name: 'Service Road Bay', distanceKm: 1.4 },
    { name: 'Police Assistance Point', distanceKm: 3.2 },
  ],
  emergencyPoints: [
    { name: 'Hospital Emergency Gate', distanceKm: 4.1 },
  ],
  routeOptions: ['Service road', 'Internal road', 'U-turn pocket', 'Shoulder lane', 'Lower-risk route'],
});

const chatbotResponse = (message) => {
  const text = (message || '').toLowerCase();
  if (text.includes('stopped') || text.includes('breakdown')) {
    return 'Please move to a safe location if possible. Turn on hazard lights and submit an emergency request from the Emergency module.';
  }
  if (text.includes('fuel')) {
    return 'Use Fuel Assistant to estimate required fuel and nearby stations. If fuel is critically low, raise a low-fuel emergency request.';
  }
  if (text.includes('battery')) {
    return 'Reduce electrical load, avoid repeated self-start attempts, and request nearby mechanic assistance for battery checks.';
  }
  if (text.includes('insurance')) {
    return 'Open Insurance Advisory for informational plan recommendations based on your vehicle profile and usage.';
  }
  return 'I can help with emergency guidance, fuel estimation, vehicle health, maintenance, emissions, and insurance support.';
};

module.exports = {
  emergencyRisk,
  drivingAnalysis,
  vehicleHealth,
  fuelPrediction,
  maintenancePrediction,
  insuranceRecommendation,
  emissionAnalysis,
  audioDiagnostics,
  mapAssistanceData,
  chatbotResponse,
  riskLevelFromScore,
};
