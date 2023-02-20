// Built-in objects

// Math object

console.log(Math);

// Math object methods

const random = Math.random();

console.log(random);
console.log(Math.round(random * 10));
console.log(Math.ceil(random * 100));
console.log(Math.floor(random * 100));
console.log(Math.trunc(random * 100));

const shape = {
  radius: 10,

  get diameter() {
    return this.radius * 2;
  },

  get perimeter() {
    return (Math.PI * this.radius * 2).toFixed(2);
  }
};

console.log(
  `This shape diameter is ${shape.diameter}, \nThis shape perimeter is ${shape.perimeter}.`
);

console.log(Math.max(1980, 2017));

// We can't call Math.max() or Math.min() method with an array because it expects a list of numeric arguments. Spread syntax to the rescue! When used in the function call, it 'expands' an iterable array object into the list of arguments

const array_1 = [1277, 5, 2020, 33];
const array_2 = [3, 3000, -33, -1750];
const mergedArray = [7, ...array_1, -17, ...array_2];

console.log(Math.max(...array_1, 333));
console.log(Math.min(-1753, ...mergedArray));

// Date object

const currentDate = new Date();

console.log(currentDate);
console.log(Object.getPrototypeOf(currentDate));

// Methods defined on Date.prototype

console.log(currentDate.getTime());
console.log(currentDate.toLocaleTimeString());
console.log(currentDate.toTimeString());
console.log(currentDate.toUTCString());

const randomDate = new Date(289765388228);

console.log(randomDate);

const pastDate = new Date();

pastDate.setFullYear(1770);
pastDate.setMonth(11);
pastDate.setDate(17);

console.log(pastDate);

const birthday = new Date(1977, 6, 3, 19, 30, 37, 555);

console.log(birthday);
console.log(birthday.getFullYear());
console.log(birthday.getMonth() + 1);
console.log(birthday.getDate());
console.log(birthday.getDay());
console.log(birthday.getHours());
console.log(birthday.getTime());
console.log(birthday.getMilliseconds());

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

console.log(`Today is ${weekDays[currentDate.getDay()]}.`);

// Creating objects with constructors

// Primitive data types wrapped in objects

// Primitive types in JS are not objects, but still they can actually behave like objects, because JS can wrap them in an object temporarily, when we need to, and it does this silently in the background. And this way we can call properties and methods on primitive types

// String constructor

const myString = new String('33 dolphins make love');

console.log(myString, typeof myString); // string wrapped in the object

// Array constructor

const myArray = new Array('🐳🐋🐬', 'have', 'fun', 'with', '🐢🐢🐢');

console.log(myArray);

// Three ways of creating an object:

// 1. with Object Constructor Function
const object_1 = new Object({ mushrooms: '🍄🍄🍄' });

// 2. with Object.create() static method
const object_2 = Object.create(object_1, {
  mushrooms: {
    value: '🍄🍄🍄',
    configurable: true,
    enumerable: true,
    writable: true
  }
});

// 3. with object initializer/literal syntax
const object_3 = { mushrooms: '🍄🍄🍄' };

console.log({ object_1, object_2, object_3 });

// Comparing objects

// When the equality operators are used on objects, they check the reference. If it points to the same object, the comparison will result in true. If they're distinct objects in memory, even if they contain identical properties, the comparison will result in false

console.log(object_1 === object_2);
console.log(object_2 === object_3);
console.log(object_3 === { mushrooms: '🍄🍄🍄' });
console.log({ mushrooms: '🍄🍄🍄' } === { mushrooms: '🍄🍄🍄' });
console.log({} === {});

const human = {
  firstName: 'Bogdan',
  lastName: 'Starynets',
  dateOfBirth: '09/28/1982',
  gender: 'male',
  special: true,
  interests: ['music', 'sculpture', 'walking in the forest'],
  // Embedded object
  address: {
    number: '52/65',
    street: 'Kyivska',
    city: 'Vinnytsia'
  },

  logName() {
    return this.firstName;
  },

  logInterests() {
    this.interests.forEach(hobby =>
      console.log(`${this.firstName} likes ${hobby}.`)
    );
  }
};

