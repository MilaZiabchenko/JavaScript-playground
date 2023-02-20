// Prototype model

// JavaScript is a prototype-based language, meaning objects inherit properties and methods from other objects. Prototypes are the mechanism by which JavaScript objects inherit features from one another

// Extending object prototype

// Extending object prototypes in JavaScript allows us to add custom methods or properties to the built-in JavaScript objects like Object, Array, or String. We can achieve this by calling the prototype property on the object we want to extend and attaching our own property or method implementation

Object.prototype.logInfo = function () {
  return `This info can be logged for every object in this prototype chain.`;
};

Object.prototype.getShortName = function () {
  return this.firstName.slice(0, 2);
};

// It's generally safer to avoid modifying built-in JavaScript objects, as adding or modifying properties and methods on built-in prototypes or objects can lead to global scope pollution; naming conflicts and bugs, especially when using multiple libraries or codebases; compatibility issues, when dealing with third-party libraries or different JavaScript environments. It also violates encapsulation principle because this way we modify the object's internal state directly

// Constructor Function

function Person(firstName, lastName, dob) {
  // setting Person properties
  this.firstName = firstName;
  this.lastName = lastName;
  this.dob = new Date(dob);
}

// setting Person methods
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.getBirthYear = function () {
  return this.dob.getFullYear();
};

// We define a method on the prototype because we don't want to create a new instance of it each time we create a new object. This could lead to major issues for performance

// When a method is defined on a constructor's prototype property, all objects created using that constructor get that method via their prototype

console.log(Person.prototype);

// Prototypal Inheritance, aka Prototypal Delegation

// Prototypes contain all methods and these methods are accessible to all objects linked to this prototype. This is called Prototypal Inheritance (or Prototypal Delegation)

// There are three main ways to implement Prototypal Inheritance in JavaScript:

// 1. using Constructor Functions
// 2. using Object.create()
// 3. using ES6 Classes

// Accessing properties of a parent Constructor Function

// with call()
function Director(firstName, lastName, dob, movies) {
  Person.call(this, firstName, lastName, dob);
  this.movies = movies;
}

// with apply()
function Author(...args) {
  Person.apply(this, args);
}

// Setting a prototype and accessing methods

// Setting the prototype of a constructor, we can ensure that all objects created with that constructor are given that prototype

Director.prototype.constructor = Director;

console.log(Director.prototype);

// Creating an object of prototypes

const AuthorPrototype = {
  ...Person.prototype,

  getBioInfo() {
    return `${this.getFullName()} was born in ${this.getBirthYear()}.`;
  },

  getShorterName() {
    return `${this.getShortName()} ${this.lastName}`;
  },

  getBookInfo(title, publicationDate) {
    const bookAge =
      new Date().getFullYear() - new Date(publicationDate).getFullYear();

    return `${this.getShorterName()} wrote a memoir called ${title}. It was published ${bookAge} years ago on ${publicationDate}.`;
  }
};

// Object.create()

// The Object.create() method creates a new object and allows you to specify an object that will be used as the new object's prototype

Author.prototype = Object.create(AuthorPrototype);
Author.prototype.constructor = Author;

console.log(Author.prototype);

// Classes

// OOP principles

class Personality {
  // Encapsulation principle

  // The literal meaning of encapsulation is to enclose a mixture of something inside a capsule. It means that we are packing all data and functions that operate on that data into a class or an object, and then control access to it

  // Abstraction principle

  // The hole idea behind encapsulation is that we hide the implementation of a class and only expose what is needed for the user of the class, which is closely related to abstraction principle. We can use public and private properties/methods to decide what gets exposed and what doesn't

  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
  }

  get fullName() {
    return this.getFullName();
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getBirthYear() {
    return this.dob.getFullYear();
  }
}

// Inheritance principle

// Inheritance enables you to define a class/object that takes all the functionality from a parent class/object and allows you to add more. Using class inheritance, a class/object can inherit all the methods and properties of another class. It is a useful feature that allows code reusability

class Cat extends Personality {
  // If we don't need to do any special initialization, we can omit the constructor, and a default constructor will be generated

  say() {
    return `${this.firstName} says meow...`;
  }
}

class MyDearCat extends Cat {
  // Field declaration

  color; // public property
  _breed; // protected property
  #temperament; // private property

