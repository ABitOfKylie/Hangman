// To Do:  at game restart - Wrong Guesses does not clear.reset.  
//Add onclick event to the reset button in jumbotron
// Add conditions: if letter already guessed - alert, if not a letter - alert.

var wordOptions = ["jaundice", 'hypothermia', 'exhaustion', 'remorse'];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksNSuccesses = [];
var wrongLetters =[];

var wins = 0;
var losses = 0;
var guessesLeft = 9;

function startGame(){
	selectedWord = wordOptions[Math.floor(Math.random()* wordOptions.length)];
	lettersInWord=selectedWord.split("");
	numBlanks = lettersInWord.length;
	
// reset
guessesLeft = 9;
wrongLetters = [];
blanksNSuccesses = [];
// $('#gnomeFact').modal('hide');


// determine and set number of blanks
for (var i = 0; i<numBlanks; i++) {
	blanksNSuccesses.push ("___");
};
// change html 
document.getElementById("wordToGuess").innerHTML = blanksNSuccesses.join("   ");
document.getElementById("numGuesses").innerHTML = guessesLeft;
document.getElementById("winCounter").innerHTML = wins;
document.getElementById("lossCounter").innerHTML = losses;
document.getElementById("wrongGuesses").innerHTML = wrongLetters;



		console.log("selected" + selectedWord);
		console.log("lettersInWord: "+ lettersInWord);
		console.log("number of blanks: " +numBlanks);
		console.log("blanks&Succeses: " +blanksNSuccesses);
};

function compareLetters(letter){
	// does the letter exist?
	var foundLetter = false;
	// ok,does the letter match any letter in the word
	for (var i = 0; i<numBlanks; i++) {
		if(selectedWord[i] == letter){
			foundLetter = true;
			// alert("letter found");
		};
	};

	// check where in word, the letter exists - then add to blanksNSuccesses array
	
	if(foundLetter){
		for (var i = 0; i<numBlanks; i++) {
			if(selectedWord[i] == letter){
				blanksNSuccesses[i] = letter; // why only 1 = work and == doesn't work?
				// alert("letter found here too");
		}
	}
}

	else{
		wrongLetters.push(letter);
		guessesLeft--;
		console.log(guessesLeft);
	}

	console.log(blanksNSuccesses);
};

	function cleanUpComplete(){
		console.log ("Win Count: " + wins + "| Loss Count: " + losses + "| Guesses Left : " + guessesLeft);
		// update latates stats
		document.getElementById("numGuesses").innerHTML = guessesLeft;
		document.getElementById("wordToGuess").innerHTML = blanksNSuccesses.join(" ");
		document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");




		// check if player won
		if (lettersInWord.toString() == blanksNSuccesses.toString()){
			wins ++;

			alert("Ta Dah!!!! You Won!");
			// document.getElementById("gnomeFact").showModal();

			// update win counter in the html
		document.getElementById("winCounter").innerHTML = wins;

			startGame();
		}

		// check if player lost
		else if (guessesLeft == 0){
			losses ++;
			document.getElementById("wrongGuesses").innerHTML = wrongLetters;

			alert("You blew it!");

			document.getElementById("lossCounter").innerHTML = losses;


			startGame();

		}
	};



startGame();

// clicks/
document.onkeyup = function(event){
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(letterGuessed);
	compareLetters(letterGuessed);

	cleanUpComplete();
};

