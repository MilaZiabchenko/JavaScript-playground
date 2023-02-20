// Array creation

// Array initialization is a usual task when dealing with collections. JavaScript allows a decent number of ways and flexibility to achieve that:

// 1. Array literal

let planets = ['Uranus', 'Neptune', 'Mercury'];

console.log(planets);

// 2. Array constructor

// new Array()
planets = new Array('Earth', 'Mars', 'Venus');

console.log(planets);

// Array.of()
planets = Array.of('Earth', 'Saturn', 'Jupiter');

console.log(planets);

// Array.from()
const planetChars = Array.from('Saturn');

console.log(planetChars);

// The array constructor has a number of situations when its behavior may be surprising. So the array literal is a better and simpler solution to initialize array instances

// Destructuring

const [first] = planets;
const { 1: second } = planets;
const [, , third] = planets;
const [planet_1, planet_2, planet_3] = planets;

console.log(first, second, third);
console.log(planet_1, planet_2, planet_3);

console.log(planets instanceof Array);
console.log(planets instanceof Object);

// Array methods:

// at()
console.log(planets.at(1));
console.log(planets.at(-1));

// sparse array with empty slots
const emptyArray = Array(5);

console.log(emptyArray);

// Mutable and immutable methods

// Array has several mutable operations: fill(), copyWithin(), pop(), push(), unshift(), shift(), reverse(), sort() and splice(). Using them may cause side effects and bugs that are hard to track

// fill()
const filledArray = emptyArray.fill(planets[0]);

// pop()
filledArray.pop();

// push()
filledArray.push('Venus');

console.log(filledArray);

const array = [];

const arrLength = array.push('bicycle', 'backpack');

console.log(array);
console.log(arrLength);

// shift()
const shiftedValue = array.shift();

console.log(array);
console.log(shiftedValue);

// unshift()
array.unshift('bike');

console.log(array);

let years = [2021, 2020, 2015, 2018, 2017, 2016, 2019];

console.log(years);

// slice()

// slice() returns a shallow copy of a portion of an array without modifying the original array

const firstYearInTheArray = years.slice(0, 1);
const lastThreeYearsInTheArray = years.slice(years.length - 3);

console.log(firstYearInTheArray);
console.log(lastThreeYearsInTheArray);

// As of 2023, three mutable methods reverse(), sort() and splice() have received their copying (immutable) versions toReversed(), toSorted() and toSpliced() in the ECMAScript specification

// reverse() vs toReversed()

// reversing elements of the array without modifying the original array
let reversedYears = years.slice().reverse();
// or
reversedYears = [...years].reverse();
// or
reversedYears = years.toReversed();

console.log(reversedYears);
console.log(years);

// reversing and modifying the original array
years.reverse();

console.log(years);

// sort() vs toSorted()

// sort() takes in a Comparator function with two arguments. The return value of this function for any two elements determines the order in which these elements will appear in relation to each other in the final array

// sorting elements of the array in an immutable way
let ascendingYears = years.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
// or
ascendingYears = years.slice().sort((a, b) => a - b);
// or
ascendingYears = years.slice().sort();
// or
ascendingYears = [...years].sort();
// or
ascendingYears = years.toSorted();

console.log(ascendingYears);
console.log(years);

const descendingYears = years
  .slice()
  .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
// or
years.slice().sort((a, b) => b - a);

console.log(descendingYears);

const yearsSortedRandomly = years.slice().sort(() => 0.5 - Math.random());

console.log(yearsSortedRandomly);

// Rest parameters vs spread syntax

// When we see ... at the end of function parameters, it is rest syntax that gathers the rest of the list of parameters into an array. When ... occurs in a function call, it is spread syntax that expands an array into a list.

// The rest parameter syntax allows us to more easily handle various inputs as parameters in a function, representing an indefinite number of arguments as an array

const getLatestYears = ([, , , , ...restOfTheYears]) => [...restOfTheYears];

console.log(getLatestYears(ascendingYears));

const sumUpYears = (...args) => {
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
};