  constructor(firstName, lastName, dob, color, breed, temperament) {
    // We must call super constructor in derived class before accessing 'this' or returning from derived constructor

    // Since the super() operator is actually the parent class constructor, passing here its arguments will also initialize the parent class properties in our subclass

    super(firstName, lastName, dob); // inherited properties

    // assigning values to own properties
    this.color = color;
    this._breed = breed;
    this.#temperament = temperament;
  }

  get description() {
    return `My dear friend ${this.firstName} is a beautiful ${this._breed} ${
      this.color
    } cat. He's by nature ${this.#temperament}.`;
  }
}

class Programmer extends Personality {
  constructor(firstName, lastName, dob, language) {
    super(firstName, lastName, dob);
    this.language = language;
  }

  getLanguage() {
    return `${this.getFullName()} is specialized in ${this.language}.`;
  }

  validateLanguage() {
    if (this.language !== 'JavaScript' && this.language !== 'Rust') {
      return `Sorry, ${this.firstName}, we are not hiring ${this.language} programmers at the moment.`;
    }

    return `Welcome, ${this.getShortName()}! Let's create some cool stuff with ${
      this.language
    }!`;
  }

  // class static method
  static countCoders() {
    console.log(
      `Actually there is just one creative self-educating coder here, who's having fun and trying not to overwhelm herself.`
    );
  }
}

// Polymorphism principle

// Polymorphism means 'many forms', and in OOP it's the ability of one method to return different values according to certain conditions and even overwrite a method inherited from a parent class

class Vehicle {
  constructor(type, wheels) {
    this.type = type;
    this.wheels = wheels;
  }

  get description() {
    return this.describeYourself();
  }

  describeYourself() {
    return `I'm a ${this.type} with ${this.wheels} wheels.`;
  }
}

class SemiTruck extends Vehicle {
  constructor() {
    super('semi truck', 18);
  }
}

class BradleyFightingVehicle extends Vehicle {
  constructor() {
    super('armoured fighting vehicle', 12);
  }

  describeYourself() {
    return 'I am a tracked armoured fighting vehicle named after U.S. General Omar Bradley';
  }
}

const groceryStoreSemi = new SemiTruck();

console.log(groceryStoreSemi);
console.log(groceryStoreSemi.description);

const bradleyFightingVehicle = new BradleyFightingVehicle();

console.log(bradleyFightingVehicle);
console.log(bradleyFightingVehicle.description);

// The 'new' keyword does 3 things essentially:

// 1. creates a new empty object {}

// 2. binds the context of 'this' inside the class to be equal to that new empty object, and we have access to that empty object via 'this' keyword

// 3. calls the constructor function inside the class specified right after the 'new' keyword, and then we can pass values into the constructor method by using arguments and attach new properties to a new object by using 'this' keyword

const turtleMan = new Person('Bogdan', 'Starynets', '9-28-1982');
const director = new Director(
  'Martin',
  'Scorsese',
  '',
  'The Last Temptation Of Christ, Gangs Of New York, Silence, The Irishman'
);
const superHuman = new Author('Edward', 'Snowden', '6-21-1983');
const mySuperCat = new MyDearCat(
  'Leo',
  'Ziablick',
  '4-3-2017',
  'brownish tabby',
  'Scottish Fold',
  'affectionate, playful, placid and intelligent'
);
const catWoman = new Programmer('Mila', 'Ziablick', '7-3-2017', 'JavaScript');
const matrixBoy = new Programmer('Neo', 'Nerdy', '9-3-1999', 'Golang');

delete director.dob;

console.log(turtleMan);
console.log(director);
console.log(superHuman);
console.log(mySuperCat);
console.log(catWoman);
console.log(matrixBoy);

console.log(Object.logInfo());

console.log(
  `${matrixBoy.getFullName()} is pretty good at ${matrixBoy.language}.`
);
console.log(matrixBoy.validateLanguage());

console.log(catWoman.fullName);
console.log(catWoman.getLanguage());
console.log(catWoman.validateLanguage());

console.log(Object.getOwnPropertyNames(catWoman));
console.log(Object.hasOwn(catWoman, 'language'));
console.log(Object.hasOwn(catWoman, 'getLanguage'));
console.log('getLanguage' in catWoman);

console.log(typeof catWoman);
console.log(typeof Programmer);
console.log(typeof Object);

