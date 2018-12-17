const API = require('./server');
const request = require('supertest');

beforeAll(() => {
  console.log('API test starting!');
});

/* Example variables */
var test_task = {
  numeroDomanda: 3,
  question: 'diametro della Terra?',
  type: 1,
  answers: ['9.742 km',
    '19.742 km',
    '12.742 km'],
  correctAnswer: '3',
  studentAnswer: '1'
};

var test_peerrev = {
  examid: 234,
  task: test_task,
  studentanswer: 3,
  mark: 30,
  description: 'The task is perfect as it is',
  deadline: 900
}

var test_exam = {
  id: 1,
  example: null,
  description: 'esame di valutazione conoscenze generali',
  deadline: 3600,
  numerotasks: 2,
  teacher: {
    id: 32,
    firstname: 'Marco',
    lastname: 'Giunta',
    email: 'marco.giunta@example.com',
    type: 'Teacher',
    identification_number: 908765
  },
  tasks: [test_task,
    {
      id: 456,
      numeroDomanda: 3,
      question: 'diametro della Luna?',
      type: 1,
      answers: [
        '4.742 km',
        '14.742 km',
        '8.742 km'
      ],
      correctAnswer: 3
    }
  ],
  students: [
    {
      id: 12,
      firstname: 'Mario',
      lastname: 'Rossi',
      email: 'mario.rossi@example.com',
      type: 'Student',
      identification_number: 345678
    }
  ]
};

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
    let res = await request(API).get('/peereview'); //endpoint inesistente
    expect.assertions(1);
    expect(res.status).toBe(404);
  });


  /* Test POST method in Peer Review */
  // Status: 201, Created
  test('PeerReview POST', async () => {
    var res = await request(API).post('/peerreview').send(test_peerrev);
    expect.assertions(1);
    expect(res.status).toBe(201);
  });

  // Status: 400, Bad request
  test('PeerReview POST', async () => {
    let test_peerr = "3";                  //Ritorna CAMPI INCOMPLETI
    var res = await request(API).post('/peerreview').send(test_peerr);
    expect.assertions(1);
    expect(res.status).toBe(400);
  });

  /* Test PUT method in Peer Review */
  // Status: 200, OK
  test('PeerReview PUT', async () => {
    let res = await request(API).put('/peerreview/2').send(test_peerrev);
    expect.assertions(2);
    expect(res.status).toBe(200);
    expect(res.get('content-type')).toContain('application/json');
  });

  /* Test GET method in Submission */
  // Status: 200, OK
  test('Submission GET', async () => {
    let res = await request(API).get('/submission');
    expect.assertions(2);
    expect(res.status).toBe(200);
    expect(res.get('content-type')).toContain('application/json');
  });

  /* Test POST method in Submission */
  // Status: 201, Created
  test('Submissions POST', async () => {
    let res = await request(API).post('/submission').send(test_exam);
    expect.assertions(2);
    expect(res.status).toBe(201);
    expect(res.get('content-type')).toContain('application/json');
  });

});

afterAll(() => {
  API.close();
});
