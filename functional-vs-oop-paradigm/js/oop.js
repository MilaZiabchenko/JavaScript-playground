// Object-oriented programming

// In OOP we usually change state directly, and all data is wrapped up inside objects as member variables. The only way we can access this data is using an object's methods. In OOP functions are wrapped up inside objects along with the data that they operate on, and these functions allow us to access or make changes to that data. In order to operate on given data we use 'this' keyword

class Employee {
  constructor(name, salary) {
    (this._name = name), (this._salary = salary);
  }

  raiseSalary(raise) {
    return (this._salary += raise);
  }

  changeEmployee(newName) {
    this._name = newName;
  }
}

const employee = new Employee('Mila', 0);

console.log(employee);

employee.raiseSalary(2500);

console.log(employee);

employee.changeEmployee('Bogdan');
employee.raiseSalary(300);

console.log(employee);

// The main reason, why it's useful to keep data and functions together in the same object in OOP is that this allows us to interact with the member variables of an object without touching them directly. Programmers have access to the variables only through functions, and this way they can keep the variables up to date.

// In OOP data and functions defined within the same class are tightly coupled. In other words, the functions inside the given class usually reference the data that they operate on directly. You can't remove a given function from the class it's in and still make it work on its own.

class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._initials = `${firstName.charAt(0)}.${lastName.charAt(0)}.`;
  }

  setFirstName(newName) {
    this._firstName = newName;
    this._initials = `${this._firstName.charAt(0)}.${this._lastName.charAt(
      0
    )}.`;
  }
}

const person = new Person('Mila', 'Ziablick');

console.log(person);

person.setFirstName('Leo');

console.log(person);

class Gang {
  constructor(members) {
    this._members = members;
  }

  get listOfMembers() {
    return this._members.join(', ');
  }

  addMembers(newMembers) {
    this._members = this._members.concat(newMembers);
  }
}

const members = new Gang(['Mila Ziablick', 'Leo Ziablick']);

members.addMembers('Bogdan Starr');
members.addMembers(['cute turtle', 'little spider']);

console.log(members);

const gang = members.listOfMembers;

console.log(gang);

class Book {
  constructor(title, author, ISBN, numCopies) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.numCopies = numCopies;
  }

  get availability() {
    return this.getAvailability();
  }

  getAvailability() {
    if (this.numCopies === 0) return 'Out of stock';
    if (this.numCopies < 10) return 'Low stock';

    return 'In stock';
  }

  sell(numCopiesSold = 1) {
    return (this.numCopies -= numCopiesSold);
  }

  restock(numCopiesStocked = 5) {
    return (this.numCopies += numCopiesStocked);
  }
}

const HungerGames = new Book('Hunger Games', 'Suzanne Collins', 123919, 5);

console.log(HungerGames.availability);

HungerGames.restock(12);

console.log(HungerGames.availability);

HungerGames.sell(17);

console.log(HungerGames.availability);

class Student {
  constructor(name, gpa) {
    this.name = name;
    this.gpa = gpa;
  }

  changeGPA(amount) {
    return (this.gpa += amount);
  }
}

const students = [
  new Student('Phil Ellsworth', 3.25),
  new Student('Cassidy Williams', 3.75),
  new Student('Joe Randy', 2.5),
];

for (let i = 0; i < students.length; i++) {
  students[i].changeGPA(1.25);
}

console.log(students);
