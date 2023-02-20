// Set data structure

// Sets are collections of values that can be of any type, but the rule with Sets is that each value must be unique

const array = [2, 3, 4, 2, 4, '8', 8, '8', [8, 8]];

const arrayOfUniqueValues = [...new Set(array)];
const setOfUniqueValues = new Set(array);

console.log(arrayOfUniqueValues);
console.log(setOfUniqueValues);

console.log(arrayOfUniqueValues.length === setOfUniqueValues.size);

const setOfBooks = new Set();

setOfBooks
  .add('Pride and Prejudice')
  .add('Pride and Prejudice')
  .add('War and Peace')
  .add('Oliver Twist');

console.log(setOfBooks);
console.log(setOfBooks.size);
console.log(setOfBooks.has('Oliver Twist'));

setOfBooks.delete('War and Peace');

console.log(setOfBooks);

// We can iterate through the elements of a Set in the insertion order

setOfBooks.forEach(book => console.log(book));

for (let book of setOfBooks) console.log(book);

// Map data structure

// The Map object holds key-value pairs. In a Map, any value, both objects and primitive values may be used either as a key or a value. A key is unique in the Map's collection, and it may only occur once

const courseDetails = new Map([
  [{ JavaScript: ['TypeScript', 'Node.js', 'React.s'] }, '82 hours'],
  [
    'modules',
    [{ beginner: [1, 2] }, { intermediate: [3, 4] }, { advanced: 5 }]
  ],
  ['students', 2],
  ['students', ['Leo', 'Melania']]
]);

console.log({ courseDetails });
console.log(courseDetails.size);
console.log(courseDetails.keys());
console.log(courseDetails.values());

// Unlike with a standard object in JavaScript, with Map we must use the get() method to access the value and set() method to update or add values

const initialStudents = courseDetails.get('students');

console.log({ initialStudents });

courseDetails.set('students', ['Leo', 'Melania', 'Claudio', 'Manu', 'Miško']);
courseDetails.set('teacher', 'Eve');

const updatedStudents = courseDetails.get('students');
const courseTeacher = courseDetails.get('teacher');

console.log({ updatedStudents });
console.log({ courseTeacher });
console.log({ courseDetails });

// Map copying

const courseDetailsCopy = new Map(courseDetails);
const courseDetailsDeepCopy = structuredClone(courseDetails);

console.log({ courseDetailsCopy });
console.log(courseDetailsCopy.size);
console.log({ courseDetailsDeepCopy });
console.log(courseDetailsDeepCopy.size);

// Deleting from Map

for (const [key] of courseDetailsCopy) {
  if (key === 'students') {
    courseDetailsCopy.delete(key);
  }
}

console.log({ courseDetailsCopy });
console.log(courseDetailsCopy.size);

courseDetailsDeepCopy.clear();

console.log({ courseDetailsDeepCopy });
console.log(courseDetailsDeepCopy.size);
console.log({ courseDetails });
console.log(courseDetails.size);

const ReactCourse = new Map();

ReactCourse.set('React Core', { description: 'UI Library' })
  .set('React Router', { description: 'Client Side Routing' })
  .set(['Context API', 'Redux Toolkit'], { description: 'State Management' })
  .set(['Jest', 'Testing Library'], { description: 'Testing' })
  .set('Next.js', { description: 'Server Side Rendering' });

console.log({ ReactCourse });

// Unlike objects, Maps can iterate their elements in their insertion order

// A Map is iterated by key-value pairs — a for...of loop returns a 2-member array of [key, value] for each iteration. Iteration happens in insertion order, which corresponds to the order in which each key-value pair was first inserted into the map by the set() method

for (let item of ReactCourse) console.log(item);

for (let entry of ReactCourse.entries()) {
  console.log(entry);
}

for (let key of ReactCourse.keys()) {
  console.log(key);
}

for (let value of ReactCourse.values()) {
  console.log(value.description);
}

// Object from Map

const getObjectFrom = map => Object.fromEntries(map);

