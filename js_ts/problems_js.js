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
 * This file contains problems 2, 4, 6, 7, 8
 * Do not forget to comment your functions
 */


/**
 * Problem 2: Countries Yearly CO2 emissions
 * In this problem, we will manipulate
 * a list of records containing CO2 emissions data
 * for all the countries.
 * A record is an object with the following states
 * let co2_record =  {country: <the_country>,
 * year: <the_year_of_the_emission>,
 * annual_emissions: <the amount of CO2 emitted that year>
 * // in billion tons}
 * The database consists of an array of co2_record.
 * you can explore CO2 emissions data at https://ourworldindata.org/co2-emissions
 */

/**
 * 2.1 compare_countries
 * Write the function compare_countries that takes an array of co2_record,
 * the names of two countries, and a year as input and return an array
 * containing only the records of those two countries for the provided year.
 *
 * data is defined in the test file
 * compare_countries (data, "USA", "China", 2021)
 * => [{country: "USA", year: 2021, annual_emissions:  5.01},
   {country: "China", year: 2021, annual_emissions: 11.47}]
  * YOU MUST USE REDUCE when implementing this function
 * You will get 1/3 credit if you do not use it.
 */


function compareCountries(data, country1, country2, year) {
  /** your code here */
  const result = data.filter((entry) => (entry.year === year && (entry.country === country1 || entry.country === country2)));
  return result;
}

/**
 * 2.2 largestEmitterForYear
 * Write the function largest_emitter_for_year
 * that return the co2_record of the largest emitter
 * for a given year.
 *
 * data is defined in the test file
 * largestEmitterForYear (data, 2021)
 * => {country="China"; year=2021; annual_emissions=11.47}
 * Hint: return a ``dummy'' record if there is no data
 * for the given year.
 * YOU MUST USE REDUCE when implementing this function
 * You will get 1/3 credit if you do not use it.
 */


function largestEmitterForYear(data, year) {
  /** your code here */
  const result = data.filter((entry) => entry.year === year);
  return result.reduce((acc, entry) =>  {
    acc = (acc === undefined || entry.annual_emissions > acc.annual_emissions) ? entry : acc; 
    return acc;
  }, { country: 'None', year: -1, annual_emissions: -1 });
}

/**
 * Problem 4: LockBox (objects, closures)
 * Consider the following  object.
 * It is a box with a lock.
 * There is an array in the box,
 * but you can get at it only when the box is unlocked.
 * Directly accessing the private content property is not allowed.
 * Write a function called withBoxUnlocked that takes a box, a function value as argument.
 * The function will unlock the box, run the function,
 * and then ensure that the box is locked again
 * before returning its content.
 * The content is returned regardless of whether the argument
 * function returned normally or threw an exception.
 * if you call withBoxUnlocked when the box is already unlocked,
 * the box stays unlocked.
 *
 */

function Box() {
  let locked = true;
  const content = ['javascript', 'is', 'fun'];
  function unlock() { locked = false; }
  function lock() { locked = true; }
  function getContent() {
    if (locked) throw new Error('Locked!');
    return content;
  }
  return { unlock, lock, getContent };
}


function withBoxUnlocked(box, func) {
  /** your code here */
  box.unlock();
  func();
  let result = box.getContent();
  box.lock();
  return result;
}


/**
    * Problem 6: Immutability, Static members, cloning
    * Go over these links before starting this problem:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    *
    * The function Transaction keeps track of  transactions
    * for a company with offices across the country.
    * We want to keep all the transactions inside a secured shared array.
    * As shown in the code below, the storage array (store)
    * is a static member of Transaction.
    *
*/

function Transaction(details) {
  const value = details;
  function storeDetails() {
    // adds a value to the store
    Transaction.store.push(value);
  }
  return { storeDetails };
}

/**
 * Using the Object.defineProperty static method, 
 * add the static field `store` to Transaction.
 * - The type of the store must be `Array`
 * - Only a copy of the content of the store should be returned when
 * accessing it (do not break encapsulation)
 * - adding an element to the store with the = operator,
 * should add it at the end of the array
 * - Only the member functions of the static field are
 * allowed to mutate the underlying storage array (storeVal)
 * - Feel free to add helper functions as needed
 * 
 */


let storeVal = []; // the underlying storage array. You must use it
// freeze storeVal
Object.freeze(storeVal);

/** your code here */
Object.defineProperty(Transaction, 'store', {
  value: []
});

