/*
 Run `npm test` in console
 */
describe('Sample Test', () => { 
    test('It should test return true === true', () => {
      expect(true).toBe(true);
    });
    test('It should test return true === true', () => {
        expect(true).toBe(true);
      });
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