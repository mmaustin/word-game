

const guessedLetters = document.querySelector('.guessed-letters');
const button = document.querySelector('.guess');
const inputLetter = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuesses = document.querySelector('.remaining');
const span = document.querySelector('span');
const message = document.querySelector('.message');
const hiddenButton = document.querySelector('.play-again hide');

let word = "magnolia";
const lettersGuessed = [];
let guessesRemaining = 8;

const getWord = async function () {
  const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await res.text();
  const wordArray = data.split("\n");
  const wordIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[wordIndex].trim();
  updateWordProgress(word);
};
getWord();


const updateWordProgress = function (word) {
  const updatedWord = word.split('').map(l => { return '●' });
  wordInProgress.innerText = updatedWord.join('');
};

button.addEventListener('click', function (e) {
  e.preventDefault();
  const inputLetterValue = inputLetter.value;
  message.innerText = '';
  const inputCheckResult = inputCheck(inputLetterValue);
  if (inputCheckResult) {
    makeGuess(inputLetterValue);
  };
  inputLetter.value = '';

});

const inputCheck = function (input) {
  const acceptLeter = /[a-zA-Z]/;
  if (!input) {
    message.innerText = 'Please enter a value.';
  } else if (input.length > 1) {
    message.innerText = 'Please only enter one letter.';
  } else if (input.match(acceptLeter) === null) {
    message.innerText = 'Enter a letter from A to Z.';
  } else {
    return input;
  };
};

const makeGuess = function (letter) {
  const letterToUpper = letter.toUpperCase();
  if (lettersGuessed.includes(letterToUpper)) {
    message.innerText = "You've already guessed this letter.";
  } else {
    lettersGuessed.push(letterToUpper);
    lettersGuessedDisplay();
    wordProgress(lettersGuessed);
    playerGuess(letterToUpper);
  };
};

const lettersGuessedDisplay = function () {
  guessedLetters.innerHTML = '';
  lettersGuessed.forEach(l => {
    let listItem = document.createElement('li');
    listItem.innerText = l;
    guessedLetters.append(listItem);
  });
};

const wordProgress = function (lettersArray) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split('');
  const updatedCharacters = [];
  for (let l of wordArray) {
    if (lettersArray.includes(l)) {
      updatedCharacters.push(l.toUpperCase());
    } else {
      updatedCharacters.push('●');
    }
  }
  wordInProgress.innerText = updatedCharacters.join('');
  checkVictory(wordInProgress);
};

const playerGuess = function (guess) {
  const uppercaseWord = word.toUpperCase();
  if (uppercaseWord.includes(guess)) {
    message.innerText = `Your guess is correct.`;
  } else {
    message.innerText = `You guessed wrong.`;
    guessesRemaining--;
  };

  if (guessesRemaining === 0) {
    remainingGuesses.innerText = `You are out of guesses. The word is ${uppercaseWord}`;
  } else if (guessesRemaining === 1) {
    span.innerText = `1 guess`;
  } else (
    span.innerText = `${guessesRemaining} guesses`
  )
};

const checkVictory = function (wordInProgress) {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add('win');
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
  };
};