function surprise(drink) {
  return `${this.firstName} surprised me with his delicious ${drink}:)`;
}

// Copying object

// Copying a value in JavaScript is almost always shallow, as opposed to deep. That means that changes to deeply nested values will be visible in the copy as well as the original.

// Shallow object copy:

// 1. with Object.assign()
const human_1 = Object.assign({}, human);

// 2. with spread operator
const human_2 = { ...human };

// The expression {...human} iterates over the (enumerable) properties of 'human' using the spread operator. It uses the property name and value, and assigns them one by one to a freshly created, empty object. As such, the resulting object is identical in shape, but with its own copy of the list of properties and values. The values are copied, too, but so-called primitive values are handled differently than non-primitive values.

// Non-primitive values are handled as references, meaning that the act of copying the value is really just copying a reference to the same underlying object, resulting in the shallow copy behavior

// Deep object copy

// A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying values) as those of the source object from which the copy was made. As a result, when you change either the source or the copy, you can be assured you're not causing the other object to change too; that is, you won't unintentionally be causing changes to the source or copy that you don't expect. That behavior contrasts with the behavior of a shallow copy, in which changes to the source or the copy cause the other object to change (because the two objects share the same references)

const human_3 = JSON.parse(JSON.stringify(human));

console.log(human);
console.log(human_1);
console.log(human_2);
console.log(human_3);

console.log(human.logName());
console.log(human.logName.call({ firstName: 'Bo' }));

human.logInterests();

console.log(surprise.call(human, 'uzvar'));

// Accessing object properties

// All properties, enumerable or not, string or symbol, own or inherited, can be accessed with dot notation or bracket notation

console.log(human.dateOfBirth);
console.log(human_1['dateOfBirth']);
console.log(human_2.interests[1]);
console.log(human_3.address.city);

// Setting/updating object members:

// 1. using dot notation
human.family = {
  sister: 'Diana',
  nephew: 'Artemiy'
};

human.interests = [...human.interests, 'riding a bicycle', 'playing with Leo'];

console.log(human.interests);
console.log(human_1.interests);
console.log(human_2.interests);
console.log(human_3.interests);

// 2. using bracket notation
human['hair'] = 'long curly';

console.log(Object.hasOwn(human, 'hair'));
console.log(Object.hasOwn(human_1, 'hair'));
console.log(Object.hasOwn(human_2, 'hair'));
console.log(Object.hasOwn(human_3, 'hair'));

// 3. using Object.defineProperty()
Object.defineProperty(human, 'eyes', { value: 'dark', enumerable: true });

console.log(Object.hasOwn(human, 'eyes'));
console.log(Object.hasOwn(human_1, 'eyes'));
console.log(Object.hasOwn(human_2, 'eyes'));
console.log(Object.hasOwn(human_3, 'eyes'));

human['address'] = { ...human['address'], country: 'Ukraine' };

console.log(human['address']['country']);
console.log(human['address']);
console.log(human_1['address']);
console.log(human_2['address']);
console.log(human_3['address']);

// Accessing/updating dynamic properties

let property = 'dateOfBirth';

console.log(human[property]); // dateOfBirth value

property = 'special';

console.log(human[property]); // special value
console.log(human['special']); // special value

// Deleting object members

delete human.gender;

console.log(Object.hasOwn(human, 'gender'));
console.log(Object.hasOwn(human_1, 'gender'));
console.log(Object.hasOwn(human_2, 'gender'));
console.log(Object.hasOwn(human_3, 'gender'));

let getSelectedInfo = person => ({
  name: person.firstName,
  lastName: person.lastName,
  city: person.address.city
});

console.log(getSelectedInfo(human));

// Destructuring

// The destructuring assignment syntax is a JS expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables

const {
  firstName,
  address: { city, country },
  special
} = human;

console.log(country === human.address.country);

// Destructuring with function parameters

getSelectedInfo = ({ firstName, lastName, address: { city } }) =>
  `${firstName} ${lastName} lives in ${city}`;

console.log(getSelectedInfo(human));

// Destructuring with rest parameters