// Spread syntax looks exactly like rest syntax, but it does quite the opposite, taking in an iterable (string, array) and expanding it into individual elements.

// The spread operator turns the elements of an iterable into elements of an array literal or into arguments of a function call

const name = 'Leo';

console.log([...name]);

console.log(sumUpYears(...ascendingYears));
console.log(sumUpYears(...ascendingYears, 2021, 2022, 2023));

const physicalState = `I feel tired and need some rest`;

// split()
console.log(physicalState.split());
console.log(physicalState.split(' and '));
console.log(physicalState.split(' '));
console.log(physicalState.split(''));

// reduce()

// The reduce() method executes a user-supplied reducer callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value

const sumOfAscendingYears = ascendingYears.reduce(
  (total, val) => total + val,
  0
);

const getAverageValue = nums =>
  nums.reduce((prevNum, curNum) => prevNum + curNum, 0) / nums.length;

const averageYear = getAverageValue(ascendingYears);

const minYear = ascendingYears.reduce((prevYear, curYear) =>
  prevYear < curYear ? prevYear : curYear
);

const maxYear = ascendingYears.reduce((prevYear, curYear) =>
  prevYear > curYear ? prevYear : curYear
);

console.log({ sumOfAscendingYears });
console.log({ averageYear });
console.log({ minYear });
console.log({ maxYear });

// Merging arrays:

// 1. using the spread syntax
const myBikeActivity = [...array, '18-30 km/h', ...ascendingYears, 2021];

console.log(myBikeActivity);

// 2. using concat()
const joyride = array.concat(['highway', 'forest', 'lake', 'freedom', 'joy']);

console.log(joyride.slice(-5));

console.log(joyride);

joyride.sort();

console.log(joyride);

const brightSide = ['smiling', 'gregarious', 'brave', 'funny', 'kind'];

// indexOf()
const index = brightSide.indexOf('brave');

// removing, adding or replacing elements from the original array in an immutable (redux) way
const newBrightSide = [
  ...brightSide.slice(0, index),
  'talented',
  ...brightSide.slice(index + 1)
];

console.table(brightSide);
console.log(newBrightSide);

// splice() vs toSpliced()

// removing, adding or replacing elements, creating a copy of an array without modifying the original array
const brighterSide = brightSide.toSpliced(3, 0, 'canny', 'strong');

console.log(brighterSide);
console.log(brightSide);

// removing, adding or replacing elements, modifying the original array
brightSide.splice(3, 0, 'canny', 'strong');

console.log(brightSide);

// deleting from the array in a mutable way
let deletedElement = brightSide.splice(index, 1).toString();

console.log({ deletedElement });
console.log(brightSide);

const darkSide = ['fearful', 'depressive', 'passive'];

const personality = newBrightSide.concat(darkSide);
const sortedPersonality = personality.toSorted();

console.log(sortedPersonality);
console.log(personality);

// replacing the element at the given index with the given value in a mutable way
personality[personality.length - 3] = 'unstable';

// with()

// replacing the element at the given index with the given value, creating an immutable copy of an array
const updatedPersonality = personality
  .with(-2, 'sensitive')
  .with(-1, 'independent');

console.log(personality);
console.log(updatedPersonality);

// includes()
console.log(personality.includes('kind'));
console.log(personality.indexOf('kind') in personality);

// Array.isArray()
console.log(Array.isArray(personality));

const B = [
  'man',
  'handsome',
  'tender',
  'smart',
  'creative',
  'designer',
  'unstable',
  'sensitive',
  'faithful'
];

// Copying arrays

// deep copy
const Bo = JSON.parse(JSON.stringify(B));

// shallow copy
const BoStar = Object.assign([], B);
const Bogdan = [...B];
const Bodia = B.slice();

console.log(Bo);
console.log(BoStar);
console.log(Bogdan);
console.log(Bodia);
console.log(B === Bo);

Bogdan.unshift('1982');
Bogdan.push('outgoing');
Bogdan.reverse();

console.log(Bogdan);

const removed = Bogdan.splice(3, 2);

console.log({ removed });
console.log(Bogdan);