// Static methods are not attached to any individual object, but instead are invoked on the class itself

Programmer.countCoders();

console.log(
  `${catWoman.getFullName()} enjoys learning ${
    catWoman.language
  }. She creates miscellaneous stuff with ${
    catWoman.language
  } and other web technologies.`
);

console.log(mySuperCat.fullName);
console.log(
  `${mySuperCat.getFullName()} was born in spring of ${mySuperCat.getBirthYear()}. ${
    mySuperCat.firstName
  } has brought huge joy and immense happiness to ${
    catWoman.firstName
  }'s home and life.`
);
console.log(mySuperCat.description);
console.log(Object.getOwnPropertyNames(mySuperCat));

// Prototype chain

// Every object in JavaScript has a built-in prototype property. The prototype is itself an object that has its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype

// Object.prototype

// Almost all objects in JavaScript ultimately inherit from Object.prototype

console.log(Object.prototype);

// Object.getPrototypeOf()

// Object.getPrototypeOf() static method returns the prototype of the specified object

console.log(Object.getPrototypeOf(mySuperCat));
console.log(Object.getPrototypeOf(mySuperCat) === MyDearCat.prototype);

let object = mySuperCat;

do {
  object = Object.getPrototypeOf(object);

  console.log(object);
} while (object);

// Under the hood, classes still use prototypes. They're just a way to make it easier to set up a prototype chain

// The prototype chain's behavior is less like inheritance and more like delegation. Delegation is a programming pattern where an object, when asked to perform a task, can perform the task itself or ask another object (its delegate) to perform the task on its behalf. In many ways, delegation is a more flexible way of combining objects than inheritance (for one thing, it's possible to change or completely replace the delegate at run time)

// instanceof

// The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object

console.log(Personality instanceof Object);
console.log(mySuperCat instanceof Object);
console.log(mySuperCat instanceof Personality);
console.log(mySuperCat instanceof MyDearCat);

// When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property. If the property still can't be found, then the prototype's prototype is searched, and so on until either the property is found, or the end of the chain is reached, in which case undefined is returned

console.log(mySuperCat.meow);
console.log(mySuperCat.say);
console.log(mySuperCat.say());
console.log('say' in mySuperCat);
console.log(Object.hasOwn(mySuperCat, 'say'));
console.log(Object.hasOwn(mySuperCat, 'firstName'));
console.log(Object.hasOwn(turtleMan, 'dob'));
console.log(turtleMan.dob.toLocaleDateString());
console.log(turtleMan.getBirthYear());
console.log(
  `${turtleMan.getFullName()} has been dark and grumpy recently. Hopefully ${turtleMan.getShortName()} ${turtleMan.lastName.slice(
    0,
    4
  )} will feel well soon.`
);
console.log(superHuman.getBioInfo());
console.log(superHuman.getBookInfo('Permanent Record', '9-17-2019'));

// Getters and setters (accessor properties)

// Accessor properties are essentially functions that execute on getting and setting a value, but look like regular properties to an external code

const attendance = {
  _list: [],

  set addName(name) {
    this._list.push(name);
  },

  get list() {
    return this._list.join(', ');
  }
};

// accessor properties
attendance.addName = 'Leo';
attendance.addName = 'Mi';
attendance.addName = 'Bo';

console.log(attendance.list); // accessor property
console.log(attendance._list); // data property

class Student {
  constructor(name, gpa) {
    this._name = name;
    this._gpa = gpa;
  }

  set changeGpa(amount) {
    this._gpa += amount;
  }

  get gpa() {
    return this._gpa;
  }

  get name() {
    return this._name;
  }
}

const student = new Student('Alex', 4.8);

console.log(student);

student.changeGpa = 0.2;

console.log(`The gpa of ${student.name} has been updated to ${student.gpa}.`);

class Hike {
  constructor(distance, pace) {
    (this.distance = distance), (this.pace = pace);
  }

  get lengthInHours() {
    return this.calcTime();
  }

  calcTime() {
    return this.distance / this.pace;
  }
}

const mtTallac = new Hike(10, 2);

console.log(`The hike to mt Tallac took ${mtTallac.lengthInHours} hours.`);

