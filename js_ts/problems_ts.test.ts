const hw1 = require('./problems_ts.ts');

/**
 * Problem 1
 */
describe('Problem 1', () => {
  test('flatten list', () => {
    let arrays = [[1, 2, 3], [4, 5], [6]];
    let expected = [1,2,3,4,5,6];
    const actual = hw1.flatten(arrays);
    expect(actual).toMatchObject(expected);
  });
});

/**
 * Problem 3
 */
describe('Problem 3', () => {
  /** add Problem 3 tests here */
  test('product 1', () => {
    let a = 3;
    let b = 5;
    let expected = 15;
    const actual = hw1.retry(a,b);
    expect(actual).toEqual(expected);
  });
  test('product 2', () => {
    let a = 5;
    let b = 6;
    let expected = 30;
    const actual = hw1.retry(a,b);
    expect(actual).toEqual(expected);
  });
});

/**
 * Problem 5
 */
describe('Problem 5', () => {
  test('create linkedlist', () => {
    let expected = {value: 10, rest: {value: 20, rest: {value: 30, rest: null}}};
    const actual = hw1.arrayToList([10,20,30]);
    expect(actual).toMatchObject(expected);
  });

  /** add more Problem 5 tests here */
  test('create linkedlist one elem', () => {
    let expected = {value: 1, rest: null};
    const actual = hw1.arrayToList([1]);
    expect(actual).toMatchObject(expected);
  });

  test('create linkedlist empty', () => {
    let expected = {};
    const actual = hw1.arrayToList([]);
    expect(actual).toMatchObject(expected);
  });

  test('create array', () => {
    let expected = [10,20,30];
    let input = {value: 10,rest: {value: 20,rest: {value: 30,rest: null}}};
    const actual = hw1.listToArray(input);
    expect(actual).toMatchObject(expected);
  });

  test('prepend', () => {
    let expected = {value: 10,rest: {value: 20,rest:null}};
    const actual = hw1.prepend(10, hw1.prepend(20, null));
    expect(actual).toMatchObject(expected);
  });

  test('nth', () => {
    let expected = 2;
    const actual = hw1.nth({value: 1,rest: {value: 2,rest:null}}, 1);
    expect(actual).toEqual(expected);
  });

  test('nth out of range', () => {
    try {
      const actual = hw1.nth({value: 1,rest: {value: 2,rest:null}}, 2);
    } catch (err) {
      expect((err instanceof Error)).toBe(true);
    }
  });
});

/**
 * Problem 9
 */
describe('Problem 9', () => {
  /** write your tests here */
  test('closest country', async () => {
    const actual = await hw1.closestSizesCountries('Canada');
    let expected = {properties: { country: 'China', delta: 277709.0 }};
    await expect(actual).toMatchObject(expected);
  });

  test('closest country', async () => {
    const actual = await hw1.closestSizesCountries('Antarctica');
    let expected = {properties: { country: 'Russia', delta: 3098242.0 }};
    await expect(actual).toMatchObject(expected);
  });

});