Bogdan.splice(2, 0, 'avoidant');

console.log(Bogdan);

Bogdan.splice(9, 0, 'September', '28');

console.log(Bogdan);

// Array of objects

const Saturday = [
  {
    time: 'Morning',
    task: 'Coding',
    done: true
  },
  {
    time: 'Midday',
    task: 'Cooking',
    done: false
  },
  {
    time: 'Evening',
    tasks: {
      0: 'Cycling',
      1: 'Walking'
    },
    done: false
  }
];

const SaturdayJSON = JSON.stringify(Saturday, null, 2);
const SaturdayDeepCopy = JSON.parse(SaturdayJSON);
SaturdayDeepCopy.at(-1).tasks = {
  ...SaturdayDeepCopy.at(-1).tasks,
  2: 'Sleeping'
};

console.log(Saturday);
console.log(SaturdayJSON);
console.log(SaturdayDeepCopy);
console.log(Saturday.at(-1).tasks);
console.log(SaturdayDeepCopy.at(-1).tasks);

for (let i = 0; i < Saturday.length; i++) {
  console.log(Saturday[i].time);
}

for (let todo of Saturday) {
  console.log(todo.task ?? todo.tasks);
}

// Higher-order array methods

// forEach()
Saturday.forEach(todo => console.log(todo));

// Many higher-order array functions, including Array.map() and Array.filter(), are written as pure functions. They take in an array reference and internally, they copy the array and work with the copy instead of the original. So, the original array is not modified, the outer scope is unaffected, and we're returned a reference to a brand new array

// map()

// map() calls a function on each array element and returns a new array that contains the return values for each element of the original array

const getTasks = todo => todo.task ?? todo.tasks;

const tasks = Saturday.map(getTasks);

// map() performs a function for each todo and returns a transformed array of the same length

console.log(tasks);

// filter()

// filter() returns a subset of the original array with elements that meet the condition. It is used when you want to find all of the elements in the array that fit some criteria.

// The main difference between filter() and map() is the type of function that we pass into it. In map we pass in a function that returns a value for each element in the array. And the return value of this function represents what the element becomes in our new array. On the other hand, for filter we pass it a predicate function that returns either true or false for each element. If the function that we pass returns true for a given element, then that element's included in the final array. Otherwise, it's left out

// Predicate function

// A predicate function is a function that takes a single argument as an input and returns a boolean value. It is a function that tests whether an input satisfies a certain condition

const getUncompletedTodos = todo => !todo.done;

const uncompletedTodos = Saturday.filter(getUncompletedTodos);

console.log(uncompletedTodos);

// find()

// find() returns the value of the first element in the array where predicate is true, and undefined otherwise

const foundTask = Saturday.find(todo => todo.task === 'Coding');

console.log({ foundTask });
console.log(foundTask);

// findLast()
const lastUncompletedTodo = Saturday.findLast(getUncompletedTodos);

console.log(lastUncompletedTodo);

// findIndex()

// findIndex() returns the index of the first element in the array where predicate is true, and -1 otherwise

const firstIndex = Saturday.findIndex(getUncompletedTodos);

console.log(firstIndex);

const indexOfNonexistingTodo = Saturday.findIndex(
  todo => todo.task === 'Slacking'
);

console.log(indexOfNonexistingTodo);

// findLastIndex()
const lastIndex = Saturday.findLastIndex(getUncompletedTodos);

console.log(lastIndex);

// some()
const hasTask = Saturday.some(todo => todo.task === 'Coding');

console.log({ hasTask });

// every()
const allPastYears = ascendingYears.every(year => {
  const currentYear = new Date().getFullYear();
  return currentYear - year > 0;
});

console.log({ allPastYears });

const areAllTasksUncompleted = Saturday.every(getUncompletedTodos);

console.log({ areAllTasksUncompleted });

const uncompletedTasks = Saturday.filter(getUncompletedTodos).map(getTasks);

console.log(uncompletedTasks);

