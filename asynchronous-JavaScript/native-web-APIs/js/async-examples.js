// setInterval() with DOM

const clock = document.getElementById('clock');

const tick = interval => {
  if (typeof interval !== 'number') {
    console.error('Interval must be a number');

    return;
  }

  setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString();
  }, interval);
};

tick('1000');
tick(1000);

// setTimeout() with Promise API

const delay = seconds =>
  new Promise((resolve, reject) => {
    if (typeof seconds !== 'number') {
      reject(new Error('Seconds must be a number'));
    }

    setTimeout(resolve, seconds * 1000);
  });

delay('3')
  .then(() => console.log('Resolved with a delay of 3 seconds.'))
  .catch(error => console.error(`Rejected :(\n\n${error.message}`));

delay(3)
  .then(() => 3)
  .then(number => console.log(`Resolved with a delay of ${number} seconds.`))
  .catch(error => console.error(`Rejected :(\n\n${error.message}`));

// Sequential promise execution with async/await

const countToThree = async () => {
  console.log('No delay');
  await delay(1);
  console.log('1 second delay');
  await delay(2);
  console.log('2 seconds delay');
  await delay(3);
  console.log('3 seconds delay');
};

countToThree();

// Concurrent promise execution

// with Promise.all()
Promise.all([delay(1), delay(2), delay(3), delay(4), delay(5)])
  .then(() => 'Promise.all() with all of 5 delays resolved.')
  .then(console.log)
  .catch(error => console.error(error.message));

// with Promise.race()
Promise.race([delay(1), delay(2), delay(3), delay(4), delay(5)])
  .then(() => 'Promise.race() with the quickest of 5 delays resolved.')
  .then(console.log)
  .catch(error => console.error(error.message));

// with Promise.any()
Promise.any([delay('1'), delay('2'), delay(3), delay(4), delay(5)])
  .then(() => 'Promise.any() with any of 5 delays resolved.')
  .then(console.log)
  .catch(error => console.error(error.message));

Promise.allSettled([delay('1'), delay('2'), delay(3), delay(4), delay(5)])
  .then(() => 'Promise.allSettled() with all of 5 delays resolved or rejected.')
  .then(console.log)
  .catch(error => console.error(error.message));

console.time('id-space-people');

// XMLHttpRequest() with Promise API

const getSpacemen_1 = (method, url) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    const handlerSuccess = () => {
      if (request.status === 200) {
        resolve(JSON.parse(request.response));
      }
    };

    const handleError = () => {
      if (request.status !== 200) {
        reject(Error(request.statusText));
      }
    };

    request.addEventListener('load', handlerSuccess);
    request.addEventListener('error', handleError);
    request.open(method, url);
    request.send();
  });

getSpacemen_1('GET', 'http://api.open-notify.org/astros.json')
  .then(data => console.log(data))
  .catch(error => console.error(error, `Can't fetch spacemen`));

console.timeLog('id-space-people');

// Fetch API

// Fetch API allows us to hit an endpoint and have response returned to us as a promise of the response provided with the callback to map it to json, which is also a promise, so we can return that promise from the first 'then' callback and then in the next one we'll have the actual data as a plain JavaScript object

const getSpacemen_2 = url => fetch(url).then(res => res.json());

// fetch() returns the entire response object, and this object has a json() method that parses the results

getSpacemen_2('http://api.open-notify.org/astros.json')
  .then(data => console.log(data.people))
  .catch(error => console.error(error, `Can't fetch spacemen`));

const getSpacemenNames = url =>
  getSpacemen_2(url)
    .then(data => data.people)
    .then(spacemen => spacemen.map(s => s.name));

getSpacemenNames('http://api.open-notify.org/astros.json')
  .then(console.log)
  .catch(error => console.error(error.message));

console.timeEnd('id-space-people');

const getGitHubUserData = async query => {
  const response = await fetch(`https://api.github.com/users/${query}`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
};

getGitHubUserData('milaziabchenko')
  .then(user => console.log(`${user.name}, \n${user.bio}`))
  .catch(error => console.error(error.message));

getGitHubUserData('milaziabchenko/repos')
  .then(repos => repos.forEach(repo => console.log(repo.name)))
  .catch(error => console.error(error.message));

const getCountriesData_1 = url => fetch(url).then(response => response.json());

getCountriesData_1('https://restcountries.com/v3.1/all')
  .then(countries => {
    const countriesArr = [];

    countries.map(country => {
      const name = country.name.common;
      const population = country.population;
      const arrOfLanguages = [];

      for (let item in country.languages) {
        arrOfLanguages.push(country.languages[item]);
      }

      const listOfLanguages = arrOfLanguages.join(', ');

      countriesArr.push({
        name,
        population,
        languages: listOfLanguages
      });
    });

    const first20Countries = countriesArr.slice(0, 20);

    console.log(first20Countries);
  })
  .catch(error => console.error(error.message));

const getCountriesData_2 = async url => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

getCountriesData_2('https://restcountries.com/v3.1/all')
  .then(countries => {
    const myCountry = countries.find(
      country => country.name.official === 'Ukraine'
    );

    if (myCountry?.independent) {
      console.log(`${myCountry.name.official} is free and independent.`);
    }
  })
  .catch(error => console.error(error.message));

const getCountryArea = async country => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();

  const { area } = data[0];
  const formattedCountry = country.charAt(0).toUpperCase() + country.slice(1);

  console.log(`The area of ${formattedCountry} is ${area} square kilometers.`);

  return { [formattedCountry]: area };
};