const basics = [
  'HTML5/CSS3/SASS/UI/UX',
  'JS-Core/Func&OOP/DOM/BOM',
  'Ajax/HTTP/Fetch/Axios/JSON',
  'DevTools/CLI/Bash/Git/GitHub',
  'NPM/Yarn/Parcel/Netlify/Vercel'
];

const medium = [
  ...basics,
  'React.js/Hooks/Context/Routing/Redux-Toolkit',
  'Styled-Components/Material-UI/Tailwind',
  'Node.js/Express.js/MongoDB/Firebase',
  'Jest/Testing-Library/Storybook',
  'React-Query/GraphQL/Apollo',
  'Design Patterns',
  'TypeScript',
  'Vite'
];

const advanced = [
  ...medium,
  'Algorithms/Data Structures',
  'SSR/Next.js/SolidJS/Qwik',
  'PostgreSQL/AWS/Docker',
  'Python/Django/Go/Rust',
  'Tauri/Flutter',
  'CI/CD'
];

const frontEndDeveloper = [
  `Can create responsive layouts`,
  `Can create CSS animations and effects`,
  `Can add dynamic page functionality and work with the DOM`,
  `Understands HTTP and can connect to 3rd party APIs`,
  `Can setup a productive development environment`,
  `Can use your browser's dev tools`,
  `Can utilize Git with GitHub`,
  `Can deploy and maintain small projects`,
  `Can build small client side apps with JS`,
  `Can build websites for individuals and small businesses`
];

const frontEndWizard = [
  ...frontEndDeveloper,
  `Can build advanced apps and interfaces with a frontend framework`,
  `Can manage application, working with component and global state`,
  `Can interact with back-end APIs and data`,
  `Can write clean and efficient code and test it`,
  `Can write more robust code with TypeScript`
];

const frontEndMaestro = [
  ...frontEndWizard,
  `Fluent in a server-side language(s) and/or framework(s)`,
  `Can build full-stack apps, work with databases, ODM(ORM), and deploy to production(SSH, Git, Cloud)`,
  `Can design architecture from scratch and implement design patterns effectively`,
  `Can build complex applications and scale them with business logic and performance in mind`
];

class SoftwareEngineer {
  // Field declaration with initializer

  #basicSalaryMultiplier = 1;

  constructor(name, tech, skills, basicSalaryMultiplier) {
    this.name = name;
    this.tech = tech;
    this.skills = skills;
    this.#basicSalaryMultiplier = basicSalaryMultiplier;
    this.basicSalary = 1500;
  }

  getTech() {
    console.log(`${this.name}'s tech stack is: \n\n${this.tech}`);
  }

  getSkills() {
    console.log(`${this.name} has the following skills: \n\n${this.skills}`);
  }

  #calcSalary() {
    return this.#basicSalaryMultiplier * this.basicSalary;
  }

  get salary() {
    return `${this.name}'s salary is ${this.#calcSalary()} per month.`;
  }
}

const engineer_1 = new SoftwareEngineer('Miriam', basics, frontEndDeveloper, 1);
const engineer_2 = new SoftwareEngineer('Andrea', medium, frontEndWizard, 3);
const engineer_3 = new SoftwareEngineer('Yuri', advanced, frontEndMaestro, 6);

console.log(engineer_1);
console.log(engineer_2);
console.log(engineer_3);

engineer_1.getTech();
engineer_1.getSkills();
console.log(engineer_1.salary);
engineer_2.getTech();
engineer_2.getSkills();
console.log(engineer_2.salary);
engineer_3.getTech();
engineer_3.getSkills();
console.log(engineer_3.salary);

class Meal {
  // definition => parameters
  constructor(time, first, second, third) {
    this.time = time;
    this.first = first;
    this.second = second;
    this.third = third;
    this.fourth = null;

    // It is a good practice to keep all properties inside the constructor, so we can see everything in one place. If at some point in the program a Meal is gonna have an fourth property, we should put that property to begin with. If we don't know the value of it, we could just set it to null or zero to begin with, then update it later on
  }
}

// instantiation (invocation) => arguments
const breakfast = new Meal('7am', 'coffee', 'milk', 'biscuits');
const lunch = new Meal('11am', 'compote', 'chocolate', null);
const dinner = new Meal(
  '3pm',
  'salad',
  'oatmeal with veggies',
  'chicken with zucchini'
);

dinner.fourth = 'watermelon';

console.log(breakfast);
console.log(lunch);
console.log(dinner);