const ReactCourseObject = getObjectFrom(ReactCourse);

console.log(ReactCourseObject);

// Map from object

const getMapFrom = object => new Map(Object.entries(object));

const ReactCourseMap = getMapFrom(ReactCourseObject);

console.log(ReactCourseMap);

const arrayOfArrays = [
  ['name', 'Dan'],
  ['city', 'Lviv'],
  ['age', '21']
];

console.log(getObjectFrom(arrayOfArrays));
console.log(getMapFrom(getObjectFrom(arrayOfArrays)));

// Weak references

// Simply put, a weak reference is a reference to an object that doesn't prevent garbage collection if it is the only reference to the object in the memory, and the object is removed

// WeakSet data structure

// WeakSet is similar to Set, but it can only store objects, it is not enumerable, and there is no way to loop over the items contained within it because there is no list of current objects stored in the collection; they are weakly referenced and may be removed at any point

const animals_1 = new WeakSet();
const animals_2 = new Set();

const turtle = { name: 'Tin-tin' };
let lion_1 = { name: 'Mars' };
let lion_2 = { name: 'Saturn' };
let lion_3 = { name: 'Jupiter' };

animals_1.add(turtle).add(lion_1);
animals_2.add(turtle).add(lion_2);

const animals_3 = [turtle, lion_3];

console.log(animals_1.has(lion_1));
console.log(animals_2.has(lion_2));
console.log(animals_3.includes(lion_3));
console.log(animals_3[1] === lion_3);
console.log(animals_3.at(-1));

lion_1 = 'Mars';
lion_2 = 'Saturn';
lion_3 = 'Jupiter';

console.log(animals_1.has(lion_1));
console.log(animals_2.has(lion_2));
console.log(animals_3.includes(lion_3));
console.log(animals_3[1] === lion_3);
console.log(animals_3.at(-1));

console.log(animals_1);
console.log(animals_2);
console.log(animals_3);

// WeakMap data structure

// In comparison to a Map, with a WeakMap we may only use objects or Symbols as the keys, but the values can be any arbitrary value. Also, WeakMap has the side effect of not being enumerable due to the weak references

let pets = new WeakMap();
let dog = { name: 'Charlie' };

pets.set(turtle, { size: 'small' });
pets.set(dog, 'medium');

dog = null; // isn't reachable (garbage collected)

console.log(pets);

// While the strong reference to the original 'dog' object still exists, the 'dog' object persists in the WeakMap, and we can access it with no issues. But, when we overwrite the reference to the original 'dog' object by reassigning the variable to null, the only reference to the original object in memory is the weak reference coming from the WeakMap we created. Because it's a weak reference, when the JavaScript engine runs a garbage collection process again, the 'dog' object will be removed from memory and from the WeakMap we assigned it to.

// If you need to store additional data temporarily and don't want to worry about cleaning up the memory or how the objects are removed, then using weak references is an absolute lifesaver, but in the majority of situations, use normal (strong) references

// Symbol

// Symbols are extremely useful for creating private variables. Every value returned from a Symbol is unique, meaning that we can use them as identifiers for the object properties.

// We create a symbol by using a factory function, in other words we are going to call a function to create a symbol

const username = Symbol('username');
const password = Symbol('password');

const user = {
  [username]: 'Milu', // private
  [password]: '12345678', // private
  location: 'Ukraine' // public
};

console.log(user);
console.log(user.username); // not accessible
console.log(user.password); // not accessible
console.log(user.location); // accessible

console.log(Object.getOwnPropertyNames(user));
console.log(Object.getOwnPropertySymbols(user));

// Symbols are primarily used as unique IDs. What's nice about them is that they are not going to have naming conflict with object string keys

const id = Symbol('unique_id');

const courseInfo = {
  title: 'ECMAScript6+',
  topics: ['destructuring', 'maps', 'promises'],
  id: 'ES6-Course',
  [id]: 2882
};