const agenda = [
  {
    id: 1,
    task: 'Buying a new scratching post for Leo',
    done: true
  },
  {
    id: 2,
    task: 'Progressing in learning of web development',
    done: true
  },
  {
    id: 3,
    task: 'Riding to the forest with Bogdan',
    done: true
  }
];

const newAgenda = [
  ...agenda,
  {
    id: 4,
    task: 'Resolving health issues',
    done: false
  }
];

console.log(newAgenda);

for (const todo of newAgenda) {
  console.log(todo);
}

for (const index in newAgenda) {
  console.log(index, newAgenda[index]);
}

newAgenda.forEach(console.log);

const agendaTasks = newAgenda.map(getTasks);

console.log(agendaTasks);

const endsWithLeo = todo => todo.task.endsWith('Leo');

const isEveryAgendaTaskEndsWithLeo = newAgenda.every(endsWithLeo);
const isAnyAgendaTaskEndsWithLeo = newAgenda.some(endsWithLeo);

console.log(isEveryAgendaTaskEndsWithLeo);
console.log(isAnyAgendaTaskEndsWithLeo);

// Chaining higher-order array methods

const getCompletedTasks = todo => todo.done;

const bingo = newAgenda.filter(getCompletedTasks).map(getTasks);

console.log(bingo);

const foundCompletedTask = newAgenda
  .filter(getCompletedTasks)
  .find(todo => todo.task.includes('of'));

console.log(foundCompletedTask);

const sortedTasks = newAgenda.map(getTasks).sort();

console.log(sortedTasks);

const numsArray = [1, 2, 3, 4, 5, 6, 7];

// reduceRight()
const sumOfSquareRootsOfEvenNums = numsArray
  .filter(element => !(element % 2))
  .reduceRight((acc, element) => acc + Math.sqrt(element), 0);

console.log(sumOfSquareRootsOfEvenNums);

// filtering inside reduce() or reduceRight() makes calculations faster
const getSumOfSquareRootsOfEvenNums = array => {
  const sum = array.reduce(
    (acc, element) => acc + (element % 2 ? 0 : Math.sqrt(element)),
    0
  );

  return sum;
};

console.log(getSumOfSquareRootsOfEvenNums(numsArray));

const getMaxOddElement = array => {
  const maxEvenNumber = array.reduce((acc, value) =>
    Math.max(acc, value % 2 ? value : 0)
  );

  return maxEvenNumber;
};

console.log(getMaxOddElement(numsArray));

const names = ['Mia', 'Mila', 'Leo', 'Bogdan', 'Michelle'];

const countNamesStartingWith = (array, chars) =>
  array.reduce(
    (count, name) => (name.startsWith(chars) ? count + 1 : count),
    0
  );

console.log(countNamesStartingWith(names, 'Mi'));

// flatMap()
const modifiedArrOfNums = numsArray.flatMap(num => [num * 10, num * 10 + 5]);

console.log(modifiedArrOfNums);

// copyWithin()
const arrOfNumsWithDuplicates = [...numsArray].copyWithin(0, 5, 7);

console.log(arrOfNumsWithDuplicates);

// lastIndexOf()
const lastIndexOfSeven = arrOfNumsWithDuplicates.lastIndexOf(7);

console.log(lastIndexOfSeven);

// Polyfills (how array methods work internally)

// A piece of code that provides native support to the older browsers that don't have support of modern functionalities of JavaScript is known as polyfill

const myForEachFunc = (array, repeat) => {
  for (const element of array) {
    repeat(element);
  }
};

myForEachFunc(newAgenda, todo => console.log(todo.task));

const myMapFunc_1 = (array, transform) => {
  const mapped = [];

  for (const element of array) {
    mapped.push(transform(element));
  }

  return mapped;
};

const myMapFunc_2 = (array, transform) => {
  const mapped = array.reduce((acc, cur) => {
    acc.push(transform(cur));

    return acc;
  }, []);

  return mapped;
};

const myMapFunc_3 = (array, transform) =>
  array.reduce((acc, cur) => [...acc, transform(cur)], []);

const double = num => num + num;
const addFive = num => num + 5;

