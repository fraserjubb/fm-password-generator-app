// - Generate a password based on the selected inclusion options
// - See a strength rating for their generated password

/* 
********************************
DOM SELECTORS:
********************************
*/

/* 
********************************
GLOBAL VARIABLES:
********************************
*/

/* 
********************************
FUNCTIONS:
********************************
*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const passwordParameters = {
  includeUppercase: { enabled: true, chars: alphabet.toUpperCase() },
  includeLowercase: { enabled: true, chars: alphabet },
  includeNumbers: { enabled: true, chars: '0123456789' },
  includeSymbols: { enabled: true, chars: `!@#$%^&*()-_+={}[]|\\:;"',.?/~` },
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomChar = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomChar]] = [array[randomChar], array[i]];
  }
}

function getActiveParams() {
  const activeParams = Object.fromEntries(Object.entries(passwordParameters).filter(([_, { enabled }]) => enabled));

  return activeParams;
}

function getPassword(length) {
  const activeParameters = getActiveParams();

  const activeChars = Object.values(activeParameters)
    .filter(param => param.enabled)
    .map(param => param.chars)
    .join('')
    .split('');

  shuffle(activeChars);

  const generatedPassword = activeChars.slice(0, length).join('');
  // console.log(generatedPassword);
  return generatedPassword;
}

/*
********************************
EVENT LISTENERS:
********************************
*/
// console.log(getPassword(4));
getPassword(25);
