// Expressions and operators

// An expression is a valid unit of code that resolves to a value, and all complex expressions are joined by operators.

// Operator is a special function that takes one or more parameters and returns one result

3 + 7; // non-assignment expression
const pi = 3.14; // assignment expression

// Expressions are always part of statements

// Statements

// A statement is a piece of code used to instruct the computer on an action to execute. It performs an action without producing a value.

// A JavaScript program consists of a sequence of statements. Each statement is an instruction to do something, like create a variable, run an if/else condition, or start a loop

let radius; // declaration statement
radius = 10; // expression statement

// Math operators

// Math infix binary operators are +, -, *, /, %, **

// Operator precedence

// Operator precedence determines how operators are parsed concerning each other. Operators with higher precedence become the operands of operators with lower precedence

// Order of arithmetic operations (B E D M A S)

let area = pi * radius ** 2;

console.log(area);

// Left and right associativity

// The order of evaluation is always left-to-right regardless of associativity and precedence. Precedence comes before associativity. The difference in associativity comes into play when there are multiple operators of the same precedence.

// Assignment operators and the unique exponentiation operator has right associativity, whereas other arithmetic operators have left associativity

let result_1;
let result_2;

// Chaining assignment (not recommended)

result_2 = result_1 = 2 ** (3 ** 2);

console.log(result_1, result_2);

// Grouping operator

// Grouping has the highest precedence. However, that does not always mean the expression within the grouping symbols is evaluated first, especially when it comes to short circuiting

result_1 = (2 ** 3) ** 2;

console.log(result_1, result_2);

// Short circuit evaluation

// Logical operators

let result_3 = null;

// Logical AND (&&) aka logical conjunction

console.log(result_3 && result_2 / result_1);

// Logical OR (||) aka logical disjunction

console.log(result_3 || result_2 / result_1);

// Nullish coalescing operator

console.log(result_3 ?? result_2 / result_1);

// Optional chaining operator

console.log(result_3?.(result_2 / result_1));

const result_4 = 0 && 2;
const result_5 = 4 * 2 && 3 * 6;
const result_6 = (40 && 2) || 33;

console.log(result_4, result_5, result_6);
console.log(result_4 > result_5 > result_6);
console.log(result_4 < result_5 < result_6);

// Logical NOT (!)

let user = false;

!user && console.log('You must be logged in to continue');

// Prefix and postfix unary operators

let likes = 12;

console.log(likes++);
console.log(likes);
console.log(--likes);
console.log(likes);

// Compound assignment operators (shorthand operators)

likes += 5;

console.log(likes);

likes -= 7;

console.log(likes);

likes **= 2;

console.log(likes);

likes /= 4;

console.log(likes);

// Type coercion

// Behind the scenes JS engine is implicitly converting types before evaluating them

console.log(5 + '5', typeof (5 + '5'));
console.log(5 + null, typeof (5 + null));
console.log(5 + true, typeof (5 + true));
console.log('5' + true, typeof ('5' + true));
console.log(true + false, typeof (true + false));

let something;

console.log(5 + something, typeof (5 + something));
console.log('5' + something, typeof ('5' + something));

// Loose vs strict equality

// Loose (in)equality

// Comparison operators

// '==' comparison operator stands for an abstract(loose) equality which means that a value's type is not considered when we perform a comparison, and different types can be equal

// All comparison operators return booleans

console.log(55 == '55');
console.log(55 != '55');
console.log(55 > '53');
console.log('leo' > 'Milu');
console.log('teo' > 'Milu');
console.log('' == 0);
console.log(null == 0);
console.log(null == undefined);

// Strict (in)equality

// '===' comparison operator stands for a strict equality which means that a value's type is considered when we perform a comparison, and different types can not be equal

console.log(55 === 55 / 1);
console.log(55 === '55');
console.log(55 !== '55');
console.log(null === undefined);

// Object.is()

