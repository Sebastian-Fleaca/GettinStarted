// Example code
/*
import request from 'supertest-as-promised'; // ??
import Api from '../src/Api';

const app = new Api().express;

describe('Flow API', () => {
  test('hello test', () => {
    return request(app).get('/peerreview')
    .expect(200)
    .then((res) => {
      expect(typeof res.body.message).toBe('string');
      expect(res.body.message).toBe('Hello Flow!');
    });
  });
});
*/

const request = require('supertest');
const app = require('./peerreview');

//const app = new Api().express;  //perché Api(). ?

beforeAll(async (request, response) => {
 // do something before anything else runs
 console.log('Jest starting!');
});

//raggruppa più test cases
describe('Tests for PeerReview', () => {
  
  test('PeerReview GET', async () => {
    return request(app).get('/peerreview')
    .then(res => expect(res.status).toBe(200))
  });
    // expect().
    
    /* O anche: ?
    return request(app).get('/peerreview')
    .expect(200)
    .then((res) => {
      expect(typeof res.body.message).toBe('string');
      expect(res.body.message).toBe('Hello Flow!');
    });
    */

  });

  test('PeerReview POST', async (request, response) => {
    response = await request(app).post('/peerreview');
    expect(response.status).toBe(201);
  });


// Example of async test
/*
test('the data is peanut butter', async () => {
  let data = await fetchData();
  expect(data).toBe('peanut butter');
})
*/

// Promise
/*
// promises bind producing and consuming codes
let promise = new Promise(function(resolve, reject) {
   // the function calls resolve(value) or reject(error)
   setTimeout1(() => resolve("done!"), 1000);
   setTimeout2(() => reject(new Error("Whoops!")), 1000); 
  }
});
*/

// Async/Await example (with promises)
/*
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  alert(result); // "done!"
}

f();
*/