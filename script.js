// string the 10 frases
const quotes = [
    "Ser ou não ser, eis a questão",
	"O gênio é um por cento de inspiração e noventa e nove por cento de transpiração",
	"Nem todos os que vagam estão perdidos",
	"Você perde 100% dos chutes que não dá",
	"Seja a mudança que você deseja ver no mundo",
	"A única maneira de fazer um grande trabalho é amar o que você faz",
	"Você pode observar muito apenas observando",
	"Você pode observar muito apenas observando",
	"Acredite que você pode e você já está no meio do caminho",
	"Dança Gatinho dança",
	"La ele",
	"Desistir é para os fracos! Faça que nem eu, nem tente"

];

let currentQuote = 0; 
const answerInput = document.getElementById("answer");
const quoteDisplay = document.getElementById("quote");
const audio = document.getElementById("myaudio");
audio.volume = 0.1;

// função para mostrar uma frase aleatoria
function displayQuote() {
	currentQuote = Math.floor(Math.random() * quotes.length); // escolhe a frase pelo indice 
	const quote = quotes[currentQuote];	

	// divida a citação em letras individuais e envolva cada uma em um intervalo com um ID exclusivo
	const letterSpans = quote.split("").map((letter, i) => `<span id="letter-${i}">${letter}</span>`);

	quoteDisplay.innerHTML = letterSpans.join(""); // exibir a frase com cada letra em um intervalo
	answerInput.value = ""; // limpar o input do usuario
	
}

// verificação do texto
function checkAnswer() {
    const answer = answerInput.value.toLowerCase();
    const quote = quotes[currentQuote].toLowerCase();

    if (answer === quote) {
       
        quoteDisplay.querySelectorAll("span").forEach(span => span.style.color = "blue");
        return true;
    }

    const letters = quote.split("");
    let allCorrect = true;

    for (let i = 0; i < letters.length; i++) {
        const letterSpan = document.getElementById(`letter-${i}`);

        if (answer[i] === letters[i]) {
            letterSpan.style.color = "blue";	 // deixa as letras azuis caso resposta seja = letras da frase
        } else if (answer[i]) {
            letterSpan.style.color = "red";   //deixa vermelho caso não seja
            allCorrect = false;
        } else {
            letterSpan.style.color = "black";  // preto se receber nenhum valor do usuario
			allCorrect = false;
			
        }
    }
	

    return allCorrect;
}



// Evento do enter verifica se esta correto ou incorreto e alerta o usuario
answerInput.addEventListener("keydown", function(event) {
	if (event.key === "Enter" && !event.shiftKey) {
		event.preventDefault(); // impede comando default do enter para quebrar linha
		if (answerInput.value.trim().length > 0) { // garante que o input do usuario não seja
			if (checkAnswer()) {
				alert("Nice! Você acertou!");
				displayQuote();
				var x = document.getElementById("Coin collect sound effect free to use.mp3");
				x.play();
			} else {
				alert("Você errou, tente novamente!");
				answerInput.value = "";
				quoteDisplay.querySelectorAll("span").forEach(span => span.style.color = "black");
				displayCurrentQuote();
			}
		}
	}
});
  
// Chama função checkAnswer toda vez que o usuario digita ou excluir o texto no campo de resposta
	answerInput.addEventListener("input", function() {
		checkAnswer();
		if (answerInput.value.length > quoteDisplay.children.length) {
			answerInput.value = answerInput.value.slice(0, quoteDisplay.children.length);
    }
}); 

// mostra a primeira frase ao carregar o site
displayQuote();