console.log(Object.is(55, 55 * 1));
console.log(Object.is(55, '55'));
console.log(Object.is(null, undefined));
console.log(Object.is(NaN, NaN));

// isNaN()

// isNaN() converts the argument to a Number and returns true if the resulting value is NaN

console.log(isNaN(77));
console.log(isNaN('77'));
console.log(isNaN('Milu'));
console.log(isNaN(NaN));

// Number.isNaN()

// Number.isNaN() does not convert the argument; it returns true when the argument is a Number and is NaN

console.log(Number.isNaN(77));
console.log(Number.isNaN('77'));
console.log(Number.isNaN('Milu'));
console.log(Number.isNaN(NaN));

// isFinite()

console.log(isFinite(NaN));
console.log(isFinite(-Infinity));
console.log(isFinite(-3));
console.log(isFinite('-3'));
console.log(isFinite(null));

// Number.isFinite()

console.log(Number.isFinite(NaN));
console.log(Number.isFinite(Infinity));
console.log(Number.isFinite(-3));
console.log(Number.isFinite('-3'));
console.log(Number.isFinite(null));

// isFinite() vs Number.isFinite()

// In comparison to the global isFinite() function, Number.isFinite() method doesn't first convert the parameter to a number. This means only values of the type number and are finite return true, and non-numbers always return false

// Number.isInteger()

console.log(Number.isInteger(-3));
console.log(Number.isInteger(0));
console.log(Number.isInteger(3.7));
console.log(Number.isInteger(Infinity));

// Explicit type conversion

// Conversion to number

const string = '55.55';

console.log(Number(null));
console.log(Number(true));
console.log(Number(string));
console.log(+string);
console.log(parseFloat(string));
console.log(parseInt(string));
console.log(parseInt('55.55 * 10'));
console.log(parseInt(string * 100));

// Conversion to string

const number = 55.55;

console.log(number + '');
console.log(String(number));
console.log(number.toString());

// Number.toFixed()

console.log(Number(55.55555).toFixed(2));
console.log(Number(55.55555).toFixed(2) + 789);

// Conversion to boolean

// Truthy and falsy values

// Strings of any length are all truthy. An empty string (with no length) is falsy

console.log(Boolean(string), Boolean(number), Boolean('0'), Boolean(0));
console.log(Boolean(Infinity), Boolean(-10.25), Boolean([]), Boolean({}));

const True = !0;
const alsoTrue = !!1;
const False = !1;
const alsoFalse = !!0;

console.log(True, alsoTrue, False, alsoFalse);

// Conversion to undefined

// void operator

// The void operator evaluates the given expression and then returns undefined

console.log(void 1);
console.log(void { name: 'Banksy' });

// Loops, conditional statements & control flow

// The concepts of looping and conditionals are collectively known as control flow in JS

// 'For' loop

const names = ['Mi', 'Le', 'Bo'];

for (let i = names.length - 1; i >= 0; i--) {
  console.log(names[i]);
}

const bill = (products, tax) => {
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total += products[i] + products[i] * tax;
  }

  return total;
};

const result = bill([30, 15, 10], 0.2);

console.log(`Your bill is $${result}.`);

// Optional 'for' expressions

// All three expressions ([initialization]; [condition]; [final-expression]) in the head of the 'for' loop are optional

for (let i = 0; ; i++) {
  console.log(i);

  if (i >= 3) break;
}

let i = 0;

for (;;) {
  console.log(i);

  if (i >= 3) break;
  i++;
}

// Nested loops

console.log('Loop start');

for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i, j);
  }
  console.log('End of iteration', i);
}

console.log('Loop finish');
console.log('Loop start');

for (let i = 1; i <= 3; i++) {
  for (let j = i; j <= 3; j++) {
    console.log(i, j);
  }
  console.log('End of iteration', i);
}

console.log('Loop finish');
console.log('Loop start');

for (let i = 1; i <= 3; i++) {
  for (let j = i; j > 0; j--) {
    console.log(i, j);
  }
  console.log('End of iteration', i);
}

