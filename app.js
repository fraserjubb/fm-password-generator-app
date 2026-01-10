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

const characterGroups = {
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

// function getActiveParams() {
//   const activeParams = Object.fromEntries(Object.entries(passwordParameters).filter(([_, { enabled }]) => enabled));

//   return activeParams;
// }

function selectRandom(array) {
  // console.log(Math.floor(Math.random() * array.length));
  return Math.floor(Math.random() * array.length);
}

function getPassword(requestedLength) {
  const preShuffleArr = [];

  console.log(requestedLength);
  const enabledCharacterGroups = Object.values(characterGroups)
    .filter(param => param.enabled)
    .map(param => param.chars.split(''));
  // .join('')
  // .split('');
  // console.log(activeChars.length);
  if (enabledCharacterGroups.length > requestedLength) {
    throw new Error('The requested password length is shorter than the enabled character groups.');
  }
  // console.log(selectRandom(activeChars[0]));
  // Get at least one of each selected Parameter
  for (let i = 0; i < enabledCharacterGroups.length; i++) {
    const selectedCharacter = enabledCharacterGroups[i][selectRandom(enabledCharacterGroups[i])];
    // console.log(selectedCharacter);
    preShuffleArr.push(selectedCharacter);
  }
  // console.log(preShuffleArr.length);
  // console.log(activeChars.length);
  const remainingLength = requestedLength - enabledCharacterGroups.length;
  // console.log(selectRandom(activeChars));
  // console.log(activeChars[selectRandom(activeChars)]);
  // console.log(activeChars.length);
  for (let i = 0; i < remainingLength; i++) {
    // console.log(activeChars[selectRandom(activeChars)]);
    const chosenArray = enabledCharacterGroups[selectRandom(enabledCharacterGroups)];
    const randomCharacter = chosenArray[selectRandom(chosenArray)];
    preShuffleArr.push(randomCharacter);
    // console.log(i);
    // console.log(selectRandom(activeChars[i]));
  }
  preShuffleArr.join('');
  console.log(preShuffleArr);

  // const selectRandom = Math.floor(Math.random() * activeChars.length);
  // console.log(selectRandom);
  // console.log(activeChars[selectRandom]);

  // shuffle(activeChars);

  // const generatedPassword = activeChars.slice(0, length).join('');
  // console.log(generatedPassword);

  shuffle(preShuffleArr);
  console.log(preShuffleArr);
  // return generatedPassword;
}

/*
********************************
EVENT LISTENERS:
********************************
*/
// console.log(getPassword(4));
// getPassword(2);
getPassword(5);

// selectRandom([2, 4, 5]);
// passwordParameters.includeNumbers.enabled = false;
// console.log('again');
// passwordParameters.includeSymbols.enabled = false;
// getPassword(25);
