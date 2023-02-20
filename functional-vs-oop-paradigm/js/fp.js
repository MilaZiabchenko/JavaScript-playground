// Functional programming

// Functional programming is a declarative style of programming. What this means is that it puts more focus on what things are as opposed to how to get them.

// One of the main ideas behind FP is to bring the precision of mathematical functions into our programs.

// There are three main concepts behind FP which allow us to do just that: immutability, separation of functions and data, and first-class functions

// 1. Immutability

// In FP we start off with an immutable set of data as a single source of truth, and then we use functions to combine this data piece by piece and transform it into useful information.

// The advantages to this approach are: the original data in a program will always remain intact, which makes bugs much easier to find, and then, the programs constructed in this way are much easier to keep track of, since you can focus on any given piece individually. The only thing that determines the output of a given piece is the input

const trainee = {
  name: 'Mila',
  salary: 500,
};

const employee = {
  name: trainee.name,
  salary: trainee.salary + 700,
};

const getEmployee = ({ name, salary }, raise) => ({
  name,
  salary: salary + raise,
});

console.log({ trainee });
console.log({ employee });
console.log(getEmployee(trainee, 700));

// 2. Separation of data and functions

// In FP, functions are completely separate entities from the data that they operate on. In order to operate on a given data, the data must be passed as arguments to the function. And because of the rule of immutability, functions should never make changes to any of the data they touch. They only return a modified copy of that data.

// Functions are stateless. They act every time as if for the first time. They give the exact same return value for the exact same arguments.

// In FP we don't need to worry about making our data private because programmers can't alter the data in unwanted ways. Because of the rule of immutability the data remains the constant source of truth

const getPersonData = (firstName, lastName) => ({
  firstName,
  lastName,
  initials: `${firstName.charAt(0)}.${lastName.charAt(0)}.`,
});

const person_1 = getPersonData('Leo', 'Ziablick');
const person_2 = getPersonData('Mila', 'Ziablick');

// When we need to update the data, we simply define a new constant. We then can use this new constant with the updated data in all our future calculations

const updatedPerson_2 = getPersonData('Mi', person_2.lastName);

console.log(person_1);
console.log(person_2);
console.log(updatedPerson_2);

// 3. First-class functions

// This concept of FP is a source of tremendous power and flexibility. It opens a world of possibilities in terms of software design. The fact that functions are isolated entities that can be used in different ways increases our opportunities for code re-use and allows us to combine existing functions to create new functions

// Functions as data

const sayHi = name => console.log(`Hi, ${name}! :)`);

const sayHi2 = sayHi;

sayHi2('Mi');

console.log(sayHi === sayHi2);

// Dynamic function assignment, using a ternary operator

const param = false;

const myFunc = param
  ? () => console.log('First option')
  : () => console.log('Second option');

myFunc();

// One possible application of this is for mocking out pieces of our code during development. If we have a piece of code that's especially time intensive such as network or database operations or especially destructive such as deleting an entire database, it can really get in the way of our development. So what we can do is define a mocked out version of our function that returns some fake data without doing all the time intensive operations that the real version of our function does

const DEVELOPMENT = true;

const fetchDataReal = () => {
  // Some time intensive operation(s) here
  return null;
};

const fetchDataFake = () => ({
  title: 'Special Operation & Peace',
  year: 2022,
});

const fetchData = DEVELOPMENT ? fetchDataFake : fetchDataReal;

console.log(fetchData());

// Another application of this sort of function assignment is in testing of different implementations of a function, for performance reasons.

// Array of functions

const double = x => x * 2;
const subtractTwenty = x => x - 20;
const triple = x => x * 3;
const addFive = x => x + 5;

const arrayOfFunctions = [double, subtractTwenty, triple, addFive, Math.abs];

// Higher-order functions

// Passing functions as arguments

const initialValue = 3;
let result = initialValue;

arrayOfFunctions.forEach(func => (result = func(result)));

console.log(result);

const calcResultOfAllEquations = (arr, initialValue) =>
  arr.reduce((acc, func) => func(acc), initialValue);

result = calcResultOfAllEquations(arrayOfFunctions, initialValue);

console.log(result);

// FP produces abstraction through clever ways of combining functions

const combine10and7 = func => func(10, 7);
const getSum = (x, y) => x + y;

console.log(combine10and7(getSum));
console.log(combine10and7(Math.max));
console.log(combine10and7((x, y) => x ** 2 * y - y));

// Returning functions

// Functions that return functions are also known as function creators or factory functions

const createLoggerFunc = () => () => console.log('Logged');
const logText = createLoggerFunc();

createLoggerFunc()();
logText();

const createAdder = x => y => x + y;

const twoPlusTen = createAdder(2)(10);
const createAdderOfFifty = createAdder(50);
const fiftyPlusTwelve = createAdderOfFifty(12);

console.log(twoPlusTen);
console.log(fiftyPlusTwelve);

// Single responsibility principle

const divide = (x, y) => x / y;
const secondArgumentIsNotZero =
  func =>
  (...args) => {
    if (args[1] === 0) {
      return 'Error: the second argument must be non-zero';
    }

    return func(...args);
  };