const getRegroupedInfo = ({ firstName, lastName, ...otherInfo }) => ({
  primaryInfo: `${firstName} ${lastName}`,
  secondaryInfo: Object.entries(otherInfo).map(([key, value]) => ({
    [key]: value
  }))
});

console.log(getRegroupedInfo(human));

const updatedHuman = Object.assign(human, { kind: true });

console.log(updatedHuman === human);
console.log(Object.hasOwn(human, 'kind'));
console.log(Object.hasOwn(human_1, 'kind'));
console.log(Object.hasOwn(human_2, 'kind'));
console.log(Object.hasOwn(human_3, 'kind'));

Object.seal(human);
human.interests[1] = 'drinking coffee with me';
delete human.interests;

console.log(human_1.interests);
console.log(human_2.interests);
console.log(human_3.interests);
console.log(human.interests);
console.log(updatedHuman.interests);

// Renaming variables with destructuring

const me = { shortName: 'Mi' };
const { shortName } = me;
const { shortName: nickName } = me;

console.log(me);
console.log(shortName);
console.log(nickName);

// Initializing variables with destructuring

const { passions, activities } = {
  passions: [
    'being in company with Leo and Bo',
    'cooking and eating delicious food',
    'coding and creating awesome apps',
    'learning computer, cognitive, and other sciences'
  ],
  activities: [
    'biking',
    'running',
    'walking',
    'dancing',
    'swimming',
    'traveling'
  ]
};

console.log(passions);
console.log(activities);

// Merging objects

const updatedMe = { shortName: 'Milù' };

const technologies = {
  language: 'JavaScript',
  library: 'React'
};

const languages = ['English', 'Italian', 'Spanish', 'Ukrainian', 'Russian'];

const creativeCoder = {
  ...me,
  ...updatedMe,
  city,
  passions, // reference to the original is preserved
  activities: [...activities], // reference is changed
  techStack: { ...technologies },
  languages: [...languages],
  isSpecial: special
};

console.log(creativeCoder);
console.log(passions === creativeCoder.passions);
console.log(activities === creativeCoder.activities);

// Deep object destructuring

const getRegroupedObject = obj => {
  const {
    details: { university } = university,
    details: { faculty } = faculty,
    name: firstName
  } = obj;
  const student = { faculty, firstName };

  return { university, student };
};

const originalObject = {
  name: 'Rose',
  details: {
    faculty: 'Science and Engineering',
    university: 'Sorbonne'
  }
};

const clonedObject = { ...originalObject };

// Adding or changing a property directly on the shallow copy will only affect the copy, not the original, and vice versa

clonedObject.city = 'Paris';
originalObject.surname = 'Dean';

// However, adding or changing a deeply nested property affects both the shallow copy and the original, even if they were 'freezed'

Object.freeze(originalObject);
Object.freeze(clonedObject);
originalObject.details.faculty = 'Engineering';
clonedObject.details.university = 'Berkeley';

console.log(originalObject);
console.log(clonedObject);
console.log(getRegroupedObject(originalObject));
console.log(getRegroupedObject(clonedObject));

const musician = {
  name: 'Nils Oliver Frahm',
  born: 'September 20, 1982',
  location: 'Berlin',
  site: 'https://www.nilsfrahm.com',
  latestAlbums: [
    {
      title: 'Old Friends New Friends',
      year: 2021
    },
    {
      title: 'Tripping with Nils Frahm',
      year: 2020
    },
    {
      title: 'All Melody',
      year: 2018
    }
  ],

  // logAlbums: function() {
  logAlbums() {
    console.log(this.latestAlbums.map(album => album.title));
    console.log('This musician has recently created the following albums:');
    this.latestAlbums.forEach(album =>
      console.log(`'${album.title}' released in ${album.year}.`)
    );
  },

  logName() {
    return this.name;
  }
};

Object.defineProperty(musician, 'genres', {
  value: ['contemporary classical', 'ambient', 'electronic']
});

console.log(Object.getOwnPropertyNames(musician));

console.log(Object.hasOwn(musician, 'genres'));
console.log('genres' in musician);

// Copying object with its methods (shallow copy)

