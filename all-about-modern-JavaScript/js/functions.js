// Execution context (EC)

// Execution context is the environment in which the JavaScript code is executed, and the value of 'this', variables, objects and functions at a particular time is defined by this environment

// Global execution context (GEC)

// When the file first loads in the browser, the JavaScript engine creates the Global Execution Context, which has two phases: creation and execution.

// During the creation phase, the engine creates the global object, 'this' variable and binds it to the global object, and sets up memory space for variables and functions

// Hoisting

// JavaScript hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.

// Variables and function expressions declared with the keywords 'let' and 'const' are placed in the memory and set to undefined to begin with, but we can't access them before initialization that happens during the execution phase.

// During the creation phase of the GEC, the engine places the function in the heap memory. To be precise, it creates an object of the Function type and a named reference that points to the function object

// Scope

// The scope is the current context of execution in which values and expressions are 'visible' or can be referenced

// There are four kinds of scope in JavaScript — global scope, module scope, function scope, and block scope

let myFriendsName = 'Oksana';

console.log(myFriendsName);

// Functional execution context (FEC)

// Functional execution context is defined as the context created by the JS engine whenever it finds any function call

getMyFriendsName(); // function hoisted in global scope

console.log(myFriendsName);

// Function declaration

function getMyFriendsName() {
  inner(); // function hoisted in local (function) scope

  return;

  function inner() {
    myFriendsName = 'Hanna';
  }
}

// Variable shadowing

// Variable shadowing occurs when a variable declared within a certain scope has the same name as a variable declared in an outer scope

const programmingLanguage = 'JavaScript';

function getProgrammingLanguage_1() {
  const programmingLanguage = 'Rust';

  console.log(programmingLanguage);
}

getProgrammingLanguage_1();

// Scope chain

// The scope chain is a list of all the variable objects of functions inside which the current function exists

function getProgrammingLanguage_2() {
  getProgrammingLanguage_1();

  console.log(programmingLanguage);
}

getProgrammingLanguage_2();

console.log(programmingLanguage);

// Parameters

// We can pass values into functions, creating local variables aka parameters inside a function parentheses and using them inside a code block

function calcAutumnDays(Sep, Oct, Nov = Sep) {
  // The return statement

  // The return statement ends the function's execution, which means any code after it won't be executed. You can also return nothing in order to stop the function's execution with, say, if statement, when the condition is true

  return Sep + Oct + Nov;
}

// Arguments

// When the function is invoked, a new execution context is created, and the values of the variables, created inside the function are initially set to undefined in the memory space. When we pass arguments during invocation, the function local variables receive new values

console.log(calcAutumnDays(30, 31));

// Default params

function greet_1(name = 'my gorgeous friend', time = 'morning') {
  console.log(`Good ${time}, ${name}!`);
}

// A function assigns default values to the parameters, when we don't pass arguments into it

greet_1();
greet_1('Leo');

// The order of the arguments must match the order of the parameters of the function

greet_1('gang', 'evening', 'redundant argument');

// Function expression

// We can also store functions in variables and invoke them in a very similar way

const greet_2 = function (name = 'guys', time = 'night') {
  console.log(`Good ${time}, ${name}!`);
};

greet_2();
greet_2('Shaun');

// Arrow function

const calcSummerDays = (Jun = 30, Jul = 31, Aug = Jul) => Jun + Jul + Aug;

console.log(calcSummerDays());

const defaultValue = 0;

const calc = (defaultValue = 7) => defaultValue + 5 ** 2 * 5;

console.log(calc());
console.log(calc(defaultValue));

const calcEnergy = (mass = 5) => mass * 299_792_458 ** 2;

console.log(`Energy equals ${calcEnergy()} Joules`);
console.log(`Energy equals ${calcEnergy(62)} Joules`);

// Method vs function invocation

const song = { title: 'My Funny Valentine', singer: 'Chet Baker' };

const capitalizeTitle = ({ title }) => title.toUpperCase(); // method invocation