console.log(myMapFunc_1(numsArray, double));
console.log(myMapFunc_2(numsArray, addFive));
console.log(myMapFunc_3(newAgenda, getTasks));

const myFilterFunc_1 = (array, test) => {
  const passed = [];

  for (const element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }

  return passed;
};

const myFilterFunc_2 = (array, test) =>
  array.reduce((acc, cur) => {
    if (test(cur)) {
      acc.push(cur);
    }

    return acc;
  }, []);

const greaterThanThree = num => num > 3;
const odd = num => num % 2;
const even = num => !(num % 2);

console.log(myFilterFunc_1(newAgenda, getUncompletedTodos).map(getTasks));
console.log(myFilterFunc_1(numsArray, greaterThanThree));
console.log(myFilterFunc_2(numsArray, greaterThanThree));
console.log(myFilterFunc_1(numsArray, even));
console.log(myFilterFunc_2(numsArray, odd));

const filterReversedNums = (array, test) => {
  const reversedArray = [];

  for (let i = array.length - 1; i >= 0; i--) {
    if (test(array[i])) {
      reversedArray.push(array[i]);
    }
  }

  return reversedArray;
};

const mixedArray = [9, 'watermelon', 9, 3, null, 9, '99', 3, 'watermelon', 99];

console.log(mixedArray.indexOf(9));
console.log(mixedArray.indexOf(9, 3));
console.log(mixedArray.lastIndexOf(9));

const isNumber = element => typeof element === 'number';

const numbers = myFilterFunc_1(mixedArray, isNumber);
const reversedNumbers = filterReversedNums(mixedArray, isNumber);

console.log(numbers);
console.log(reversedNumbers);

const myReduceFunc_1 = (array, combine, initialValue) => {
  let acc = initialValue;
  let index = 0;

  if (typeof acc == 'undefined') {
    acc = array[index++];
  }

  while (index < array.length) {
    acc = combine(acc, array[index]);
    index++;
  }

  return acc;
};

const myReduceFunc_2 = (array, combine, initialValue) => {
  let acc = initialValue;

  for (const element of array) {
    acc = combine(acc, element);
  }

  return acc;
};

const addAllNumbers = (prev, cur) => prev + cur;
const addAllNumbersTimesTen = (prev, cur) => prev + cur * 10;

console.log(numsArray.reduce(addAllNumbers, 0));
console.log(myReduceFunc_1(numsArray, addAllNumbers, 0));
console.log(myReduceFunc_2(numsArray, addAllNumbers, 0));
console.log(numsArray.reduce(addAllNumbersTimesTen, 0));
console.log(myReduceFunc_1(numsArray, addAllNumbersTimesTen, 0));
console.log(myReduceFunc_2(numsArray, addAllNumbersTimesTen, 0));

const mySomeFunc = (array, test) => {
  for (const element of array) {
    if (test(element)) return true;
  }

  return false;
};

console.log(mySomeFunc(numsArray, isNumber && greaterThanThree && odd));
console.log(mySomeFunc(numsArray, element => element === 7));

const myEveryFunc = (array, test) => {
  for (const element of array) {
    if (!test(element)) return false;
  }

  return true;
};

console.log(myEveryFunc(numsArray, isNumber));
console.log(myEveryFunc(numsArray, isNumber && even));
console.log(myEveryFunc(numsArray, greaterThanThree));

const myFindLastFunc = (array, test) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (test(array[i], i, array)) return array[i];
  }
};

console.log(numsArray.findLast(greaterThanThree));
console.log(myFindLastFunc(numsArray, greaterThanThree));
console.log(myFindLastFunc(numsArray, odd));

console.log(numsArray);

// flat()
const twoDArray = [1, [2, 3], [4, 5]];
const multiDArray = [1, 2, 3, [4, 5, [6, 7, [8, 9, 10]]]];

console.log(twoDArray.flat());
console.log(multiDArray.flat(2));
console.log(multiDArray.flat(3));

const myFlatTwoDArrayFunc = array =>
  array.reduce((acc, value) => acc.concat(value), []);

console.log(myFlatTwoDArrayFunc(twoDArray));