const musicianShallowCopyOneWithMethods = Object.assign({}, musician);
const musicianShallowCopyTwoWithMethods = { ...musician };

// Copying object without its methods (deep copy)

const musicianDeepCopyWithoutMethods = JSON.parse(JSON.stringify(musician));

console.log(musician);
console.log(musicianShallowCopyOneWithMethods);
console.log(musicianShallowCopyTwoWithMethods);
console.log(musicianDeepCopyWithoutMethods);

const keys = [];
const values = [];

for (const key in musician) {
  keys.push(key);
  values.push(musician[key]);
}

console.log(keys);
console.log(Object.keys(musician));

console.log(values);
console.log(Object.values(musician));

console.log(Object.entries(musician));
console.log(Object.entries(musician).length);

console.log(Object.fromEntries(Object.entries(musician)));

musician.logAlbums();

console.log(musician.logName());
console.log(musician.name.replace(' Oliver', ''));
console.log(musician.logName.call({ name: 'Oliver' }));

const getMoreInfo = ({ name, site }) =>
  `If you want to know more about ${name}, visit ${site}`;

console.log(getMoreInfo(musician));

const humans = [].concat(human, creativeCoder, musician);

console.log(humans);

// Strong reference

let keyboardist = { firstName, pro: false };
const bandMember = { ...keyboardist, memberSince: 2022 }; // keyboardist shallow copy, reference is changed

bandMember.pro = true;

console.log(keyboardist);
console.log(bandMember);

keyboardist = null; //removing the reference to the original object

// We can't access the object via the 'keyboardist' variable anymore, but there is a strong reference between the 'bandMember' object and the 'keyboardist' object. The original object is kept in memory because the strong reference prevents removing the object from memory via garbage collection

console.log(keyboardist);
console.log(bandMember);

const updateInfo = member => ({
  ...member,
  location: city,
  dateOfBirth: human.dateOfBirth
});

const updatedBandMember = updateInfo(bandMember);

console.log(updatedBandMember);

const isEmpty = obj => Object.entries(obj).length === 0;

const schedule = {};

console.log(isEmpty(schedule));

// Dynamic object keys (computed properties)

const time = ['morning_', 'night_'];

schedule[time[0] + '7:30'] = 'Get up, greet Leo, and have a cup of coffee :)';
schedule[time[0] + '9:00'] = 'Go for a walk :)';
schedule[time[1] + '22:30'] = 'Sleep well!';

console.log(isEmpty(schedule));
console.log(schedule);

// Nested objects

const object = {
  littleFriends: {
    Wendy: {
      says: `I am here :)`
    },
    Tim: {
      says: `Can you see me?`
    },
    Peter: 'Has not come yet...',
    Danny: {
      actions: ['comes last', 'sighs', 'says'],
      says: 'I wanna be seen as well...',
      plays: true
    }
  }
};

console.log(object.littleFriends.Wendy.says);
console.log(object.littleFriends.Tim.says);

// JSON.stringify() with a replacer

console.log(
  JSON.stringify(object.littleFriends.Danny, ['actions', 'plays'], 2)
);
console.log(
  JSON.stringify(
    object.littleFriends.Danny,
    object.littleFriends.Danny.actions.filter(action => action === 'says'),
    2
  )
);

// Nested object access patterns

// 1. Logical && operator

const nestedInfo_1 =
  object &&
  object.littleFriends &&
  object.littleFriends.Danny &&
  object.littleFriends.Danny.actions;

console.log(nestedInfo_1);

// 2. Helper object

// With this notation, you’ll never run into Cannot read property '...' of undefined. You basically check if object exists, if not, you create an empty object on the fly. This way, the next level key will always be accessed from an object that exists or an empty object, but never from undefined

const nestedInfo_2 = (((object || {}).littleFriends || {}).Danny || {}).says;

console.log(nestedInfo_2);

// 3. Optional chaining

// The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

// The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined

const nestedInfo_3 = object?.littleFriends?.Danny?.actions;

console.log(nestedInfo_3);

const nestedInfo_4 = object?.littleFriends?.Danny?.says;

