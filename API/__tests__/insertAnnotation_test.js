const request = require("supertest");
const app = require("../app");
//const db = require("../models/db");
//const model = require("../models");

/*
 Run `npm test` in console
 */

 /*
describe('Receive annotation test', () => { 
    const OLD_ENVS = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENVS };
    });

    test("Will receive process.env varialbes", () => {
        process.env.PORT = "8080";
        process.env.SESSION_SECRET = "secret";
        process.env.MARIADB_STRING = process.env.MARIADB_LOCAL_STRING;
        process.env.TEST = true;
    });

    afterAll(() => {
        process.env = OLD_ENVS;
    });

    test('Should receives query data from frontend', async () => {
        const createAnnotationResp = await request(app).post("/annotate").send({
            annotations: {
                "text": "sampleAnnotation",
                "data": '[[0,0], [1,1]]'
            }
          });
          
          expect(createUserResp.statusCode).toEqual(200); // redirect status 302
          //expect(createUserResp.body).toHaveProperty('post')
          expect(createUserResp !== null).toBe(true);
          done();
    });

    test('It should also test true === true', async (done) => { 
      
      expect(true).toBe(true); // Checks our function returns expected result
      expect(true).toBeTruthy(); // Checks our function returns is True

      done();
    });
  });
*/
describe('Sample Test', () => { 
    test('It should test return true === true', () => {
      expect(true).toBe(true);
    });

    test('It should also test true === true', async (done) => { 
      
      expect(true).toBe(true); // Checks our function returns expected result
      expect(true).toBeTruthy(); // Checks our function returns is True

      done();
    });
  });

  // Will fill out more for TDD