console.log(courseInfo);
console.log(courseInfo.id);
console.log(courseInfo[id]);

console.log(Object.keys(courseInfo));

for (let key in courseInfo) {
  console.log(key);
}

for (let key of Object.keys(courseInfo)) {
  console.log(key);
}

for (let [key, value] of Object.entries(courseInfo)) {
  console.log(`${key}: ${value}`);
}

const addUniqueIdToTheObject = entry => {
  const object = entry;
  const id = Symbol();

  object.id = id;

  return object;
};

const object_1 = { name: 'Nick' };
const object_2 = { name: 'Veronika' };

addUniqueIdToTheObject(object_1);
addUniqueIdToTheObject(object_2);

console.log(object_1);
console.log(object_2);

console.log('id' in object_1 && 'id' in object_2);
console.log(object_1.id === object_2.id);

console.log(Object.keys(object_1));
console.log(Object.getOwnPropertyNames(object_1));

// Object.hasOwn()

console.log(Object.hasOwn(object_1, 'id'));

Object.prototype.keyInheritedFromPrototype = 'valueInheritedFromPrototype';

console.log(Object.hasOwn(object_1, 'keyInheritedFromPrototype'));
console.log('keyInheritedFromPrototype' in object_1);

// Object literal enhancement

const skier = (name, sound) => ({
  name,
  sound,
  powderYell() {
    const yell = this.sound.toUpperCase();
    console.log(`${yell}! ${yell}!`);
  }
});

console.log(skier('Sandy', 'woo'));
console.log(skier('Sandy', 'woo').name);
skier('Sandy', 'woo').powderYell();

// Destructuring assignment

// With destructuring we can assign a variable name to a position in the array

let firstCity = 'Seattle';
let secondCity = 'Boston';

[firstCity, secondCity] = [secondCity, firstCity];

console.log(firstCity);
console.log(secondCity);

const gang = {
  keyOne: 'Bo',
  keyTwo: 'Le',
  keyThree: 'Mi'
};

// Getting object keys
const getKeys = object => {
  const result = [];

  for (let key in object) {
    result.push(key);
  }

  return result;
};

console.log(getKeys(gang)); // own properties + inherited properties
console.log(Object.keys(gang)); // just own properties

// Getting object values
const getValues = object => {
  const result = [];

  for (let key in object) {
    result.push(object[key]);
  }

  return result;
};

console.log(getValues(gang));
console.log(Object.values(gang));
console.log(Object.values(gang).toString().replaceAll(',', ', ')); //stringified values

// Generators

// Generators are functions that can return ('yield') multiple values, one after another, on-demand

function* getOceanGreetings() {
  yield 'Hello, turtles!';
  yield 'Hello, waves!';
  yield 'Hello, whales!';
  yield 'Hello, islands!';

  return 'Hello, adventure!';
}

// When a generator is called, it doesn’t run its code. Instead it returns a special object, called 'generator object', to manage the execution.

// The main method of a generator is next(). When called, it runs the execution until the next yield statement. Then the function execution pauses, and the yielded value is returned to the outer code.

// The result of next() is always an object with two properties: value and done

const greetings_1 = getOceanGreetings();

console.log(greetings_1.next().value);
console.log(greetings_1.next().done);
console.log(greetings_1.next());
console.log(greetings_1.next());
console.log(greetings_1.next());

// Generators are iterable. We can loop over their values using 'for-of' statement

const greetings_2 = getOceanGreetings();

for (let greeting of greetings_2) {
  console.log(greeting);
}

function* startGame(yourAnswer) {
  yield 'Do you love JavaScript?';
  yield yourAnswer;

  return yourAnswer === 'Yes'
    ? 'JavaScript loves you back 😊'
    : 'Ok, no problem';
}

const game_1 = startGame('Not really');
const game_2 = startGame('Yes');

console.log(game_1.next());
console.log(game_1.next());
console.log(game_1.next());
console.log(game_2.next());
console.log(game_2.next());
console.log(game_2.next());