const countries = [
  'canada',
  'ukraine',
  'germany',
  'norway',
  'italy',
  'switzerland'
];

Promise.all(countries.map(getCountryArea))
  .then(countriesAreas => console.log({ countriesAreas }))
  .catch(error => console.error(error.message));

const showAwaitedValue = async (value, fallback) => {
  const promise = new Promise((resolve, reject) => {
    reject(value);
    resolve(value);
  }).catch(() => fallback);

  const awaitedValue = await promise;

  console.log({ awaitedValue });
};

showAwaitedValue('Real value', 'Fallback value');

const timeNow = Date.now();

const logResultAndElapsedTime = value =>
  console.log(`${value}\n\nElapsed: ${Date.now() - timeNow} ms`);

// The creation of the promise is still blocking because it happens in the main thread. It's only the resolving of the value that is a micro task

const nonBlockingLoop = async () => {
  await Promise.resolve();

  let i = 0;

  while (i < 1_000_000_000) {
    i++;
  }

  return 'One billion loops done 🐱‍💻';
};

// A fulfilled promise will run in the micro task queue after all the synchronous code in the current macro task has completed and before the start of the next event loop

nonBlockingLoop()
  .then(logResultAndElapsedTime)
  .catch(error => console.error(error.message));

// Whatever gets returned inside the asynchronous function will be a promise of that value. If we didn't use the 'async' keyword, we could write this function by just returning a promise that resolves to this value

const getHearts = hearts => Promise.resolve(hearts);

getHearts('💛💚💖')
  .then(logResultAndElapsedTime)
  .catch(error => console.error(error.message));

// With the 'async' keyword it takes the return value and automatically resolves it as a promise

const getFruit = async name => {
  const fruits = {
    peach: '🍑',
    strawberry: '🍓',
    watermelon: '🍉',
    cherries: '🍒',
    apple: '🍏'
  };

  return fruits[name];
};

getFruit('peach')
  .then(logResultAndElapsedTime)
  .catch(error => console.error(error.message));

// The real power of the async function comes when we combine it with the 'await' keyword to pause the execution of the function until the promise resolves to a value at which point we can assign it to a variable

const makeSmoothie = async () => {
  const first = await getFruit('peach');
  const second = await getFruit('strawberry');

  return [first, second];
};

makeSmoothie()
  .then(console.log)
  .catch(error => console.error(error.message));

const getFruitsForSmoothieConcurrently = async () => {
  const first = getFruit('peach');
  const second = getFruit('apple');
  const third = getFruit('strawberry');

  const smoothie = await Promise.all([first, second, third]);

  return smoothie;
};

getFruitsForSmoothieConcurrently()
  .then(console.log)
  .catch(error => console.error(error.message));

const fruitRace = async () => {
  const first = getFruit('peach');
  const second = getFruit('apple');
  const third = getFruit('strawberry');

  const winner = await Promise.race([first, second, third]);

  return `And the winner of the race is ${winner}!`;
};

fruitRace()
  .then(console.log)
  .catch(error => console.error(error.message));

// Error handling

const badSmoothie = async () => {
  try {
    const first = getFruit('apple');
    const second = getFruit('strawberry');
    const smoothie = await Promise.all([first, second]);

    throw `Smoothie ${smoothie} is broken!`;

    // return smoothie;
  } catch (error) {
    console.error({ error });

    // catching the error and providing some replacement value
    return `We are going to get some 🍑🍑🍑 and be fine...`;

    // or catching the error and throwing another error
    // throw `💩 It's really broken!`;
  }
};

badSmoothie()
  .then(console.log)
  .catch(error => console.error({ error }));

// Asynchronous conditional expressions

const peachInspection = async fruit => {
  (await getFruit(fruit)) === '🍑'
    ? console.log('Oh it looks really peachy 🍑😋!')
    : console.log('Well... this fruit is not peachy.');
};

peachInspection('watermelon');
peachInspection('peach');

// Asynchronous loops

const fruits = ['cherries', 'watermelon', 'apple'];
const smoothie = fruits.map(value => getFruit(value));

const fruitLoop = async () => {
  for await (let emoji of smoothie) {
    logResultAndElapsedTime(emoji);
  }
};

fruitLoop();

// Asynchronous generator functions

async function* generate(...items) {
  for (let item of items) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    yield item;
  }
}

(async () => {
  const smoothieGen = generate(...smoothie);

  for await (let fruit of smoothieGen) {
    console.log(fruit);
  }
})();
