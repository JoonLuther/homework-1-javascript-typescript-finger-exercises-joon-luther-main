/**
 * Setup:
 *  Verify that node.js is installed correctly on your computer
 *  Run the following command (in the terminal)
 *      Run npm install (to install all the required packages)
 *      run npm run lint (to run eslint). However, we recommend 
 *      installing the VS Code plugin; it will flag errors in real-time
 *      Run npm run test (to run your tests)
 *
 * Grading:
 *  Correctness: 60%
 *  Testing: 25%
 *  Style/Linting: 15%
 * 
 *  Remove all debugging statements (console.log) before submitting 
 *  your solution, -5 points otherwise.
 *  Remove all the disabled Eslint rules (when indicated)
 *  in this file, -5 points otherwise.
 */

/**
 * This file contains problems 1, 3, 5, 9
 * Do not forget to comment your functions
 */


//import axios for problem 9 
const axios = require('axios');

/**
 * Problem 1: Flattening
 * Use the reduce method in combination with the concat
 * method to “flatten” an array of arrays into a single array
 * that has all the elements of the original arrays.
 * flatten returns the flattened array
 * e.g. let arrays = [[1, 2, 3], [4, 5], [6]];
 * flatten(arrays) => [1, 2, 3, 4, 5, 6]
 * 
 */



function flatten(arr) {
  /** your code here */
  return arr.reduce((acc, curr) => {
    return acc.concat(curr);
  }, []);
}
  



/**
 * Problem 3: Retry Calculation
 * Say you have a function partialMultiply that in 30 percent
 * of cases multiplies two numbers and in the other 70 percent
 * of cases raises an exception/error of type OurCustomError.
 * Write a function that wraps this function and
 * keeps trying until a call succeeds, after which
 * it returns the result.
 * Only handle only the OurCustomError exception.
 * Example: console.log(retry(8, 8)); => 64
 */

class OurCustomError extends Error {}
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns a * b 30% of the time and throw an exception
 * 70% of the time
 */
function partialMultiply(a, b) {
  if (b === 0) { throw new Error('illegal argument'); }
  if (Math.random() < 0.3) {
    return a * b;
  }
  throw new OurCustomError('failed');
}


function retry(a, b) {
  /** your code here */
  let done = false;
  let product = 0;
  while(!done) {
    try {
      product = partialMultiply(a,b);
      done = true;
    } catch(error) {
      done = false;
    }
  }
  return product;
}


/**
 * Problem 5: linkedlist
 * A list is a common data structure
 * A linkedlist is a nested set of objects, with the first object
 * holding a reference to the second,
 * the second to the third, and so on.
 * let list = {value: 1,rest: {value: 2,rest: {value: 3,rest: null}}};
 *
 */

/**
  * 5.1 Write a function arrayToList that builds up and returns
  * a list structure like the one shown above.
  * console.log(arrayToList([10, 20]));
  * => {value: 10, rest: {value: 20, rest: null}}
  */

function makeList(arr) {
  if (arr.length === 0)
    return {};
  else if (arr.length === 1) 
    return {value: arr[0], rest: null};
  else {
    return {value: arr[0], rest: makeList(arr.slice(1))}
  }
}


function arrayToList(arr) {
  /** your code here */
  return makeList(arr);
}

/**
    * 5.2 Write the listToArray function that produces an array from a list.
    * const list = {value: 10,rest: {value: 20,rest: {value: 30,rest: null}}};
    * console.log(listToArray(list));
    * => [10, 20, 30]
    */


function listToArray(list) {
  /** your code here */ 
  const result = [];
  while(list != null) {
    result.push(Number(list.value));
    list = list.rest;
  }
  return result;
}

/**
    * 5.3 Add a helper function prepend, which takes
    * an element and a list and creates a new list that
    * adds the element to the front of the input list
    * console.log(prepend(10, prepend(20, null)));
    * => {value: 10, rest: {value: 20, rest: null}}
    * let l = {value: 1,rest: {value: 2,rest:null}}
    * console.log(prepend(3, l));
    * => {value: 3,rest: {value: 1,rest: {value: 2,rest: null}}}
    */


function prepend(elt, list) {
  /** your code here */
  if (list === null) {
    return {value: elt, rest: null};
  } else {
    return {value: elt, rest:list};
  }
}

/**
    * 5.4 Add the function nth, which takes a list
    * and a number and returns the element at the given
    * position in the list (with zero referring to the first element)
    * or undefined when there is no such element.
    * throw an exception if n < 0.
    * THIS FUNCTION MUST BE RECURSIVE
    * console.log(nth(arrayToList([10, 20, 30]), 1));
    * => 20
    * console.log(nth({value: 1,rest: {value: 2,rest:null}}, 0));
    * => 1
    * console.log(nth({value: 1,rest: {value: 2,rest:null}}, 4));
    * => undefined
    * console.log(nth({value: 1,rest: {value: 2,rest:null}}, -5));
    * => Error
    */


function nth(list, position) {
  /** your code here */
  if(position < 0) 
    throw new Error("position out of range");
  else if (position === 0)
    return list.value;
  else {
    if (list.rest != null)
      return nth(list.rest, position-1);
    else
      throw new Error("position out of range");
  }
}




/**
  * Problem 9: Similar sizes/areas countries
  *  In this problem, you will use the
  * https://restcountries.com/ API to find
  * countries with closest sizes.
  * Write a function that will take a country name,
  * and returns an object with the following
  * properties: { country: , delta:  }
  * Where country stores the name of the country with the closest area.
  * and delta stored the absolute difference of the countries sizes
  * of both countries.
  * The function will query the API:
  * - https://restcountries.com/v3.1/all
  * will return an array of all the countries
  * - https://restcountries.com/v3.1/name/${country}?fullText=true
  * (replace {name} with the name of the country) 
  * will return an array containing data about the 
  * country listed in the URL
  * The countries data are stored in objects.
  * Assuming that the object is named country,
  * to get the common name of country,
  * you will do `country.name.common`
  * and to get the area, you will do `country.area`
  * As a reminder HTTP data is stored in the
  * 'data' field of the response.
  * You can use this link https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_area
  * to find the closest country by size
  */


async function closestSizesCountries(country) {
  /** your code here */
  try {
    const allCountriesResponse = await fetch('https://restcountries.com/v3.1/all');
    const allCountriesData = await allCountriesResponse.json();

    const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
    const countryData = await countryResponse.json();

    const targetArea = countryData[0].area;

    let closestCountry = '';
    let minDelta = Infinity;
    
    for(let i = 0; i < allCountriesData.length; i++) {
        const c = allCountriesData[i];
        const currDelta = Math.abs(targetArea - c.area);
  
        if(currDelta < minDelta && c.name.common !== country) {
          minDelta = currDelta;
          closestCountry = c.name.common;
        }
    }

    // console.log(closestCountry);
    return { properties: { country: closestCountry, delta: minDelta }};

  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  flatten,
  OurCustomError,
  partialMultiply,
  retry,
  arrayToList,
  listToArray,
  prepend,
  nth,
  closestSizesCountries,
};
