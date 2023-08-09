let maximumGuess = 7;
let maximumNumber = 100;
let minimumNumber = 1;
let randomNumber = Math.floor(Math.random() * maximumNumber) + minimumNumber;


let explanation =  document.querySelector(".explanation");
let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let remainingGuesses = document.querySelector(".remainingGuesses");
let reject = document.querySelector(".reject");
let lowOrHi = document.querySelector(".lowOrHi");
const canvas = document.querySelector('#confetti-canvas');
let settings = document.querySelector(".settings");
let settingsmenu = document.querySelector(".settingsmenu");
let currentDifficulty = document.querySelector(".currentdifficulty");

let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

guessField.focus();

explanation.textContent = `Tu choisis un nombre entre ${minimumNumber} et ${maximumNumber} et si tu choisis le bon tu gagnes un ticket restau, glhf.`;

document.getElementById("settingsmenu").style.display = "none";
document.getElementById("settings").addEventListener("click", function toffi(){
    var sw = document.getElementById("settingsmenu");
    if (sw.style.display === "none") {
      sw.style.display = "block";
    } else {
      sw.style.display = "none";
    }
    console.log(sw.style.display);
  });

document.getElementById("easymode").addEventListener("click", function toffi(){
    maximumGuess = 10;
    changeDifficulty();
});

document.getElementById("normalmode").addEventListener("click", function toffi(){
    maximumGuess = 7;
    changeDifficulty();
});

document.getElementById("hardcoremode").addEventListener("click", function toffi(){
    maximumGuess = 4;
    changeDifficulty();

});

function changeDifficulty() {
    remainingGuesses.textContent = null;
    lowOrHi.textContent = null;
    guesses.textContent = null;
    lastResult.textContent = null;
    resetGame();
    showDifficulty();
    if (resetButton !== undefined){
        removeResetButton();
    }


}

function showDifficulty() {
if ( maximumGuess === 4) {
    currentDifficulty.textContent = "hardcore";
} else if( maximumGuess === 7) {
    currentDifficulty.textContent = "normal";
} else if( maximumGuess === 10) {
    currentDifficulty.textContent = "easy";
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
        lastResult.textContent = "loupé, retente ta chance plus tard mon jeune pucix.";
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
    document.body.appendChild(resetButton);
    resetButton.addEventListener("click", event => {
        resetGame();
        removeResetButton();
      });
}

function removeResetButton() {
    resetButton.parentNode.removeChild(resetButton);
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

