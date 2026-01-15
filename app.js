/* 
********************************
DOM SELECTORS:
********************************
*/
const password = document.querySelector('.password__text');
const generateBtn = document.querySelector('.password-generator__button');
const passwordLengthValueEl = document.querySelector('.password-generator__length-value');
const passwordLengthSlider = document.querySelector('#password-length');

const uppercaseCheckbox = document.querySelector('#uppercase');
const lowercaseCheckbox = document.querySelector('#lowercase');
const numbersCheckbox = document.querySelector('#numbers');
const symbolsCheckbox = document.querySelector('#symbols');
// uppercaseCheckbox.checked = true;
// console.log(uppercaseCheckbox.checked);

// const fieldSet = document.querySelector('.password-generator__checkbox-group');
// console.log(Array(fieldSet));
/* 
********************************
GLOBAL VARIABLES / OBJECTS:
********************************
*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const characterGroups = {
  includeUppercase: { enabled: false, chars: alphabet.toUpperCase() },
  includeLowercase: { enabled: false, chars: alphabet },
  includeNumbers: { enabled: false, chars: '0123456789' },
  includeSymbols: { enabled: false, chars: '!@#$%^&*()-_+=.?|,' },
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

  characterGroups.includeUppercase.enabled = uppercaseCheckbox.checked;
  characterGroups.includeLowercase.enabled = lowercaseCheckbox.checked;
  characterGroups.includeNumbers.enabled = numbersCheckbox.checked;
  characterGroups.includeSymbols.enabled = symbolsCheckbox.checked;

  // Find character groups that are enabled:
  const enabledCharacterGroups = Object.values(characterGroups)
    .filter(param => param.enabled)
    .map(param => param.chars.split(''));

  let passwordStrength;
  if (enabledCharacterGroups.length === 0) {
    console.log('Password has no groups enable');
  } else {
    passwordStrength = enabledCharacterGroups.length;
    // console.log(passwordStrength);
    // return passwordStrength;
  }
  // console.log(passwordStrength);
  // const passwordStrength = enabledCharacterGroups.length;
  for (let i = 1; i <= passwordStrength; i++) {
    console.log(`Password strength rating: ${i}`);
  }
  // switch (passwordStrength) {
  //   case 1:
  //     console.log('Strength of 1');
  //     break;

  //   case 2:
  //     console.log('Strength of 2');
  //     break;

  //   case 3:
  //     console.log('Strength of 3');
  //     break;

  //   case 4:
  //     console.log('Strength of 4');
  //     break;

  //   default:
  //     console.log('Strength of 0');
  // }

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