/** Problem 7: All or Nothing Promises
 * Given an array of functions returning promises objects,
  * Write a function that takes an array of functions returning
  * promises and returns a promise that waits
  * for all of the promises in the array to finish.
  * It then succeeds, yielding an array of result values.
  * If a promise in the array fails, the promise returned
  * by the function fails too, with the failure reason from
  * the first failing promise.
  *
  * Do not reject an Error (use a string value as a reason) when testing promiseAll.
  * Otherwise, it will make the whole function to fail.
  * You can disable (in your tests) the
  * prefer-promise-reject-errors (next line)
  * 
  * You must not use the Promise.all function in JS
  *
*/

function getRandomNumberPromise() {
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    resolve(randomNum);
  });
}

function promiseAll(promisesArr) {
  return new Promise((resolve, reject) => {
    /** your code here */
    const results = [];
    let completed = 0;

    function checkCompletion() {
      if (completed === promisesArr.length) {
          resolve(results);
      }
    }

    let index = 0;
    promisesArr.forEach((promise) => {
        console.log(typeof promise);
        promise.then(result => {
            results[index] = result;
            completed++;
            checkCompletion();
        }).catch(error => {
            reject(error);
            return(error);
        });
        index++;
    });

    if (promisesArr.length === 0) {
        resolve(results);
    }
  });
}

/**
  * Problem 8: Unreliable Phone Calls
  * (Promises and setTimeout)
  * Imagine that you want to call your best friend
  * but you are in an area with poor telephone
  * infrastructure. So 40% of the calls are
  * connected immediately while you might wait
  * between 4 to 10 seconds to be connected 60% of the time.
  * Here is the code of the function that will
  * place the calls.
  *
      function unreliableCall(recipient) {
        if (Math.random() < 0.4) {
          console.log(`You are talking to ${recipient}`);
        } else {
          // in milliseconds
          const waitTime = Math.max(0.4, Math.floor(Math.random() * 10)) * 1000;
          setTimeout(() => console.log(`Call to ${recipient} was delayed by ${waitTime}`),
          waitTime);
        }
      }
  *
  */

/**
 * 8.1: Convert unreliableCall to return a promise
 * The function should throw an error with the
 * message 'invalid recipient' if the recipient
 * is null or undefined or is not a string
 * Use the exact same string values printed to console
 * as parameter when resolving the promise.
 * e.g. resolve(`You are talking to ${recipient}`).
 * - In both situations (delay and no delay), the returned
 *  promise is resolved.
 * - To make testing easier, the probability is added as
 *   parameter
 * - In the function, if the probability is not provided (undefined),
 *   use a random number generator. Otherewise use the
 *   provided probability (in your tests).
 * - Adjust your test timeout accordingly when testing
 *   delayed calls (the default timeout is 5000 ms).
 * - Do not forget to delete all console statements
 *
 */


function unreliableCallProm(recipient, probability) {
  /** your code here */ 

  return new Promise((resolve, reject) => {
    if (recipient === null || recipient === undefined || (typeof recipient) !== 'string') {
      reject(new Error('invalid recipient'));
      return;
    }
    
    const delayProbability = probability === undefined ? Math.random() : probability;
    if (Math.random() >= delayProbability) {
        resolve(`You are talking to ${recipient}`);
    } else {
        let max = 10;
        let min = 4;
        // const waitTime = Math.floor(Math.random() * (max - min + 1)) + min;
        const waitTime = 5;
        setTimeout(() => resolve(`Call to ${recipient} was delayed by ${waitTime}`), waitTime * 1000);
    }
  })
}

/**
 * 8.2: To wait or not to wait?
 * You think that 10ms is an unacceptable delay.
 * In fact, you don't want to wait more than 3ms for the call
 * to be connected.
 * To help you decide if you should wait or not.
 * To make testing easier, the function takes a probability as
 * a parameter. You will use that probability to delay or connect the call
 * Write the function shouldWaitForCall that:
 *  - returns a promise that resolves to TRUE (boolean value)
 *    if the call was connected within 3ms (inclusive)
 *  - returns a rejected promise with FALSE (boolean value)
 *    as a reason if the delay is greater than 3ms.
 *  - You are allowed to disable the
 *   'prefer-promise-reject-errors' eslint rule
 *   in this function (disable for the next line)
 */



function shouldWaitForCall(recipient, probability) {
  /** your code here */
}



module.exports = {
  compareCountries,
  largestEmitterForYear,
  Box,
  withBoxUnlocked,
  Transaction,
  getRandomNumberPromise,
  promiseAll,
  unreliableCallProm,
  shouldWaitForCall,
}