console.log('Loop finish');

// 'While' loop

i = 0;

while (i < names.length) {
  console.log(names[i]);
  i++;
}

i = 3;

while (i) {
  console.log(i--);
}

// 'Do-while' loop

// 'Do-while' loop is an extension of 'while' loop. It lets us perform a code at least once regardless of whether the value of the iterator complies or not with the condition

i = 82;

do {
  console.log('The value of i is', i);
  i++;
} while (i < 5);

// Conditional statements

// 'if-else' statement

const password = 'p@ss123987pss';

if (password.length >= 12 && password.includes('@')) {
  console.log('This password is mighty strong');
} else if (
  password.length >= 8 ||
  (password.includes('@') && password.length > 5)
) {
  console.log('This password is strong enough');
} else {
  console.log('This password is not strong enough');
}

let time = new Date().getHours();

if (time <= 7 || time >= 23) {
  console.log('Time to sleep');
} else if (time > 7 && time <= 8) {
  console.log('Coffee time');
} else if (time > 9 && time < 15) {
  console.log('Coding time');
} else if (time > 19 && time < 21) {
  console.log('Time to go for a walk');
} else {
  console.log('Time to do miscellaneous stuff');
}

// Modulus

const day = 25;

if (day % 2 === 0) {
  console.log(`${day} is an even day of the month.`);
} else {
  console.log(`${day} is an odd day of the month.`);
}

// Ternary operator

const evenOrOdd = day % 2 ? 'odd' : 'even';

console.log(evenOrOdd);

// Chained ternary operator

const activity =
  time < 7 || time > 23
    ? 'Sleep'
    : time > 10 && time < 19
    ? 'Be active'
    : 'Relax';

console.log(activity);

// Switch statement

// Switch statements use strict equality to check

switch (activity) {
  case 'Be active':
    console.log('Be active');
    break;
  case 'Relax':
    console.log('Relax');
    break;
  default:
    console.log('Sleep');
}

const flat = 62;

if (flat === 62) {
  console.log('Mila and Leo live here');
} else if (flat === 65) {
  console.log('Bogdan lives there');
} else if (flat > 0 && flat <= 108) {
  console.log('Neighbors live there');
} else {
  console.log(`There is no flat No. ${flat} in this condo`);
}

const whoLivesHere =
  flat === 62
    ? 'Mila & Leo live here'
    : flat === 65
    ? 'Bogdan lives here'
    : 'We do not live there';

console.log(whoLivesHere);

switch (flat) {
  case 62:
    console.log('It is our home');
    break;
  case 65:
    console.log('It is a home of Bogdan');
    break;
  default:
    console.log('Bogdan, Leo and Mila do not live there');
}

if (typeof flat === 'number') {
  console.log(`Flat No. ${flat}`);
} else {
  console.error('Datatype error');
}

// Setting methods to prototypes

String.prototype.giveLeoMeat = () => `Just give Leo meat!`;

const gang = ['Bo', 'Mi', 'Leo', 'Art'];

// Keywords 'break' and 'continue'

for (let i = 0; i < gang.length; i++) {
  if (gang[i] === 'Art') {
    continue;
  }

  if (gang[i] === 'Leo') {
    console.log(`Leo King is here! ${gang[i].giveLeoMeat()}`);
    break;
  }
}

const scores = [50, 25, 0, 30, 100, 20, 10];

for (let i = 0; i < scores.length; i++) {
  if (scores[i] === 0) {
    continue;
  }

  console.log('Your score is:', scores[i]);

  if (scores[i] === 100) {
    console.log('Congrats, you got the top score!');
    break;
  }
}

// Block level scope with variables

// Scope means the area in which a variable value is accessible.

// If we define a variable using let or const in the root of the document, meaning not inside any code block, that will have global scope and can be accessed anywhere in the file, including block area.

// We are allowed to redefine a global variable inside a (nested) code block, but not in the root of the document