console.log(nestedInfo_4);

// Getting deep object properties

const getDeepProperty_1 = (obj, path) => {
  const parts = path.split('.');
  const key = parts.shift();

  if (typeof obj[key] === 'undefined') {
    return `Property '${key}' is not defined!`;
  }

  return parts.length > 0
    ? getDeepProperty_1(obj[key], parts.join('.'))
    : obj[key];
};

const getDeepProperty_2 = (obj, path) => {
  const parts = path.split('.');
  let prop = { ...obj };

  for (let i = 0; i < parts.length; i++) {
    if (typeof prop[parts[i]] === 'undefined') {
      return `Property '${parts[i]}' is not defined!`;
    }

    if (prop[parts[i]]) {
      prop = prop[parts[i]];
    }
  }

  return prop;
};

const getDeepProperty_3 = (obj, path) => {
  const parts = path.split('.');
  let prop = { ...obj };

  for (const part of parts) {
    if (typeof prop[part] === 'undefined') {
      return `Property '${part}' is not defined!`;
    }

    if (prop[part]) {
      prop = prop[part];
    }
  }

  return prop;
};

const getDeepProperty_4 = (obj, path) =>
  path.split('.').reduce((o, p) => (o && o[p] ? o[p] : undefined), obj);

const getDeepProperty_5 = (obj, path) =>
  path.split('.').reduce((o, p) => o?.[p], obj);

const path_1 = 'bestFriends.Wendy.says';
const path_2 = 'littleFriends.Wendy.said';
const path_3 = 'littleFriends.Wendy.says';
const path_4 = 'littleFriends.Tim.says';
const path_5 = 'littleFriends.Danny.actions';
const path_6 = 'littleFriends.Danny.says';

console.log(getDeepProperty_1(object, path_1));
console.log(getDeepProperty_1(object, path_2));
console.log(getDeepProperty_1(object, path_3));
console.log(getDeepProperty_2(object, path_1));
console.log(getDeepProperty_2(object, path_2));
console.log(getDeepProperty_3(object, path_3));
console.log(getDeepProperty_3(object, path_4));
console.log(getDeepProperty_4(object, path_1));
console.log(getDeepProperty_4(object, path_5));
console.log(getDeepProperty_5(object, path_2));
console.log(getDeepProperty_5(object, path_6));

// Copying objects with deeply nested properties

const objectShallowCopy_1 = { ...object };
const objectShallowCopy_2 = Object.assign({}, object);

const objectDeepCopy_1 = JSON.parse(JSON.stringify(object));
const objectDeepCopy_2 = structuredClone(object);

// Changing deeply nested properties affects shallow copies, but doesn't affect deep copies

object.littleFriends.Peter = 'On his way...';

console.log(objectShallowCopy_1.littleFriends.Peter);
console.log(objectShallowCopy_2.littleFriends.Peter);
console.log(objectDeepCopy_1.littleFriends.Peter);
console.log(objectDeepCopy_2.littleFriends.Peter);

// Changing direct properties does't affect neither shallow nor deep copies

object.littleFriends = '4 little friends';

console.log(objectShallowCopy_1);
console.log(objectDeepCopy_1);
console.log(object);

// Similar to a shallow copy, a deep copy algorithm copies an object's properties one by one, but invokes itself recursively when it finds a reference to another object, creating a copy of that object as well. This can be very important to make sure that two pieces of code don't accidentally share an object and unknowingly manipulate each others' state

const createDeepCopy = input => {
  if (typeof input !== 'object' || input === null) {
    return input;
  }

  const copy = Array.isArray(input) ? [] : {};

  for (const key in input) {
    const value = input[key];

    copy[key] = createDeepCopy(value);
  }

  return copy;
};

const objectDeepCopy = createDeepCopy(object);

objectDeepCopy.littleFriends = '4 best friends';

console.log(objectDeepCopy);
console.log(object);

console.log(createDeepCopy(['5', 5]));
console.log(createDeepCopy('5555'));
console.log(createDeepCopy(5555));
console.log(createDeepCopy(true));
console.log(createDeepCopy(null));
console.log(createDeepCopy());
