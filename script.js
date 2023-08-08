
let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let remainingGuesses = document.querySelector(".remainingGuesses");
let reject = document.querySelector(".reject");
let lowOrHi = document.querySelector(".lowOrHi");

let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

guessField.focus();

function checkGuess() {
    let userGuess = Number(guessField.value);

    if (userGuess > 100 || userGuess < 1) {
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
        setGameOver(); 
    } else if (guessCount === 10) {
        lastResult.textContent = "loupé, retente ta chance plus tard mon jeune pucix.";
        setGameOver();
    } else {
        lastResult.textContent = "Faux";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop petit!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop grand!";
        }

        remainingGuesses.textContent = "Nombre d'essais : " + guessCount + "/10";
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
    reject.textContent = "Le nombre ne peut pas être supérieure à 100 (pui100) ou inférieur à 1";
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
    resetButton.addEventListener("click", resetGame);
}

function resetGame () {
    guessCount = 1;
    let resetParas = document.querySelectorAll(".resultParas p");
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}