const myFlatArrayOfAnyDepthFunc = (array, depth = 1) =>
  array.reduce((acc, element) => {
    Array.isArray(element) && depth > 0
      ? acc.push(...myFlatArrayOfAnyDepthFunc(element, depth - 1))
      : acc.push(element);

    return acc;
  }, []);

console.log(myFlatArrayOfAnyDepthFunc(twoDArray));
console.log(myFlatArrayOfAnyDepthFunc(multiDArray, Infinity));

const addUpElementsOfMultiDArray = array =>
  array.reduce(
    (acc, element) =>
      Array.isArray(element)
        ? (acc += addUpElementsOfMultiDArray(element))
        : (acc += element),
    0
  );

console.log(addUpElementsOfMultiDArray(twoDArray));
console.log(addUpElementsOfMultiDArray(multiDArray));

const numbers1 = Array.of(1000, 2000, 3000);
const numbers2 = [...numbers, ...numbers1];
const numbers3 = [].concat(numbers, numbers1);

console.log(numbers1);
console.log(...numbers1);
console.log([...numbers1]);
console.log(numbers2);
console.log(numbers3);

// Array.from() with mapping function

// It accepts an iterable object as the first argument and a mapping function as the second (optional) argument

console.log(Array.from(numbers1, double));
console.log(numbers1.map(double));

const cats = [
  { name: 'Leo', gender: 'male' },
  { name: 'Mila', gender: 'female' }
];

let catsNames = Array.from(cats, ({ name }) => name);

console.log(catsNames);

catsNames = cats.map(cat => cat.name);

console.log(catsNames);

console.log(Array.from(catsNames[0]));
console.log([...'Mila']);

console.log(Array.from(Object.values(mixedArray)));

console.log(Object.getOwnPropertyNames(mixedArray));
console.log(Object.hasOwn(mixedArray, 'length'));
console.log(Object.hasOwn(mixedArray, 5));
console.log(Object.values(mixedArray));
console.log(Object.entries(mixedArray));
console.log(Object.fromEntries(Object.entries(mixedArray)));

console.log([...new Set(mixedArray)]);

// Copying arrays

let mixedArrayCopy_1 = mixedArray;
const mixedArrayCopy_2 = [...mixedArray];
const mixedArrayCopy_3 = mixedArray.slice();
const mixedArrayCopy_4 = Object.assign([], mixedArray);
const mixedArrayCopy_5 = JSON.parse(JSON.stringify(mixedArray));

// Comparing arrays

// When the equality operators are used on reference-type variables, they check the reference. If the variables contain a reference to the same item, the comparison will result in true

console.log(Object.is(mixedArrayCopy_1, mixedArray));
console.log(mixedArrayCopy_1 === mixedArray);

// If they're distinct objects in memory, even if they contain identical properties, the comparison will result in false

console.log(mixedArrayCopy_2 === mixedArray);
console.log(mixedArrayCopy_3 == mixedArray);
console.log(mixedArrayCopy_4 === mixedArray);
console.log(mixedArrayCopy_5 == mixedArray);
console.log([1, 2, 3] === [1, 2, 3]);
console.log([] == []);

// If we have two distinct arrays and want to see if their elements are the same, the easiest way to do so is to turn them both into strings and then compare the strings. When the equality operators are comparing primitives, they simply check if the values are the same

console.log(JSON.stringify(mixedArrayCopy_5) === JSON.stringify(mixedArray));
console.log(JSON.stringify([1, 2, 3]) === JSON.stringify([1, 2, 3]));

// Modifying an array

// Modifying a reference type variable affects all variables that point to the same item in memory

mixedArrayCopy_1.unshift('first element');
mixedArrayCopy_1.push('last element');

console.log(mixedArrayCopy_1);
console.log(mixedArray);

// Reassigning an array

// Reassigning a reference type variable replaces the old reference

mixedArrayCopy_1 = [
  'array copy is reassigned to a new object in memory',
  'and',
  'it does not affect the original'
];

console.log(mixedArrayCopy_1);
console.log(mixedArray);
