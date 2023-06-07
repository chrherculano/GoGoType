const quotes = [
	"Ser ou não ser, eis a questão",
	"O gênio é um por cento de inspiração e noventa e nove por cento de transpiração",
	"Nem todos os que vagam estão perdidos",
	"Você perde 100% dos chutes que não dá",
	"Seja a mudança que você deseja ver no mundo",
	"A única maneira de fazer um grande trabalho é amar o que você faz",
	"Você pode observar muito apenas observando",
	"Acredite que você pode e você já está no meio do caminho",
	"Dança Gatinho dança",
	"Não levante a espada sobre a cabeça de quem te pediu perdão",
	"Desistir é para os fracos! Faça que nem eu, nem tente",
	"Creia em si, mas não duvide sempre dos outros",
	"A vida sem luta é um mar morto no centro do organismo universal",
	"A mentira é muita vezes tão involuntária como a respiração",
	"Não se ama duas vezes a mesma mulher",
	"O medo é um preconceito dos nervos. E um preconceito, desfaz-se; basta a simples reflexão",
	"A moral é uma, os pecados são diferentes",
	"Quanto a mim, tudo que eu sei é que eu não sei nada",
	"O pouco que aprendi até agora é quase nada, comparado ao que ignoro",
	"A saudade é o que faz as coisas pararem no tempo"	
  ];
  
  let currentQuote = 0;
  const answerInput = document.getElementById("answer");
  const quoteDisplay = document.getElementById("quote");
  const countdownElement = document.getElementById("countdown");
  const resultMessage = document.getElementById("message");
  const startButton = document.getElementById("start-game");
  let timeInSeconds = 30; // Tempo inicial do timer (em segundos)
  let timerInterval;
  let gameStarted = false;
  let score = 0;
  const audio = document.getElementById("myaudio");
  audio.volume = 0.2; 
  const typingSound = new Audio("./AUDIO/keyboard.mp3");
  typingSound.preload = "auto";
  typingSound.volume = 0.3;
  const correctAnswerSound = new Audio("./AUDIO/correct.mp3");
  
  startButton.addEventListener("click", startGame);
  
  function startGame() {
	if (!gameStarted) {
		timeInSeconds = 30; // Reiniciar o tempo do timer para 30 segundos
		countdownElement.textContent = formatTime(timeInSeconds);
		startButton.disabled = true;
		answerInput.disabled = false;
		answerInput.focus();
		answerInput.value = "";
		answerInput.addEventListener("input", checkAnswer);
		resultMessage.textContent = "";
		score = 0;
		gameStarted = true;
		displayQuote();
		startTimer(); // Chama a função startTimer() para iniciar o timer
		answerInput.disabled = false; // Enable the text area
	}
}

  
  function startTimer() {
	if (gameStarted && !timerInterval) {
	  timerInterval = setInterval(updateTimer, 1000);
	}
  }
  
  function updateTimer() {
	if (timeInSeconds === 0) {
	  clearInterval(timerInterval);
	  alert("Tempo acabou! Tente Novamente :)");
	  resetGame();
	} else {
	  timeInSeconds--;
	  countdownElement.textContent = formatTime(timeInSeconds);
	}
  }
  
  function formatTime(timeInSeconds) {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds
	  .toString()
	  .padStart(2, "0")}`;
  }
  
  function resetGame() {
	gameStarted = false;
	startButton.disabled = false;
	answerInput.disabled = false;
	answerInput.value = "";
	quoteDisplay.innerHTML = "";
	resultMessage.textContent = "";
	score = 0;
	clearInterval(timerInterval);
	timerInterval = undefined;
	currentQuote = 0; // Reset the current quote index
	displayQuote(); // Display the first quote again
	document.getElementById("pontos").textContent = "Pontuação: 0";
	answerInput.disabled = true; // Disable the text area
}

  function displayQuote() {
	const quote = quotes[currentQuote];
	const quoteArray = quote.split("");
  
	quoteDisplay.innerHTML = "";
	quoteArray.forEach((char) => {
	  const span = document.createElement("span");
	  span.textContent = char;
	  quoteDisplay.appendChild(span);
	});
  }
  
  answerInput.addEventListener("input", function () {
	// Play the typing sound
	typingSound.currentTime = 0;
	typingSound.play();
  });
  
  function checkAnswer() {
	const answer = answerInput.value.toLowerCase();
	const quote = quotes[currentQuote];
	const quoteArray = quote.split("");
  
	quoteDisplay.textContent = "";
	let errorFound = false;
  
	for (let i = 0; i < quoteArray.length; i++) {
	  const char = quoteArray[i];
  
	  const span = document.createElement("span");
	  span.textContent = char;
  
	  if (i < answer.length) {
		const userInputChar = answer.charAt(i);
		if (userInputChar.toLowerCase() === char.toLowerCase()) {
		  if (errorFound) {
			span.style.color = "red";
		  } else {
			span.style.color = "blue";
		  }
		} else {
		  span.style.color = "red";
		  errorFound = true;
		}
	  } else {
		span.style.color = "black";
	  }
  
	  quoteDisplay.appendChild(span);
	}
  
	if (answer === quote.toLowerCase()) {
	  resultMessage.innerHTML = "";
	  updateScore(1);
	  answerInput.focus();
	  clearInterval(timerInterval);
	  timerInterval = undefined;
	  timeInSeconds = 30;
	  startTimer();
  
	  currentQuote++;
	  if (currentQuote >= quotes.length) {
		alert("Parabéns! Você digitou todas as frases.");
		resetGame();
	  } else {
		correctAnswerSound.play();
		answerInput.value = "";
		displayQuote();
	  }
	}
  }
  
  function updateScore() {
	score++;
	if (score > 20) {
	  score = 20;
	}
	document.getElementById("pontos").textContent = `Pontuação: ${score}`;
  }
  
  answerInput.addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
	  if (gameStarted) {
		e.preventDefault();
	  }
	}
  });
  
  answerInput.addEventListener("input", (e) => {
	const answer = e.target.value;
	const quote = quotes[currentQuote];
	const maxChars = quote.length;
  
	if (answer.length > maxChars) {
	  e.target.value = answer.slice(0, maxChars);
	}
  });
  
  // Pop-up for the user to choose the number of quotes
  window.addEventListener("load", () => {
	setTimeout(() => {
	  const numberOfQuotes = window.prompt("Quantas frases você quer desafiar??", "5");
	  const parsedNumberOfQuotes = parseInt(numberOfQuotes, 10);
  
	  if (!isNaN(parsedNumberOfQuotes) && parsedNumberOfQuotes > 0 && parsedNumberOfQuotes <= quotes.length) {
		quotes.splice(parsedNumberOfQuotes);
	  } else {
		alert("Numero de frases definido para padrão de 20");
	  }
	}, 1000); // Adjust the delay time (in milliseconds) as needed
  });
  