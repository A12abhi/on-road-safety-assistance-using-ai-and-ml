const request = require('supertest');
const app = require('../app');

describe('API health route', () => {
  test('GET /api/health should return service message', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