const getSongInfo = (singer, title) => ({ [singer]: title });

console.log(getSongInfo(song.singer, capitalizeTitle(song))); // function invocation

// Anonymous function

const show_1 = function () {
  console.log('Anonymous function 1');
};

show_1();

const show_2 = () => console.log('Anonymous function 2');

show_2();

// Immediately invoked function expression

(function () {
  console.log('Immediately invoked function executed.');
})(); // trailing parenthesis

const personality = {
  firstName: 'Leo',
  lastName: 'Ziablick'
};

(function () {
  console.log(
    `${personality.firstName} ${personality.lastName} is invoked immediately`
  );
})(personality);

(function ({ firstName }) {
  console.log(`${firstName} is the best.`);
})(personality);

// Pure function

// A pure function is a function, that when given an input, will always return the same output. Pure functions also don't modify the arguments passed to them and don't affect anything in the outside scope (no side effects)

// As long as a function only takes primitive values as parameters and doesn't use any variables in its surrounding scope, it is automatically pure, as it can't affect anything in the outside scope. All variables created inside are garbage-collected as soon as the function returns

const calcPure = (a, b, c, d) => a + b ** c * d;

calcPure(0, 5, 2, 5);

// First-class function

// The concept of first-class functions means that functions are treated like any other variable. A function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable

// Callback function

// A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some action

const main = (value, callback) => {
  console.log(`Main function is running with a value ${value}...`);

  value += 10;

  callback(value);

  console.log(`Main function ran with a value ${value}.`);
};

main(15, value => console.log(`Callback returns ${value + 12}.`));
main(15, value => console.log(`Callback returns ${value % 10}.`));

// Closure

// A closure is a function combined with references to the variables defined outside of it. Closures maintain the variable references, which allow functions to access variables outside of their scope.

// Lexical (outer) environment

// A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any variables that were in-scope at the time the closure was created.

// The closure is a function that closes over (captures, remembers) variables from its lexical scope. It accesses its lexical scope even executed outside of its lexical scope.

// The lexical scoping means that inside the inner (nested) scope you can access variables of outer scope

const mi = 'Mila';

const outerFunc = () => {
  const le = 'Leo';

  const innerFunc = () => {
    const bo = 'Bogdan';

    const innerInnerFunc = () => {
      // The function body has access to variables that are defined outside the function body

      console.log(`${mi}, ${le} and ${bo} are awesome!`);
    };

    innerInnerFunc();
  };

  innerFunc();
};

outerFunc();

// Higher-order function

// A higher-order function is a function that accepts functions as parameters and/or returns a function

// Returning functions from functions

// Thanks to closures, the returned function has access to the data of the parent function, even after the parent function is run

const ourNames = ['Mila', 'Leo'];

function outerSpace([me, mySoulmate]) {
  const ourCity = 'Vinnitsa';

  return function innerSpace() {
    const ourHouse = 'a cosy apartment';

    return `Hey, I'm ${me}. I live in ${ourHouse} in ${ourCity} with my dear friend ${mySoulmate}.`;
  };

  // The inner function is returned from the outer function before being executed
}

// 'createOurSpace' is a reference to the instance of the function 'innerSpace' that is created when outerSpace is run

const createOurSpace = outerSpace(ourNames);

console.log(createOurSpace);

// When 'createOurSpace' is invoked, the variable 'ourCity' remains available for use because the instance of 'innerSpace' maintains a reference to its lexical environment, within which 'ourCity' exists

const ourLife = createOurSpace();

console.log(ourLife);

const parentFn = (mentor, mentee) => topic =>
  `${mentor} and ${mentee} are talking about ${topic}.`;

// There are two ways to call the inner function:

// 1. using double parentheses
const talk_1 = parentFn('Andriy', mi)('matrices');

// 2. using a variable
const returnedFnInstance = parentFn('Andriy', 'Toma');

const talk_2 = returnedFnInstance('web sockets');

