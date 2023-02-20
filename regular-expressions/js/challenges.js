const isValidIdentifier = input => {
  const re = /^[\D][a-z]+_?\$?\d?$/i;

  return input.match(re) ? true : false;
};

console.log(isValidIdentifier('BBC_3'));

const capitalize = testStr =>
  testStr
    .split(/[\s*]/)
    .map(testStr => testStr.charAt(0).toUpperCase() + testStr.slice(1))
    .join(' ');

console.log(capitalize('Simon & co.'));

const isValidAudioFile = input => {
  const re = /^([a-z]+)\.(mp3|flac|alac|aac)$/i;

  return input.match(re) ? true : false;
};

console.log(isValidAudioFile('song.mp3'));
console.log(isValidAudioFile('video.mp4'));

const getHexadecimalColors = testStr => {
  const re = /#([a-f0-9]{3}){1,2}\b/gi;
  const arr = testStr.split(/[\s*]/);
  const found = [];

  for (let el of arr) {
    if (el.match(re)) {
      found.push(el);
    }
  }

  return found;
};

console.log(
  getHexadecimalColors('#111 hsl(120, 100%, 52%) #6b6b6b rgb(10, 10, 10) #cde')
);

const isValidPassword = input => {
  let re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[0-9a-zA-Z]{8,}$/;
  re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

  return input.match(re) ? true : false;
};

console.log(isValidPassword('Mi5678'));
console.log(isValidPassword('Mi12345678'));
console.log(isValidPassword('mi12345678'));

const addThousandsSeparator = input =>
  input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

console.log(addThousandsSeparator(333333333));
console.log(addThousandsSeparator(3333333333));

const getAllUrlsFromText = text => {
  const re = /[a-z]\./;
  const arr = text.split(/[\s*]/);
  const arrURLs = [];
  for (let el of arr) {
    if (el.match(re)) {
      arrURLs.push(el);
    }
  }

  return arrURLs.length ? arrURLs.join(',\n') : 'No Urls found in the text.';
};

const text1 =
  'We use https://translate.google.com/ to translate some words and phrases from https://doka.guide/ ';
const text2 =
  'JavaScript is a peculiar and beautiful language! Learn it on https://eloquentjavascript.net/';
const text3 = 'JavaScript is a peculiar and beautiful language!';

console.log(getAllUrlsFromText(text1));
console.log(getAllUrlsFromText(text2));
console.log(getAllUrlsFromText(text3));
