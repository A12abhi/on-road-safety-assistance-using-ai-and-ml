const { emergencyRisk, fuelPrediction, emissionAnalysis, drivingAnalysis } = require('../services/mlService');

describe('ml service simulation functions', () => {
  test('emergencyRisk returns high/critical for severe input', () => {
    const result = emergencyRisk({
      emergencyType: 'Accident assistance',
      drivingBehavior: 'panic',
      vehicleCondition: 'critical',
      fuelStatus: 'empty',
    });

    expect(result.riskScore).toBeGreaterThan(70);
    expect(['High', 'Critical']).toContain(result.riskLevel);
  });

  test('fuelPrediction computes required fuel', () => {
    const result = fuelPrediction({
      currentFuelLevel: 3,
      distanceToDestination: 120,
      averageMileage: 20,
      trafficCondition: 'high',
      roadCondition: 'rough',
    });

    expect(result.requiredFuel).toBeGreaterThan(0);
    expect(result.refuelingStatus).toMatch(/required/i);
  });

  test('emissionAnalysis returns pass/fail style response', () => {
    const result = emissionAnalysis({
      coValue: 1.5,
      hcValue: 210,
      noxValue: 120,
      smokeLevel: 35,
      engineCondition: 55,
      vehicleAge: 8,
    });

    expect(result).toHaveProperty('emissionStatus');
    expect(['Pass', 'Needs Attention']).toContain(result.emissionStatus);
  });

  test('drivingAnalysis returns safety score bounds', () => {
    const result = drivingAnalysis({
      speedVariation: 60,
      brakingIntensity: 65,
      laneSwitchFrequency: 55,
      honkIntensity: 40,
      vehicleProximity: 70,
      trafficDensity: 75,
      drivingDuration: 50,
    });

    expect(result.aiSafetyScore).toBeGreaterThanOrEqual(0);
    expect(result.aiSafetyScore).toBeLessThanOrEqual(100);
  });
});