function* generateSequenceOfFlats() {
  let flat = 62;

  while (flat <= 65) {
    yield flat++;
  }
}

// As generators are iterable, we can call all related functionality, e.g. the spread syntax

const arrayOfFlatNumbers = [...generateSequenceOfFlats()];

console.log(arrayOfFlatNumbers);

const arrayOfStrings = ['I', 'feel', 'better', '😊'];

function* generateSequenceOfStrings(...strings) {
  for (let string of strings) yield string;
}

const sentenceGen = generateSequenceOfStrings(...arrayOfStrings);

const sentence = [...sentenceGen].join(' ');

console.log(sentence);

// Required parameters (default params)

const isRequired = () => {
  throw new Error(`Param is required`);
};

const add = (a = isRequired(), b = isRequired(), c = isRequired()) => a + b + c;

console.log(add(2, 3, 5));

// String destructuring with rest

const [first, second, ...rest] = isRequired.name;

console.log(first, second);
console.log(...rest);

console.log([...rest].join(''));

// String methods

// padStart()
const hideNumber = number => number.slice(-4).padStart(number.length, '*');

const phoneNumber = '0123456789';

console.log(hideNumber(phoneNumber));

// repeat()
const yell = 'Woo! ';

const party = yell.repeat(2);

console.log(party);

const cat = {
  name: 'Leo',
  birthDate: '04/03/2017',

  meow(times) {
    return 'Meow! '.repeat(times);
  },

  purr(times) {
    return 'prrr'.repeat(times);
  },

  snore(times) {
    return 'Zzz'.repeat(times);
  }
};

console.log(cat.meow(3));
console.log(cat.purr(5));

// Optional chaining operator

console.log(cat?.snore?.(8) || `The cat doesn't snore`);

// Nullish coalescing operator

console.log(cat?.bark?.(8) ?? `Hey, cats don't bark 😂😂😂`);

const a = undefined ?? 'Hello';
const b = null ?? cat.name;
const c = '' || '! 👻';
const d = '' ?? 'Bye!';

console.log(`${a}, ${b}${c}${d}`);

console.log(`${cat.name}'s breed is ${cat.breed ?? 'just awesome'}.`);

// The nullish coalescing assignment operator

// The nullish coalescing assignment operator only assigns the right operand to the left operand if the right operand is null or undefined

cat.breed ??= 'Scottish Fold';

console.log(`${cat.name}'s breed is ${cat.breed}.`);

const calcAge = birthDate => {
  const newAge = new Date().getFullYear() - new Date(birthDate).getFullYear();
  const prevAge = newAge - 1;

  return new Date().getMonth() >= new Date(birthDate).getMonth()
    ? newAge
    : prevAge;
};

cat.age ??= calcAge(cat.birthDate);

console.log(cat);

const getGameStatus = score => {
  const status = score ?? `Let's start the game and score some points!`;

  return typeof score === 'number' ? { score: score } : status;
};

console.log(getGameStatus(null));
console.log(getGameStatus());
console.log(getGameStatus(0));
console.log(getGameStatus(5));

// Computed properties

const initialProp = 'initialScore';
const finalProp = 'finalScore';

const objectWithResults = {
  [initialProp]: getGameStatus(0).score,
  updatedScore: getGameStatus(52).score,
  [finalProp]: getGameStatus(99).score
};

console.log(objectWithResults);

// Logical OR assignment operator

// The logical OR assignment operator (||=) accepts two operands and assigns the right operand to the left operand if the left operand is falsy

let song = '';

console.log(song || (song = 'Map Of Your Head'));
console.log((song ||= 'Map Of Your Head'));

song = 'Diamant';

console.log(song || (song = 'Map Of Your Head'));
console.log((song ||= 'Map Of Your Head'));

// Logical AND assignment operator

// The logical AND assignment operator only assigns the right operand to the left operand if the right operand is truthy

console.log(song && (song = 'Map Of Your Head'));
console.log((song &&= 'Map Of Your Head'));
