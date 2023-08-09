const EASY_MODE = 10;
const NORMAL_MODE = 7;
const HARDCORE_MODE = 4;
const CUSTOM_MODE = 6;
const DEFAULT_MIN_NUMBER = 1;
const DEFAULT_MAX_NUMBER = 100;

let maximumGuess = NORMAL_MODE;
let maximumNumber = DEFAULT_MAX_NUMBER;
let minimumNumber = DEFAULT_MIN_NUMBER;
let randomNumber = Math.floor(Math.random() * maximumNumber) + minimumNumber;


let explanation =  document.querySelector(".explanation");
let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let remainingGuesses = document.querySelector(".remainingGuesses");
let reject = document.querySelector(".reject");
let lowOrHi = document.querySelector(".lowOrHi");
const canvas = document.querySelector('#confetti-canvas');
let settings = document.querySelector(".settings");
let settingsbtn = document.querySelector(".settingsbtn")
let settingsmenu = document.querySelector(".settingsmenu");
let currentDifficulty = document.querySelector(".currentdifficulty");
let easymodebtn = document.querySelector(".easymode");
let normalmodebtn = document.querySelector(".normalmode");
let hardcoremodebtn = document.querySelector(".hardcoremode");
let custommodebtn = document.querySelector(".custommode");
let user_min_number = document.querySelector(".user_choice_minimum_number");
let user_max_number = document.querySelector(".user_choice_maximum_number");
let user_number_confirm_btn = document.querySelector(".user_number_confirm");
let customrangenumber = document.querySelector(".customrangenumber");

let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

showDifficulty(NORMAL_MODE);
updateExplanation();

guessField.focus();

easymodebtn.textContent = `easy mode : ${EASY_MODE} essais`;
normalmodebtn.textContent = `normal mode : ${NORMAL_MODE} essais`;
hardcoremodebtn.textContent = `hardcore mode : ${HARDCORE_MODE} essais`;
custommodebtn.textContent = `custom mode : ${CUSTOM_MODE} essais`;

    customrangenumber.style.display = "none";
    custommodebtn.addEventListener("click", event => {
    var sw = customrangenumber;
    if (sw.style.display === "none") {
      sw.style.display = "block";
    } else {
      sw.style.display = "none";
    }
    console.log(sw.style.display);
  });
  
    document.getElementById("settingsmenu").style.display = "none";
    document.getElementById("settingsbtn").addEventListener("click", event => {
    var sw = document.getElementById("settingsmenu");
    if (sw.style.display === "none") {
      sw.style.display = "block";
    } else {
      sw.style.display = "none";
    }
    console.log(sw.style.display);
  });

easymode.addEventListener("click", event => {
    changeDifficulty(EASY_MODE);
});

normalmode.addEventListener("click", event => {
    changeDifficulty(NORMAL_MODE);
});

hardcoremode.addEventListener("click", event => {
    changeDifficulty(HARDCORE_MODE);

});

custommode.addEventListener("click", event => {
    changeDifficulty(CUSTOM_MODE);

});

user_number_confirm_btn.addEventListener("click", changerangeNumber);

function changerangeNumber() {
    let minvalue = Number(user_min_number.value);
    let maxvalue = Number(user_max_number.value);
    if (minvalue >= maxvalue ) {
        return;
    }

    if (minvalue < 1) {
        return;
    }

    maximumNumber = maxvalue;
    minimumNumber = minvalue;
    resetGame();
    updateExplanation();
    removeResetButton();
}

customrangenumber.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        changemaximumGuess();
    }
});

function changemaximumGuess() {
    let user_guess = Number(customrangenumber.value);
    if (user_guess < 1) return;
    changeDifficulty(user_guess);
    custommodebtn.textContent = `custom mode : ${user_guess} essais`;
}


function updateExplanation(){
    explanation.textContent = `Tu choisis un nombre entre ${minimumNumber} et ${maximumNumber} et si tu choisis le bon tu gagnes un ticket restau, glhf.`;
}


function changeDifficulty(guess) {
    remainingGuesses.textContent = null;
    lowOrHi.textContent = null;
    guesses.textContent = null;
    lastResult.textContent = null;
    resetGame();
    showDifficulty(guess);
    removeResetButton();

}

function showDifficulty(guess) {
    maximumGuess = guess;
    if ( maximumGuess === HARDCORE_MODE) {
        currentDifficulty.textContent = "hardcore";
        currentDifficulty.style.color = "#ff5252";
    } else if( maximumGuess === NORMAL_MODE) {
        currentDifficulty.textContent = "normal";
        currentDifficulty.style.color = "#ffc04c";
    } else if( maximumGuess === EASY_MODE) {
        currentDifficulty.textContent = "easy";
        currentDifficulty.style.color = "#7bc67b";
    } else {
        currentDifficulty.textContent = "custom";
        currentDifficulty.style.color = "#9fc1ff";
    }

}


function checkGuess() {
    let userGuess = Number(guessField.value);

    if (userGuess > maximumNumber || userGuess < minimumNumber) {
        rejectGuess();
        lastResult.textContent = null;
        lastResult.backgroundColor = null;
        return;
    } else {
        removeReject();
    }

    if (guessCount === 1) {
        guesses.textContent = "Propositions précédentes : ";
    }
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {

        lastResult.textContent = "Bravo, vous avez trouvé le nombre!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        var myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
          });
          myConfetti({
            particleCount: 100,
            spread: 160
          });
        setGameOver(); 
    } else if (guessCount === maximumGuess) {
        lastResult.textContent = `loupé, le chiffre gagnant était ${randomNumber}. retente ta chance plus tard mon jeune pucix.`;
        remainingGuesses.textContent = null;
        lowOrHi.textContent = null;
        guesses.textContent = null;

        setGameOver();
    } else {
        lastResult.textContent = "Faux";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop petit!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop grand!";
        }

        remainingGuesses.textContent = "Nombre d'essais : " + guessCount + "/" + maximumGuess ;
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();

}

guessSubmit.addEventListener("click", checkGuess);
guessField.addEventListener("keydown", event => {
    if (event.keyCode === 13) {
        checkGuess();
    }
});

function rejectGuess() {
    reject.textContent = `Le nombre ne peut pas être supérieure à ${maximumNumber} ou inférieur à ${minimumNumber}`;
    reject.style.backgroundColor = "orange";

}

function removeReject() {
    reject.textContent = null;
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "démarrer une nouvelle partie";
    resetButton.style.fontFamily = "Source Code Pro";
    document.body.appendChild(resetButton);
    resetButton.addEventListener("click", event => {
        resetGame();
        removeResetButton();
      });
}

function removeResetButton() {
    if (resetButton === undefined) {
        return;
    }
    resetButton.parentNode.removeChild(resetButton);
    resetButton = undefined;      
}

function resetGame () {
    guessCount = 1;
    let resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = "";
    }

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * maximumNumber) + minimumNumber;
}

$(document).ready(function() {
    $("input").attr({
       "max" : maximumNumber, 
       "min" : minimumNumber      
    });
});

