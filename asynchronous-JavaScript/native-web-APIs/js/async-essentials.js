// Callback pattern

// A callback is a block of instructions wrapped in a function so that it can be invoked when an async operation has completed.

// Callback functions are functions that get passed to other functions as arguments and get called inside outer function at a later point in time

// Timer functions

// setTimeout() and setInterval() are JavaScript global methods that require a callback that gets executed after amount of time, passed as a second argument to the function

const fireAfterTimeout = (timeout, callback) => setTimeout(callback, timeout);

fireAfterTimeout(3000, () => {
  console.log('setTimeout callback is fired with a delay of...');
  console.log('...3 seconds...');
  fireAfterTimeout(2000, () => {
    console.log('...5 seconds...');
    fireAfterTimeout(2000, () => {
      console.log('...7 seconds.');
    });
  });
});

// Ways of handling async HTTP requests to the API endpoints:

// XMLHttpRequest (XHR)

// Setting up a request with XMLHttpRequest format, we need to take the following steps:

// - create an instance of XMLHttpRequest object;
// - then set up the request method 'open' with two parameters that specify what the type of request is (method) and where to send the request to (endpoint);
// - finally, use this request object to send a request to get some data

// XHR states / readyState property

// How do we know, when the fetch operation is complete and we can access the data? We can track the progress of a request using an event listener and a specific event called 'readystatechange'. We attach it to the request object itself. This event fires every time there's a state change in the request that goes through the following states:

// 0 - UNSENT
// 1 - OPENED
// 2 - HEADERS_RECEIVED
// 3 - LOADING
// 4 - DONE

// When the request is complete, we've got access to the response, but that's not enough, because if there was some kind of error with the request, for example, if I create an endpoint which is not valid, it still goes through the motions, and it will reach state 4, but the responseText will be empty and the status will be 404, which means it cannot find the non-existing resource that we are trying to send our request to. So, we should also check for the status to be 200

const getToDosWithCallbacks = (resource, callback) => {
  const request = new XMLHttpRequest(); // 0 UNSENT

  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);

      callback(null, data);
    } else if (request.readyState === 4) {
      callback('Could not fetch the data', null);
    }
  });

  request.open('GET', resource); // 1 OPENED
  request.send(); // 2 HEADERS_RECEIVED
};

// Sequential execution of callbacks

// (err, data) is a conventional order of callback parameters, when using a callback pattern

getToDosWithCallbacks('todos/shaun.json', (err, data) => {
  err ? console.error(err) : console.log(data);
  getToDosWithCallbacks('todos/brad.json', (err, data) => {
    err ? console.error(err) : console.log(data);
    getToDosWithCallbacks('todos/bucky.json', (err, data) =>
      err ? console.error(err) : console.log(data)
    );
  });
});

// Promise pattern

let promiseIsResolved = Math.random() < 0.9;

const getSomeData = () =>
  new Promise((resolve, reject) =>
    promiseIsResolved
      ? resolve('Promise 0 resolved with some data')
      : reject('Promise 0 rejected with some error')
  );

// Invoking a promise:

// 1. with then()

// A promise will fire a function getSomeData(). If we resolve a promise, it fires the first callback inside the 'then' method, and that callback takes the data that we pass to the resolve function. We also get a second callback as a second argument inside the 'then' method, and this callback would only fire, if we reject a promise

const handleResolvedPromise = data => console.log(data);
const handleRejectedPromise = err => console.error(err);

getSomeData().then(handleResolvedPromise, handleRejectedPromise);

// 2. with then().catch()

// Sometimes, when we are adding two functions as arguments into the 'then' method, it can get a little bit confusing and look a bit messy, and there's a slightly different way we can write this. Instead of a second function for the 'reject' case, we can tack on method 'catch', and what this does is catch an error. Now what happens? When we get a 'resolve', the 'then' method fires, and fires the callback for that 'resolve'. If we get a 'reject' with a rejection or an error instead, it comes to the 'catch' method to catch that error, and then it fires the callback for the 'reject'. 'Catch' method internally calls .then(null, errorHandler). And this syntax looks a bit neater, especially when it comes to chaining promises together

getSomeData().then(handleResolvedPromise).catch(handleRejectedPromise);

const handleRequestWithPromise = method => resource => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    const requestListener = () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else if (request.readyState === 4) {
        reject('Error getting resource');
      }
    };

    request.addEventListener('readystatechange', requestListener);
    request.open(method, resource);
    request.send();
  });
};

const getToDosWithPromise = handleRequestWithPromise('GET');

// Chaining promises

// One of the best things about promises is that we can chain them together, so we can perform one async task after another in order should we need to.

// Each 'then' block is essentially returning another promise, so multiple asynchronous operations are being made to run in order, one after the other. In other words, all the async operations or promises are being put into an event queue. This event queue will run after the main thread has finished processing, so they do not block the other JavaScript code from running.

