// - Generate a password based on the selected inclusion options
// - See a strength rating for their generated password

/* 
********************************
DOM SELECTORS:
********************************
*/
const password = document.querySelector('.password__text');
const generateBtn = document.querySelector('.password-generator__button');
const passwordLengthValueEl = document.querySelector('.password-generator__length-value');
const passwordLengthSlider = document.querySelector('#password-length');
/* 
********************************
GLOBAL VARIABLES / OBJECTS:
********************************
*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const characterGroups = {
  includeUppercase: { enabled: true, chars: alphabet.toUpperCase() },
  includeLowercase: { enabled: true, chars: alphabet },
  includeNumbers: { enabled: true, chars: '0123456789' },
  includeSymbols: { enabled: true, chars: '!@#$%^&*()-_+=.?|,' },
};

let passwordLength;

passwordLengthValueEl.textContent = passwordLengthSlider.value;
/* 
********************************
FUNCTIONS:
********************************
*/
// Shuffle using Fisher–Yates algorithm:
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomChar = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomChar]] = [array[randomChar], array[i]];
  }
}

function getRandomIndex(array) {
  // console.log(Math.floor(Math.random() * array.length));
  return Math.floor(Math.random() * array.length);
}

function getPassword(requestedLength) {
  const passwordPool = [];

  // Find character groups that are enabled:
  const enabledCharacterGroups = Object.values(characterGroups)
    .filter(param => param.enabled)
    .map(param => param.chars.split(''));

  console.log(enabledCharacterGroups.length);
  // Prevent a password being generated if no character groups are enabled:
  if (enabledCharacterGroups.length === 0) {
    throw new Error('No character groups have been selected for character generation.');
  }

  // Prevent a password being generated if the requested length is too short:
  if (enabledCharacterGroups.length > requestedLength) {
    throw new Error('The requested password length is shorter than the enabled character groups.');
  }

  // Get at least one character from each selected character group:
  for (let i = 0; i < enabledCharacterGroups.length; i++) {
    const selectedCharacter = enabledCharacterGroups[i][getRandomIndex(enabledCharacterGroups[i])];
    passwordPool.push(selectedCharacter);
  }

  // Get the remaining characters:
  const remainingLength = requestedLength - enabledCharacterGroups.length;
  for (let i = 0; i < remainingLength; i++) {
    const chosenArray = enabledCharacterGroups[getRandomIndex(enabledCharacterGroups)];
    const randomCharacter = chosenArray[getRandomIndex(chosenArray)];
    passwordPool.push(randomCharacter);
  }

  // Final password:
  shuffle(passwordPool);
  const generatedPassword = passwordPool.join('');
  password.textContent = generatedPassword;
  return generatedPassword;
}

/*
********************************
EVENT LISTENERS:
********************************
*/
passwordLengthSlider.addEventListener('input', event => {
  passwordLengthValueEl.textContent = event.target.value;
});

generateBtn.addEventListener('click', () => {
  passwordLength = Number(passwordLengthValueEl.textContent);
  getPassword(passwordLength);
});

// characterGroups.includeNumbers.enabled = false;
// console.log('again');
// characterGroups.includeSymbols.enabled = false;
// getPassword(100);
