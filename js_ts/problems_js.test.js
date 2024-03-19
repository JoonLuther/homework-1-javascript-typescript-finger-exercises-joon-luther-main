/**
 * Write your tests here
 * We provided some tests to get you started
 */
const hw1 = require('./problems_js.js');

/**
 * Problem 2
 */
describe('Problem 2', () => {
  const data = [{ country: 'USA', year: 2007, annual_emissions: 6.06 },
    { country: 'USA', year: 2020, annual_emissions: 4.72 },
    { country: 'USA', year: 2021, annual_emissions: 5.01 },
    { country: 'China', year: 2021, annual_emissions: 11.47 },
    { country: 'India', year: 2021, annual_emissions: 2.71 },
    { country: 'Germany', year: 2021, annual_emissions: 0.67 }];

  test('compare USA and China in 2021', () => {
    const expected = [{ country: 'USA', year: 2021, annual_emissions: 5.01 },
      { country: 'China', year: 2021, annual_emissions: 11.47 }];
    const actual = hw1.compareCountries(data, 'USA', 'China', 2021);
    expect(actual).toMatchObject(expected);
  });

  test('no valid year', () => {
    const expected = [];
    const actual = hw1.compareCountries(data, 'USA', 'China', 0);
    expect(actual).toMatchObject(expected);
  });

  /** add more Problem 2 tests here */

  test('Largest emmitter 2021', () => {
    const expected = { country: 'China', year: 2021, annual_emissions: 11.47 };
    const actual = hw1.largestEmitterForYear(data, 2021);
    expect(actual).toMatchObject(expected);
  });

});

/**
 * Problem 4
 */
describe('Problem 4', () => {
  test('correct content is returned', () => {
    const b = new hw1.Box();
    const actual = hw1.withBoxUnlocked(b, (x) => {
      if (x % 2 === 0) throw new Error('Oh No! Another Exception!');
      return x * 2;
    });
    expect(actual).toEqual(['javascript', 'is', 'fun']);
  });


  /** add more Problem 4 tests here */
});



/**
 * Problem 6
 */
describe('Problem 6', () => {
  const a = new hw1.Transaction({ type: 'flowers' });
  const b = new hw1.Transaction('B');
  const c = new hw1.Transaction('C');
  
  test('store updated correctly', () => {
    a.storeDetails();
    b.storeDetails();
    c.storeDetails();
    expect(hw1.Transaction.store).toEqual([{ type: 'flowers' }, 'B', 'C']);
  });
  
  test('can access store from Transaction', () => {
    expect(hw1.Transaction.store).not.toBe(undefined);
  });

  test('storeVal.push() should throw a TypeError', () => {
    try {
      hw1.storeVal.push('cis3500');
    } catch (err) {
      expect((err instanceof TypeError)).toBe(true);
    }
  });

  /** add more Problem 6 tests here */
});

/**
 * Problem 7
 */
describe('Problem 7', () => {
  test('promiseAll resolve empty array', async () => {
    const result = await hw1.promiseAll([]);
    expect(result).toEqual([]);
  });

  /** add more Problem 7 tests here */

  // test('promiseAll simple promise array', async () => {
  //   const result = await hw1.promiseAll([hw1.getRandomNumberPromise, hw1.getRandomNumberPromise, hw1.getRandomNumberPromise]);
  //   const expected = []
  //   expect(result).toMatchObject(expected);
  // });
});

/**
 * Problem 8
 */
describe('Problem 8', () => {
  test('successful call', async () => {
    const expected = 'You are talking to Bob';
    const actual = await hw1.unreliableCallProm('Bob', 0);
    expect(actual).toBe(expected);
  });

  test('delayed call', async () => {
    const expected = 'Call to Bob was delayed by 5';
    const actual = await hw1.unreliableCallProm('Bob', 100);
    expect(actual).toBe(expected);
  }, 10000);

  /** add more Problem 8 tests here */
  test('invalid recipient', async () => {
    try {
      const actual = await hw1.unreliableCallProm('Bob', undefined);
    } catch (err) {
      expect((err instanceof Error)).toBe(true);
    }
  }, 10000);
});