// When we fire the callback in the first 'then' method, we know that we've already got the first lot of data, and this is a safe position to go out and try to get the next lot of data, and this second lot of data returns a promise. Now we can tack on the 'then' method again to fire the next callback and have the next lot of data etc. The first 'then' is attached to the original promise, and the second 'then' is attached to the promise returned from the first 'then' handler and so on. When the handler returns a value, JavaScript wraps that value up in a promise. If we get an error at some point, the good thing about the 'catch' at the end is that it catches any error, so we don't have to rewrite it for every 'then'

getToDosWithPromise('todos/shaun.json')
  .then(data => {
    console.log('Promise 1 resolved:', data);

    return getToDosWithPromise('todos/brad.json');
  })
  .then(data => {
    console.log('Promise 2 resolved:', data);

    return getToDosWithPromise('todos/bucky.json');
  })
  .then(data => {
    console.log('Promise 3 resolved:', data);
  })
  .catch(err => {
    console.error('Promise rejected:', err);
  });

// Fetch API

// The native Fetch API is just a function built into the language, and we call it by just saying fetch() and passing in it external or local resource that we want to fetch as an argument. It's gonna return us a promise.

// When using fetch(), the promise is only ever rejected, when we get some kind of network error, like we are offline or we can't reach the API for some reason. If we mistype the resource, we don't get the rejection, but instead we get the response with a status of 404.

// To get and parse our JSON data with fetch, we use the 'json' method on the response object. It returns a promise, so we need to return it to make this promise an overall value and be able to tack on another 'then' method. Inside this 'then' we can actually take the data that we get back from the 'json' method, this returns to us a promise which when resolved gives us the data that we went out to fetch, and now we have access to that data

fetch('todos/shaun.json')
  .then(response => {
    console.log('RESOLVED', response);

    const promise = response.json();

    console.log('JSON', promise);

    return promise;
  })
  .then(data => {
    console.log('DATA', data);
  })
  .catch(err => {
    console.error('REJECTED', err);
  });

// This way of making network requests for data is easier to write and maintain. These are the steps to remember:

// - first of all, we fetch the data;
// - then, we take the response;
// - after that, we return response.json() that returns a promise, so we can tack on another 'then' inside of which we fire a function where we actually have access to that data;
// - and we catch an error at the end

// With Fetch API we chained a couple of promises together. We got a promise back with fetch(), we fired a function, when that promise resolved, then we returned another promise inside and we chained that on, using the 'then' method again. It looks a lot better than callbacks, but when we start to chain a lot of different promises together, then it still can start to look a bit messy

// Async & Await

const getToDoWithAsync = async url => {
  const response = await fetch(url);

  // fetch() returns a promise, and the 'await' keyword stalls JS inside the 'async' function, it stops it from assigning a value to a variable until the promise has resolved. Once the promise has resolved, we can take the value from that resolve function, the response object, and assign it to the variable

  console.log(response);

  // Throwing Errors

  // When we throw a new Error inside 'async' function, the promise returned by this function is rejected, and we are going to catch it in the call of the function

  if (response.status !== 200) {
    throw new Error('Cannot fetch the data');

    // That will be the message property on the error object, and we get this error now instead of the json error, when there's a problem with the resource URL
  }

  // When we get a response object back from using fetch(), we use the 'json' method to get the data back. As far as this method is asynchronous in itself, and it returns a promise in itself, we can use the 'await' keyword to chain on this promise, it stalls JS again until this promise resolves, then we take the value that this promise resolves and assign it to the data variable

  const data = await response.json();

  console.log(data);

  // Ultimately what we want to do is return this data, so when we call it, we get access to that data, but we are not directly getting that data, because any function with 'async' keyword in front of it returns a promise

  return data;

  // The power of 'await' keyword' is that if we wanted to, we could chain together many different things that return promises, and then we'd be doing them sequentially. We'd be waiting for one promise to resolve, before assigning it to a variable, then another before assigning it another variable, so it does each step in turn, and that's really nice. In a sense, it's blocking code inside 'async' function, because we are waiting until every task is done, but because the whole function is asynchronous and it returns a promise, when we call it, that function in itself is non-blocking, it would let JS carry on with the rest of the code
};

// Whenever we call an async function, it always returns a promise, regardless of what's inside.

// 'async' function is taking some time to do, and at some point it's gonna resolve or reject. So, we still need to tack on the 'then' method once to the 'async' function, when we call it, because this is returning a promise, and we don't want this to be blocking

getToDoWithAsync('todos/shaun.json')
  .then(handleResolvedPromise)
  .catch(handleRejectedPromise);

// So, the async underway bundles up all of our async code inside a function, which we can call and use whenever we want, and gives us a much cleaner and readable way to chain promises together