// array of object instances
const meals = [
  new Meal('8am', 'coffee', 'milk', 'pancakes'),
  new Meal('1pm', 'cottage cheese', 'sour cream', 'jam'),
  new Meal('6pm', 'veggies', 'eggs', 'grapefruit')
];

meals[0].fourth = 'tangerine';
meals[1].fourth = 'banana';

console.log(meals);
console.log(meals[0]);
console.log(meals[1]);

// Creating a prototype

const proto = {
  name: ''
};

console.log(proto);

// The newly created object will inherit all the prototype object's properties. We can specify a second parameter to add new properties to the object, that the prototype lacked

const person = Object.create(proto, {
  country: { value: 'Ukraine', enumerable: true },
  city: { value: 'Vinnytsia', enumerable: true }
});

person.name = 'Mila';

console.log(person);

// Object.seal()

person.name = 'Leo';

Object.seal(person);

delete person.name;

console.log(person);
console.log(person.name);

person.name = 'Bogdan';
person.surname = 'OldMan';

console.log(person);
console.log(person.name);
console.log(person.surname);

// Object.freeze()

Object.freeze(person);

person.name = 'Mi';

console.log(person);
console.log(person.name);

// Creating a blueprint

const UserDataBlueprint = {
  name: '',
  surname: '',
  password: ''
};

const UserDataValidationBlueprint = {
  validate() {
    return this._name.length >= 2 && this._password.length >= 8;
  },

  __proto__: UserDataBlueprint
};

console.info(UserDataValidationBlueprint);

const ProtectedUser = function (name = '', password = '') {
  this._name = name;
  this._surname = 'Ziablick';
  this._fullName = `${name} ${this._surname}`;
  this._password = password;
};

// Setting a prototype with the blueprint

ProtectedUser.prototype = UserDataValidationBlueprint;

const specialUser = new ProtectedUser('Leo', '87654321');

console.info(specialUser);
console.info(specialUser.validate());
console.info(specialUser.__proto__);
console.info(Object.getPrototypeOf(specialUser));
console.info(Object.hasOwn(specialUser, '_password'));

// Protected vs private fields

class AdminUser extends ProtectedUser {
  _workingHours = 0;
  #level = 0;

  set workingHours(hours) {
    if (hours < 0) hours = 0;
    this._workingHours = hours;
  }

  get workingHours() {
    return this._workingHours;
  }

  static checkForPrivateLevel(obj) {
    return #level in obj;
  }

  // Constructor with default params

  constructor(name = '', password = '', workingHours = 0, level = 0) {
    super(name, password);

    // Protected fields are inheritable

    this._workingHours = workingHours;

    // Private field from the base class is private to it and is not accessible from the derived subclass

    this.#level = level;
  }

  validate() {
    return this._name === 'Mila' && this._password.length >= this.#level * 2;
  }
}

const adminUser = new AdminUser('Mila', '9753579753', 8, 5);

console.info(adminUser);
console.info(adminUser.validate());
console.log('name' in specialUser);
console.log('#level' in adminUser);
console.log(AdminUser.checkForPrivateLevel(adminUser));

class Vampire {
  constructor(props) {
    this.name = props.name;
    this.location = props.location;
    this.birthDate = props.birthDate;
    this.deathDate = props.deathDate;
    this.weaknesses = props.weaknesses;
  }

  // The regular functions are the usual way to define methods on classes

  calcAge() {
    return this.deathDate - this.birthDate;
  }

  logAge() {
    console.log(this.calcAge());
  }

  // In contrast with regular functions, the method defined using an arrow binds 'this' lexically to the class instance

  logWeaknesses = () => console.log(this.weaknesses);
  getName = () => Promise.resolve(this.name);
}

const Dracula = new Vampire({
  name: 'Vlad',
  location: 'Transylvania',
  birthDate: 1428,
  deathDate: 1476,
  weaknesses: ['sunlight', 'garlic']
});

console.log(Dracula);

// When we use a method of a class defined with a regular func as a callback, we bind 'this' value manually

setTimeout(Dracula.logAge.bind(Dracula), 1000);

// We use a method of a class defined with an arrow func as a callback without any manual binding of 'this'

setTimeout(() => Dracula.logWeaknesses(), 2000);

Dracula.getName().then(console.log);