let age = 37;

console.log(`The age is ${age} outside code block`);

if (age) {
  let age = 38;

  console.log(`The age is ${age} inside code block`);

  if (age) {
    let age = 39;

    console.log(`The age is ${age} inside 1st nested code block`);
  }

  if (age) {
    // Variable lookup

    console.log(`The age is ${age} inside 2nd nested code block`);
  }
}

// Primitive vs Reference Types

// A primitive type has a fixed size in memory. For example, a number occupies eight bytes of memory, and a boolean value can be represented with only one bit. The number type is the largest of the primitive types. If each JavaScript variable reserves eight bytes of memory, the variable can directly hold any primitive value.

// If a primitive type is assigned to a variable, we can think of that variable as containing the value. When we assign these variables to other variables using =, the JavaScript engine creates a copy of that value and assigns it to a new variable. They are copied by value. On the stack memory, they are separate variables. If you change the value of one variable, it won't affect the other.

// Reference types are another matter, however. Objects, for example, can be of any length - they do not have a fixed size. The same is true of arrays: an array can have any number of elements. Similarly, a function can contain any amount of JavaScript code. Since these types do not have a fixed size, their values cannot be stored directly in the eight bytes of memory associated with each variable. Instead, the variable stores a reference to the value. Typically, this reference is some form of pointer or memory address that points to the object's location in memory.

// When we make a copy of a reference type, we only make a copy of the pointer - we don't make a copy of the actual data, so both variables refer to the same object on the heap memory, and if we later change value of the copy, it does have an effect on value of the original and vice versa. Objects are copied by reference instead of by value

let scoreOne = 50;
let scoreTwo = scoreOne;

console.log(`Score 1 is ${scoreOne} and score 2 is ${scoreTwo}.`);

scoreOne = 100;

console.log(`Score 1 is ${scoreOne} and score 2 is ${scoreTwo}.`);

scoreTwo = scoreOne;

console.log(`Score 1 is ${scoreOne} and score 2 is ${scoreTwo}.`);

const userOne = { name: 'Shaun', score: 50 };
const userTwo = userOne;

console.log(userOne, userTwo);

userOne.score = 100;

console.log(userOne, userTwo);

userTwo.name = 'Ryu';

console.log(userOne, userTwo);

// Template strings with HTML templates

// A good use case for template strings is to create HTML templates, so say, for example, we have some dynamic content that we got back from a database, and we want to create an HTML template with that content embedded inside it, then output it to the browser somewhere

const title =
  'Enlightenment Now: The Case for Reason, Science, Humanism, and Progress';
const author = 'Steven Pinker';
const yearOfPublication = '2018';
const likesPercentage = '91%';

const html = `
    <h2>${title}</h2>
    <p>by ${author}, published in ${yearOfPublication}</p>
    <span>liked by ${likesPercentage} of Google users.</span>
`;

console.log(html);

// String methods

const email = 'mi.podgurska@gmail.com';
const editedEmail = email.replace('mi.podgurska', 'milochka.ziablik');

console.log(email[0]);
console.log(email.charAt(0));
console.log(email.startsWith('mi'));
console.log(email.endsWith('org'));
console.log(email.padStart(email.length + 5, '*'));
console.log(email.padEnd(email.length + 5, '*'));
console.log(email.includes('@'));
console.log(email.search('@'));
console.log(email.indexOf('@'));
console.log(editedEmail.slice(0, 8));
console.log(editedEmail.slice(-9));

const line = `I don't love you like I did yesterday`;

console.log(line.indexOf('I'));
console.log(line.indexOf('I', 1));
console.log(line.lastIndexOf('I'));
console.log(line.split(' you '));
console.log(line.split(' '));
console.log(line.split(' ', 4));
console.log(line.replace('I did yesterday', 'you do'));

// DOM

// Querying and manipulating DOM elements

document.querySelector('.hidden').classList.remove('hidden');