const divideSafe = secondArgumentIsNotZero(divide);

console.log(divideSafe(7, 0));
console.log(divideSafe(7, 1));

// In FP, if you want to change data, like an object or an array of data, you return a new object or array with the changes, not the original

const updates = {
  firstName: 'Milù',
};

const newMila = {
  ...person_2,
  ...updates, // rewriting firstName field
  salary: employee.salary * 2.5,
};

console.log(newMila);

const employeeVersions = [trainee, employee, newMila];

const getEmployeesSalaries = employee => employee.salary;

const salaries_1 = employeeVersions.map(getEmployeesSalaries);

console.log(salaries_1);

const map = (array, transform) =>
  array.reduce((acc, cur) => [...acc, transform(cur)], []);

const salaries_2 = map(employeeVersions, getEmployeesSalaries);

console.log(salaries_2);

// Predicate functions

const fields = [person_1.firstName, person_1.lastName, person_1.salary];

const fieldIsNotEmpty = field => !!field;

const allFieldsFilled = fields.every(fieldIsNotEmpty);

console.log(allFieldsFilled);

const makesMoreThanTwoThousand = employee => employee.salary > 2000;

let salaryInspection = employeeVersions.every(makesMoreThanTwoThousand);

console.log(salaryInspection);

salaryInspection = employeeVersions.some(makesMoreThanTwoThousand);

console.log(salaryInspection);

// Partial application

// Partial application is when we take a function that has some number of arguments, and we fix some of those arguments to a set value. This gives us a function with less arguments than we had before. It is a very useful way to configure general functions into more specific ones

const add = (x, y, z) => x + y + z;

const addPartial_1 = x => (y, z) => add(x, y, z);
const add8 = addPartial_1(8);

const sum_1 = add8(10, 12);

console.log(sum_1);

// So basically with partial application, instead of passing in all our arguments at the same time, we are passing them in at different times in different parts of the code

const addPartial_2 = (x, y) => z => add(x, y, z);
const add8and10 = addPartial_2(8, 10);

const sum_2 = add8and10(12);

console.log(sum_2);

// Currying

// Currying means evaluating functions with multiple arguments and decomposing them into a sequence of functions with a single argument

// Currying is a checking method to make sure that you get everything you need before you proceed

// It helps you to avoid passing the same variable again and again

// It divides your function into multiple smaller functions that can handle one responsibility. This makes your function pure and less prone to errors and side effects

// Curry is converting a function with multiple arguments into nested unary functions

// Unary function (arg)

const curry_1 = func => x => y => z => func(x, y, z);

const sum_3 = curry_1(add)(8)(10)(12);

console.log(sum_3);

// Binary function (arg_1, arg_2)

const curry_2 = (func, x) => y => z => func(x, y, z);

const sum_4 = curry_2(add, 8)(10)(12);

console.log(sum_4);

// Variadic function (...args)

const curry_3 =
  func =>
  (...args) =>
    func(...args);

const sum_5 = curry_3(add)(8, 10, 12);

console.log(sum_5);

// Functions broken down into simpler and smaller chunks are easier to read, and the code is easier to debug due to this modularity

const curry_4 = func => x => func(x);
const curry_5 = (func, x) => func(x);

const incrementBy = x => y => y + x;
const incrementByOne = incrementBy(1);

console.log(curry_4(incrementByOne)(2));
console.log(curry_4(incrementByOne)(3));
console.log(curry_5(incrementByOne, 4));
console.log(curry_5(incrementByOne, 5));

const pureIncrement = count => {
  if (count === 3) return count + 2;
  return count + 1;
};

console.log(pureIncrement(2));
console.log(pureIncrement(3));
console.log(pureIncrement(4));
console.log(pureIncrement(5));

// Best Practices of FP:

// 1. Your functions should accept at least one argument.

// 2. Your functions should return data, or another function, or both of them.

// 3. Don't iterate, use higher-order functions instead.

const studentsWithGPAs = [
  ['Phil Ellsworth', 3.25],
  ['Cassidy Williams', 3.75],
  ['Joe Randy', 2.5],
];

const studentsWithUpdatedGPAs_1 = studentsWithGPAs.map(([name, gpa]) => [
  name,
  gpa + 1.25,
]);

console.log(studentsWithUpdatedGPAs_1);

const updateGPA = ([, gpa], amount) => gpa + amount;

const updateGPAs = (students, amount) =>
  students.map(student => updateGPA(student, amount));

const studentsWithUpdatedGPAs_2 = studentsWithGPAs.map(([name, gpa]) => [
  name,
  updateGPA([name, gpa], 1.25),
]);

console.log(studentsWithUpdatedGPAs_2);

const updatedGPAs = updateGPAs(studentsWithGPAs, 1.25);

const studentsWithUpdatedGPAs_3 = studentsWithGPAs.map(([name], index) => [
  name,
  updatedGPAs[index],
]);

console.log(studentsWithUpdatedGPAs_3);

// Having everything written in smaller chunks, free from side effects, your errors will be much faster to pinpoint and you won't be dependant on the environment that they are being run in

// Functional programming is fun