console.log(talk_1);
console.log(talk_2);

const validateParam = param => (param ? () => '😎' : undefined);

const validateFalse = validateParam(false);
const validateTrue = validateParam(true);

// The optional chaining operator with function calls

console.log(validateFalse?.(), validateTrue?.());

// Returning functions with caching

const addTwoNumbersWithCaching = () => {
  const cache = {};

  return (num_1 = 5, num_2 = 5) => {
    if (cache[num_1] && cache[num_2]) {
      return `Both numbers from cache, sum: ${cache[num_1] + cache[num_2]}`;
    } else if (cache[num_1]) {
      cache[num_2] = num_2;

      return `First number from cache, sum: ${cache[num_1] + num_2}`;
    } else if (cache[num_2]) {
      cache[num_1] = num_1;

      return `Second number from cache, sum: ${num_1 + cache[num_2]}`;
    } else {
      cache[num_1] = num_1;
      cache[num_2] = num_2;

      return `Calculated, sum: ${num_1 + num_2}`;
    }
  };
};

const addTwoNumbers = addTwoNumbersWithCaching();

console.log(addTwoNumbers());
console.log(addTwoNumbers());
console.log(addTwoNumbers(10, 20));
console.log(addTwoNumbers(10, 20));
console.log(addTwoNumbers(10, 25 / 1));
console.log(addTwoNumbers(3, 5 * 5));
console.log(addTwoNumbers(5, 15));
console.log(addTwoNumbers(35, 15));
console.log(addTwoNumbers(35, 15));

const birds = ['finch', 'tit', 'catbird', 'rook'];

const generateBirds = () => {
  let index = 0;

  return () => birds[index++];
};

const gen_1 = generateBirds();
const gen_2 = generateBirds();

console.log(gen_1());
console.log(gen_1());
console.log(gen_2());
console.log(gen_2());
console.log(gen_2());

// Generator function

function* generate(...items) {
  for (let item of items) {
    yield item;
  }
}

const birdsGen = generate(...birds);

for (let bird of birdsGen) {
  console.log({ bird: bird });
}

// Returning objects from functions

// A function can return an object that can store and change data thanks to closures

const makePerson = name => {
  let _name = name; // '_name' private variable is not accessible from the outside

  return {
    setName: newName => (_name = newName),
    getName: () => _name // the only way to get the '_name' value is through the method of the object returned from the function
  };
};

const me = makePerson('Mila');

console.log(me.getName());

me.setName('Mila Ziablick');

console.log(me.getName());

// The previous example closely resembles a class that stores private state and exposes public getter and setter methods. We can extend this object-oriented parallel further by using closures to implement private methods

const Person = ({ name, job }) => {
  let _name = name;
  let _job = job;

  const privateSetJob = newJob => (_job = newJob);

  // 'privateSetJob' has access to the private state variable '_job' through a closure, and it is not directly accessible to consumers

  return {
    getName: () => _name,
    getJob: () => _job,
    setJob: newJob => privateSetJob(newJob)
  };
};

const president = Person({ name: 'Volodymyr Zelensky', job: 'Comedian' });

console.log(president.getName());
console.log(president.getJob());

president.setJob('President');

console.log(president.getJob());

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const inBetween = (x, y) => num => num >= x && num <= y;

// With closures we remember parameters passed into the function inBetween and then we use them in the returned function
console.log(nums.filter(inBetween(3, 7)));

// It is common for a callback to reference a variable declared outside of itself
console.log(nums.filter(num => num >= 3 && num <= 7));

// num is available in the callback because of lexical scoping, and the value of num is persisted when the anonymous function is called by filter because of a closure

let countEven = 0;

nums.forEach(num => num % 2 === 0 && ++countEven);

// The callback iterator is a closure because it captures countEven variable

console.log(countEven);

let countClicked = 0;

const btn = document.createElement('button');
btn.textContent = `Click me!`;
document.body.append(btn);

