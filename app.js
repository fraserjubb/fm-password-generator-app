/* 
********************************
DOM SELECTORS:
********************************
*/
const password = document.querySelector('.password-generator__display-text');
const generateBtn = document.querySelector('.password-generator__generate-button');
const passwordLengthValueEl = document.querySelector('.password-generator__length-value');
const passwordLengthSlider = document.querySelector('#password-length');

const uppercaseCheckbox = document.querySelector('#uppercase');
const lowercaseCheckbox = document.querySelector('#lowercase');
const numbersCheckbox = document.querySelector('#numbers');
const symbolsCheckbox = document.querySelector('#symbols');

const strengthLocation = document.querySelector('.password-generator__strength-bars');

const strengthText = document.querySelector('.password-generator__strength-text');

const strengthBarArray = Array.from(document.querySelectorAll('.password-generator__strength-bar'));

const clipboardBtn = document.querySelector('.password-generator__display-clipboard');

const copyMessage = document.querySelector('.copy-message');

const helperText = document.querySelector('.password-generator__helper');

let hasTriedGeneration = false;
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

let selectedCharacterLength;

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
  return Math.floor(Math.random() * array.length);
}

function getPasswordStrength(enabledGroups, characterLength) {
  let strengthLevel;

  if (enabledGroups.length === 0) return;

  if (characterLength <= 7) {
    strengthLevel = 1;
    strengthText.textContent = 'Too Weak';
  } else if (characterLength >= 16) {
    strengthLevel = 4;
    strengthText.textContent = 'Strong';
  } else if (characterLength >= 12) {
    strengthLevel = 3;
    strengthText.textContent = 'Medium';
  } else {
    strengthLevel = 2; // 8–11 character length
    strengthText.textContent = 'Weak';
  }

  const passwordStrength = Math.min(strengthLevel, 4);

  for (let i = 0; i <= passwordStrength - 1; i++) {
    strengthBarArray[i].classList.add('password-generator__strength-bar--active');
  }

  strengthText.classList.remove('hidden');
}

function clearUI() {
  strengthBarArray.forEach(bar => bar.classList.remove('password-generator__strength-bar--active'));
}

function getEnabledCharacterGroups() {
  characterGroups.includeUppercase.enabled = uppercaseCheckbox.checked;
  characterGroups.includeLowercase.enabled = lowercaseCheckbox.checked;
  characterGroups.includeNumbers.enabled = numbersCheckbox.checked;
  characterGroups.includeSymbols.enabled = symbolsCheckbox.checked;

  // Find character groups that are enabled:
  const enabledCharacterGroups = Object.values(characterGroups)
    .filter(param => param.enabled)
    .map(param => param.chars.split(''));
  return enabledCharacterGroups;
}

function getPassword(requestedLength) {
  const passwordPool = [];
  const enabledCharacterGroups = getEnabledCharacterGroups();

  clearUI();

  getPasswordStrength(enabledCharacterGroups, selectedCharacterLength);

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
  password.style.color = 'var(--clr-grey-200)';
  return generatedPassword;
}

// COPY PASSWORD
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showCopiedMessage());
}

function showCopiedMessage() {
  copyMessage.classList.add('is-visible');
  setTimeout(() => copyMessage.classList.remove('is-visible'), 2000);
}

function updateGenerateButtonState() {
  const requestedLength = Number(passwordLengthSlider.value);
  const anyCharacterGroup = hasEnabledCharacterGroups();
  const enabledCharacterGroups = getEnabledCharacterGroups();

  generateBtn.disabled = !anyCharacterGroup || requestedLength === 0 || enabledCharacterGroups.length > requestedLength;

  if (hasTriedGeneration) {
    if (!anyCharacterGroup) {
      helperText.textContent = 'Select at least one character type';
    } else if (enabledCharacterGroups && enabledCharacterGroups.length > requestedLength) {
      helperText.textContent = 'Length less than selected types';
    } else if (requestedLength === 0) {
      helperText.textContent = 'Password length must be at least 1';
    } else {
      helperText.textContent = ''; // clear message if all is valid
    }
  }
}
function hasEnabledCharacterGroups() {
  return uppercaseCheckbox.checked || lowercaseCheckbox.checked || numbersCheckbox.checked || symbolsCheckbox.checked;
}

/*
********************************
EVENT LISTENERS:
********************************
*/
passwordLengthSlider.addEventListener('input', event => {
  passwordLengthValueEl.textContent = event.target.value;
  updateGenerateButtonState();
});

[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
  checkbox.addEventListener('change', updateGenerateButtonState);
});

generateBtn.addEventListener('click', () => {
  selectedCharacterLength = Number(passwordLengthValueEl.textContent);
  hasTriedGeneration = true;
  getPassword(selectedCharacterLength);
});

clipboardBtn.addEventListener('click', () => {
  if (password.textContent === 'P4$5W0rD!') return;
  copyText(password.textContent);
});

updateGenerateButtonState();
