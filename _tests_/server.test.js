const API = require('./server');
const request = require('supertest');

beforeAll(() => {
 console.log('API test starting!');
});

/* Test cases for Peer Review and Submission */
describe('Tests for PeerReview and Submissions', () => {
  
  /* Test GET method in Peer Review */
  // Status: 200, OK
  test('Peerreview GET', async () => {
    let res = await request(API).get('/peerreview');
    expect.assertions(2);
    expect(res.status).toBe(200);
    expect(res.get('content-type')).toContain('application/json');
  });

  // Status: 404, Not found
  test('Peerreview GET', async () => {
    let res = await request(API).get('/peereview');
    expect.assertions(1);
    expect(res.status).toBe(404);
  });


  /* Test POST method in Peer Review */
  // Status: 201, Created
  test('PeerReview POST', async () => {
    var res = await request(API).post('/peerreview');
    expect.assertions(1);
    expect(res.status).toBe(201);
  });

  // Status: 400, Bad request
  test('PeerReview POST', async () => {
    let test_task = "3";
    var res = await request(API).post('/peerreview').send(test_task);
    expect.assertions(1);
    expect(res.status).toBe(400);
  });
  
  // Status: 409, Conflict
  test('PeerReview POST', async () => {
    let test_task = await {id: 1358,
                     numeroDomanda: 2,
                     question: 'diametro della Terra?',
                     type: 1,
                     answers: ['9.742 km',
                               '19.742 km',
                               '12.742 km'],
                     correctAnswer: '3',
                     studentAnswer: '1'};
    var res = await request(API).post('/peerreview').send(test_task);
    expect.assertions(1);
    expect(res.status).toBe(409);
  });

  /* Test PUT method in Peer Review */
  test('PeerReview PUT', async () => {
    let res = await request(API).put('/peerreview/123456');
    expect.assertions(2);
    expect(res.get('content-type')).toContain('application/json');
    expect(res.status).toBe(200);
  });

  /* Test POST method in Submission */
  test('Submissions POST', async () => {
    let res = await request(API).post('/submissions');
    expect.assertions(2);
    expect(res.status).toBe(201);
    expect(res.get('content-type')).toContain('application/json');
  });

});

afterAll(() => {
  API.close();
});