const handleClick = () => {
  countClicked++;
  countClicked === 1
    ? (btn.textContent = `You clicked ${countClicked} time`)
    : (btn.textContent = `You clicked ${countClicked} times`);

  // Being a closure, handleClick() captures countClicked from the lexical scope and updates it when a click happens. Even more, btn.textContent is captured too

  setTimeout(() => {
    btn.textContent = `Clicking session is over!`;
    btn.style.backgroundColor = '#555';
    btn.removeEventListener('click', handleClick);
  }, 10000);
};

btn.addEventListener('click', handleClick);

// Currying

// Currying, an important concept of functional programming, is also possible thanks to closures.

// Currying is when a function — instead of taking all arguments at one time — takes the first one and returns a new function, which takes the second one and returns a new function, which takes the third one, etc. until all arguments are completed. This technique allows us to work with unary functions.

// Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).

const curry = f => a => b => c => f(a, b, c);
const sum = (a, b, c) => a + b + c;
const curriedResult = curry(sum);

console.log(curriedResult(3)(5)(7));

// Functions as objects

// Being an object, functions have built-in properties and methods

console.log(curry.toString());
console.log(curry.name);
console.log(curry.length);
console.log(sum.length);

console.log(sum.call(null, 10, 3, 5));
console.log(sum.apply(null, [10, 3, 5]));

const firstArgument_10 = sum.bind(null, 10);

console.log(firstArgument_10(3, 5));

const args = [10, 3, 5];

console.log(sum(10, 3, 5) === sum.call(null, ...args));
console.log(sum(...args) === sum.apply(null, [10, 3, 5]));
console.log(curriedResult(10)(3)(5) === firstArgument_10(3, 5));

const curryAMessage = greeting => name => message =>
  `${greeting}, ${name}! ${message}?`;

console.log(curryAMessage(`Hey`)(mi)(`What's up`));

// Partial application

// Partial application is having a function with a certain number of arguments and fixing some of them to a set value. This gives us a function with less arguments.

// General function

const makeMultiplier = a => b => a * b;

// Specific function

const triple = makeMultiplier(3);

// This function with fixed arguments can then be called from anywhere else in our code, and it will be as if we had called the original function with all of its arguments

console.log(makeMultiplier(3)(33) === triple(33));

// In general, if there is a function that we use often in our code, where one or more arguments are the same, it is a good candidate for using partial application

const getAllFriends = (friend_1, friend_2, friend_3) =>
  `${friend_1} is a faithful friend of ${friend_2} & ${friend_3} 🤗💖`;

const getFriendsPartially = friend_1 => (friend_2, friend_3) =>
  getAllFriends(friend_1, friend_2, friend_3);

const getFriendsOfMila = getFriendsPartially(mi);

console.log(getAllFriends(mi, 'Leo', 'Bogdan'));
console.log(getFriendsPartially(mi)('Ania', 'Oksana'));
console.log(getFriendsOfMila('Suzan', 'Andrea'));

const func_1 = x => y => y ** x;
const func_2 = x => y => y * x;
const func_3 = x => y => y + x;
const func_4 = x => y => y / x;
const func_5 = x => y => y - x;

const partialFunctionsOf5 = [func_1, func_2, func_3, func_4, func_5].map(func =>
  func(5)
);

// Composition of functions

let resultOfAllOperations = Math.abs(
  partialFunctionsOf5[4](
    partialFunctionsOf5[3](
      partialFunctionsOf5[2](partialFunctionsOf5[1](partialFunctionsOf5[0](1)))
    )
  )
);

console.log(resultOfAllOperations);

let resultOfAllOperationsReversed = partialFunctionsOf5[0](
  partialFunctionsOf5[1](
    partialFunctionsOf5[2](partialFunctionsOf5[3](partialFunctionsOf5[4](0)))
  )
);

console.log(resultOfAllOperationsReversed);

// Array of functions

const arrayOfFunctions = [...partialFunctionsOf5, Math.abs];

