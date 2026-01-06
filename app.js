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
const passwordParameters = {
  includeUppercase: { enabled: false, chars: 'ABCD' },
  includeLowercase: { enabled: true, chars: 'abcdefghijklmnopqrstuvwxyz' },
  includeNumbers: { enabled: true, chars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  includeSymbols: { enabled: true, chars: '@$' },
};
console.log(passwordParameters);
console.log(passwordParameters);
console.log(passwordParameters[Object.keys(passwordParameters)]);
console.log(passwordParameters.includeUppercase[1]);

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
// console.log(alphabet);
const fullNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

parameterKeys = Array.from(Object.keys(passwordParameters));
const activeParameters = parameterKeys.filter(key => passwordParameters[key] === true);

function getActiveParams() {
  const activeParams = Object.fromEntries(Object.entries(passwordParameters).filter(([_, { enabled }]) => enabled));
  // console.log(activeParams);
  return activeParams;
}

function selectRandomCharacters(getActiveParams, length) {
  console.log('I am here');
  const activeParameters1 = getActiveParams();
  console.log(activeParameters1.includeNumbers.chars);
  console.log(length);

  const activeChars = Object.values(passwordParameters)
    .filter(param => param.enabled)
    .map(param => param.chars)
    .join('');
  console.log(activeChars);
  /* 
  Try assigning nums here and removing the parameter/argument...
  


  NEED TO MAKE IT 
  SO THAT PASSOWORD OPTION BECOMES
  THE STRING OR ARRAY WE NEED TO TAKE FROM -- ALPHABET & NUMBERS
  
  NEED TO MAKE ACTIVEPARAMETS AN OBJECT INSTEAD OF AN ARRAY?



  */
  const total = length;
  // console.log(total);
  const num1 = Math.floor(Math.random() * (total - 1)) + 1;

  const num2 = total - num1;
  // console.log(num1);
  // console.log(num2);
  const nums = {
    num1,
    num2,
  };
  // console.log(nums);

  const newArray = [];
  // console.log(activeParameters.length);
  for (let i = 1; i < activeParameters.length; i++) {
    // console.log(i);
    for (let j = 0; j < nums[`num${i}`]; j++) {
      let answer = passwordOption[Math.floor(Math.random() * passwordOption.length)];
      // console.log(answer);
      newArray.push(answer);
    }
  }

  // for (let i = 0; i < number; i++) {
  //   let answer = passwordOption[Math.floor(Math.random() * passwordOption.length)];
  //   newArray.push(answer);
  // }

  return newArray;
}

function generatePassword(length, options) {
  const total = length;
  // console.log(total);
  const num1 = Math.floor(Math.random() * (total - 1)) + 1;
  const num2 = total - num1;

  let selectedUppercaseLetters;
  let selectedNumbers;
  // console.log(alphabet);
  if (options.includeUppercase === true) {
    const selectLetters = selectRandomCharacters(alphabet, length);
    selectedUppercaseLetters = selectLetters.map(letter => letter.toUpperCase());
  }

  if (options.includeNumbers === true) {
    selectedNumbers = selectRandomCharacters(fullNumbers, length);
  }

  const allSelected = selectedUppercaseLetters.concat(selectedNumbers);

  let finalSelection = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allSelected.length);
    const value = allSelected[randomIndex];
    allSelected.splice(randomIndex, 1);
    finalSelection.push(value);
  }

  console.log(finalSelection);
}

/*
********************************
EVENT LISTENERS:
********************************
*/
// generatePassword(6, passwordParameters);
// selectRandomCharacters(activeParameters, 4);
selectRandomCharacters(getActiveParams, 4);

// passwordParameters.includeUppercase.enabled = true;
// selectRandomCharacters(getActiveParams, 4);

// generatePassword(69, activeParameters);

// console.log((Math.random() * 10).toString(36));
// ('abcdefghijklmnopqrstuvwxyz0123456789');

// console.log(Math.floor(Math.random() * 10) + 1);