const ul = document.querySelector('.awesome-creatures');

const awesomeCreatures = [...gang];

awesomeCreatures.forEach(creature => {
  let li = document.createElement('li');
  li.innerHTML = creature;
  li.style.fontWeight = 'bold';
  li.style.fontStyle = 'italic';
  li.classList.toggle('spacing');
  let upperCase = li.innerText.toUpperCase();
  li.innerText = upperCase;
  ul.appendChild(li);
});

const heading = document.querySelector('h1');

heading.style.margin = '5rem 0';
heading.style.color = 'limegreen';
heading.classList.toggle('spacing', true);

const span = document.createElement('span');

span.textContent = heading.textContent.slice(0, 5);
heading.textContent = ``;
heading.append(span, `, Pussycats!`);

// Setting/removing attributes

span.setAttribute('title', 'Hey!');
span.removeAttribute('title');
span.title = 'Yo, gang!';
span.id = 'greeting';

// Manipulating custom data attributes

span.dataset.longGreeting = span.title;
span.dataset.longGreeting = 'Hello there!';
console.log(span.dataset);
console.log(span.dataset.longGreeting);

const content = document.querySelector('.content');

content.innerHTML = `<h2>The End</h2>`;

const additionalContent = document.querySelector('.content > h2');

additionalContent.textContent += `, My Gorgeous Friends!`;

const copyright = document.createElement('p');

copyright.innerHTML = `Copyright &copy; mil&ugrave; 2020`;
copyright.style.textAlign = 'center';
document.body.append(copyright);
document.body.style.marginBottom = '3rem';

// Window object

// Every JavaScript environment has a global object. In a browser environment the global object is the window object, which represents the browser window that contains a web page and all its corresponding features. A window object is created automatically by the browser itself

console.log(window);

// Any variables that are created without using the const, let or var keywords in the global scope are actually properties of this object, and any functions, such as parseInt() or isNaN(), are methods of it

// The Browser Object Model

// BOM is the core of JavaScript on the web. It refers to all the objects exposed by the web browser that allow JavaScript to interact with it.

// BOM is a collection of properties and methods related to the information about the browser and screen. For example, we can find out which browser is being used to view a page. We can also find out the dimensions of the screen it is viewed on, and which pages have been visited before the current page. It can also be used for the rather dubious practice of creating pop-up windows, if you’re into annoying your users

// Navigator object

// The window object has a navigator property that returns a reference to the Navigator object. The Navigator object contains information about the browser being used. Its userAgent property will return information about the browser and operating system being used (though, this method is unreliable).

// As well as other window objects, it can be written with or without the window prefix

console.log(window.navigator);
console.log(navigator.userAgent);
console.log(navigator.geolocation);
console.log(navigator.connection);
console.log(navigator.language);
console.log(navigator.getBattery()); // => Promise
navigator.getBattery().then(battery => console.log(battery));

// Location object

// The window.location property points to the object that contains information about the URL of the current page. It contains a number of properties that provide information about different fragments of the URL

console.log(window.location);
console.log(window.location.href);
console.log(window.location.origin);
console.log(location.protocol);
console.log(location.hostname);
console.log(location.port);
console.log(location.pathname);

// History object

// The window.history property can be used to access information about any previously visited pages in the current browser session

console.log(window.history);

// To navigate to a URL in the history, you can use the back(), forward(), and go() methods

// The history.length returns the number of URLs in the history stack

console.log(history.length);

// Screen object

// It contains the information about the user's screen

console.log(screen.width);
console.log(screen.height);

// Screen width and height, excluding the operating system menus
console.log(screen.availWidth);
console.log(screen.availHeight);

// Usually, 24 bit or 32 bit hardware is used for color resolution.

// 24 bits = 16, 777, 216 different (True Colors)
// 32 bits = 4, 294, 967, 296 different (Deep Colors)

console.log(screen.colorDepth);
console.log(screen.pixelDepth);