resultOfAllOperations = arrayOfFunctions.reduce((acc, func) => func(acc), 1);

console.log(
  `The cumulative result of all functions' operations is ${resultOfAllOperations}.`
);

resultOfAllOperationsReversed = arrayOfFunctions.reduceRight(
  (acc, func) => func(acc),
  0
);

console.log(
  `The cumulative result of all functions' operations in reverse order is ${resultOfAllOperationsReversed}.`
);

// Assigning properties to functions

const getRoles = () => Object.entries(getRoles.team).map(([, role]) => role);

getRoles.team = {
  Hanna: 'QA Engineer',
  Mila: 'Software Engineer'
};

console.log(getRoles.team);
console.log(getRoles());

// Recursive function

// All recursive algorithms work on the same principle. The function calls itself and passes results from the previous calculation.

// In recursion, we always have to tell our function when to stop. Without a stop condition any recursive function will go on infinitely

// Base case

// The base case (also known as the terminating case) stops a function from calling itself when a given condition is reached. Without a base case, an infinite loop will cause a stack overflow

// Recursive case

// The recursive case is where the recursion actually happen

const countUpTo = (num, max) => {
  if (num > max) return; // base case

  console.log(num);

  countUpTo(num + 1, max); // recursive case
};

countUpTo(1, 3);

// The call stack and recursion

// When a function calls itself recursively, it gets added to the call stack, meaning that the last item added to the stack is the first one to be removed from the stack later (LIFO)

const recursiveSum = num => (num <= 1 ? num : num + recursiveSum(num - 1));

console.log(recursiveSum(5));

const fibonacciValue = index =>
  index < 2 ? index : fibonacciValue(index - 2) + fibonacciValue(index - 1);

console.log(fibonacciValue(10));

// In programming, all problems that can be solved with a recursive approach also have an iterative approach that can be used to solve them. That being said, for many problems recursion provides a much easier solution

const factorial_1 = num =>
  num === 0 || num === 1 ? 1 : num * factorial_1(num - 1);

console.log(factorial_1(5));
console.log(factorial_1(10));

// The downside of a recursive algorithm is that it needs to recalculate all previous values each time. Thus, it’s not very effective and time complexity is exponential: O(2^N). Therefore, we can refactor our code, using the iterative algorithm

const factorial_2 = num => {
  if (num === 0 || num === 1) return 1;

  for (let i = num - 1; i > 1; i--) num *= i;

  return num;
};

console.log(factorial_2(5));
console.log(factorial_2(10));

const factorial_3 = num => {
  let result = num;

  if (num === 0 || num === 1) return 1;

  while (num > 1) {
    num--;
    result = result *= num;
  }

  return result;
};

console.log(factorial_3(5));
console.log(factorial_3(10));

const categories = [
  { id: 'animals', parent: null },
  { id: 'mammals', parent: 'animals' },
  { id: 'cats', parent: 'mammals' },
  { id: 'dogs', parent: 'mammals' },
  { id: 'Siberian Husky', parent: 'dogs' },
  { id: 'Akita Inu', parent: 'dogs' },
  { id: 'Abyssinian', parent: 'cats' },
  { id: 'Norwegian Forest', parent: 'cats' },
  { id: 'Scottish Fold', parent: 'cats' }
];

const makeTree = (categories, parent) => {
  const node = {};

  categories
    .filter(c => c.parent === parent)
    .forEach(c => (node[c.id] = makeTree(categories, c.id)));

  for (const key in node) {
    if (!Object.keys(node[key]).length) {
      node[key] = null;
    }
  }

  return node;
};

console.log(JSON.stringify(makeTree(categories, null), null, 2));

// Regular function vs arrow function

// 1. 'this' value

// 'this' keyword is a variable used to store an object reference when a function is invoked. The object the 'this' keyword references or points to depends on the execution context it is used in. Conceptually, 'this' is akin to a pronoun in human languages because it is used to refer to an object, just as a pronoun refers to a noun

// 'this' in regular function

