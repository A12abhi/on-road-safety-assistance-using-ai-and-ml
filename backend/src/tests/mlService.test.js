const {
  behaviorAnalyze,
  fuelPredict,
  emissionAnalyze,
  maintenancePredict,
} = require('../services/mlService');

describe('mlService simulation functions', () => {
  test('behaviorAnalyze returns safety score and risk level', () => {
    const result = behaviorAnalyze({
      speedVariation: 50,
      brakingIntensity: 80,
      laneSwitchFrequency: 70,
      honkIntensity: 60,
      vehicleProximity: 75,
      trafficDensity: 80,
    });
    expect(result).toHaveProperty('aiSafetyScore');
    expect(result).toHaveProperty('riskLevel');
  });

  test('fuelPredict computes required fuel', () => {
    const result = fuelPredict({
      distanceToDestination: 120,
      averageMileage: 15,
      trafficCondition: 'Moderate',
      roadCondition: 'Good',
      currentFuelLevel: 5,
    });
    expect(result.requiredFuel).toBeGreaterThan(0);
    expect(result).toHaveProperty('estimatedRemainingRange');
  });

  test('emissionAnalyze returns status and score', () => {
    const result = emissionAnalyze({ coValue: 30, hcValue: 45, noxValue: 20, smokeLevel: 20 });
    expect(result).toHaveProperty('emissionStatus');
    expect(result).toHaveProperty('emissionScore');
  });

  test('maintenancePredict returns priority', () => {
    const result = maintenancePredict({ vehicleAge: 8, mileage: 85000, engineCondition: 'Needs Attention', brakeCondition: 'Needs Attention', tireCondition: 'Good' });
    expect(result).toHaveProperty('maintenancePriority');
  });
});
