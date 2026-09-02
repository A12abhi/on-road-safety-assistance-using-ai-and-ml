const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

const app = require('../app');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

describe('auth and protected endpoints', () => {
  test('register, login, and submit emergency request', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '9999999999',
      password: 'Password123',
      vehicle: { vehicleType: 'Car', fuelType: 'Petrol', age: 4, mileage: 40000 },
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.user.email).toBe('demo@example.com');

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'demo@example.com',
      password: 'Password123',
    });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty('token');

    const emergencyRes = await request(app)
      .post('/api/emergency')
      .set('Authorization', 'Token ' + loginRes.body.token)
      .send({
        currentLocation: 'City Center',
        destination: 'Industrial Area',
        vehicleType: 'Car',
        emergencyType: 'Engine problem',
        vehicleCondition: 'poor',
        fuelStatus: 'low',
        drivingBehavior: 'aggressive',
        description: 'Engine warning light ON',
      });

    expect(emergencyRes.statusCode).toBe(201);
    expect(emergencyRes.body.data).toHaveProperty('riskLevel');
  });

  test('rejects unauthenticated request', async () => {
    const response = await request(app).get('/api/history');
    expect(response.statusCode).toBe(401);
  });
});