// (from the lowest priority to the highest):

// 1) function invocation => global object;
// 2) method invocation => object owning the method;
// 3) indirect invocation (call(), apply()) => first argument;
// 4) constructor invocation with 'new' keyword => newly created instance

// Function invocation

function addCountriesPropGlobally(countries) {
  this.countries = countries;
}

addCountriesPropGlobally(['Australia', 'New Zealand']);

console.log(this, this.countries);

// Method invocation

const Iceland = {
  continent: 'Europe',

  getThis() {
    return this;
  },

  getContinent() {
    return this.continent;
  }
};

console.log(Iceland.getThis());
console.log(Iceland.getContinent());

// Indirect invocation

// call() and apply() methods invoke the function indirectly. Both methods allow us to specify explicitly the 'this' value (object reference) for the invocation, which means we can invoke any function as a method of any object, even if it is not a method of that object. In both call() and apply(), the first argument is the 'this' keyword, which represents the object on which the function is invoked

function getContinent(prefix) {
  console.log(this);
  console.log(`${prefix} ${this.continent}.`);
}

getContinent.call(Iceland, 'Iceland is in');

function update(params) {
  console.log(this);

  this.arrayOfAddresses.push(params);
}

const objectOfAddresses = { arrayOfAddresses: [[52, 62]] };

update.call(objectOfAddresses, [52, 65]);

console.log(objectOfAddresses.arrayOfAddresses);

update.apply(objectOfAddresses, [[52, 86]]);

console.log(objectOfAddresses.arrayOfAddresses);

// Constructor invocation

class MyCat {
  #name = 'Leo';
  #color = 'grey tabby';

  get description() {
    return `My dear friend's name is ${
      this.#name
    }. He is a beautiful and playful ${this.#color} cat with a loving heart.`;
  }

  getThis() {
    console.log(this);
    console.log(this.description);
  }
}

const myDearFriend = new MyCat();

myDearFriend.getThis();

// 'this' in arrow function

// No matter how or where being executed, 'this' value inside of an arrow function always equals 'this' value of the closest containing 'non-arrow' function. 'this' inside the arrow function is bound lexically

document.addEventListener('click', function (e) {
  console.log('regular:', this, e.currentTarget, e.target);
});
document.addEventListener('click', e =>
  console.log('arrow:', this, e.currentTarget, e.target)
);

// Contrary to a regular function, the indirect invocation of an arrow function using call() or apply() doesn’t change the value of 'this': the context value is always resolved lexically, and it stays the same throughout the entire life cycle of the function

// 'this' in nested functions and methods

// The context of nested functions and methods (except arrow functions) depends on their own environment and invocation type

this.language = programmingLanguage;

const programming = {
  language: 'Python',
  prop: {
    language: 'Rust',

    getLanguage_1: function () {
      return this.language;
    }
  },

  getLanguage_2: function () {
    return this.language;
  },

  getLanguage_3: () => {
    return this.language;
  }
};

console.log(programming.prop.getLanguage_1());
console.log(programming.getLanguage_2());
console.log(programming.getLanguage_3());

// 2. Constructors

// The regular function can easily construct objects (instances of a function).

// The arrow function cannot be used as a constructor as a consequence of 'this' resolved lexically.

// 3. Arguments object

// Inside the body of a regular function, arguments is a special array-like object containing the list of arguments with which the function has been invoked.

// On the other side, no arguments special keyword is defined inside an arrow function. The arrow function accesses arguments from the outer function. Same as with 'this' value, the arguments object is resolved lexically.

const myFunc = function (...args) {
  console.log('regular:', arguments, args);

  // Inside of the body of myArrowFunc, arguments object equals to the arguments of myFunc invocation. If you’d like to access the direct arguments of the arrow function, you can use the rest parameters feature

  const myArrowFunc = (...args) => console.log('arrow:', arguments, args);

  myArrowFunc(1, 2, 3);
};

myFunc(10, 20, 30);
