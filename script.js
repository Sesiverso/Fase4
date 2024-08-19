const words = [
    'Onça Pintada', 'Onça Pintada',
    'Arara Azul', 'Arara Azul',
    'Boto Cor-de-Rosa', 'Boto Cor-de-Rosa',
    'Mico-leão-dourado', 'Mico-leão-dourado',
    'S tamandua-bandeira', 'Tamanduá-bandeira',
    'Preguiça-de-três-dedos', 'Preguiça-de-três-dedos',
    'Capivara', 'Capivara',
    'Caiçara', 'Caiçara'
];

let cards = [];
let selectedCards = [];
let matchedCards = [];

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    cards = words.sort(() => 0.5 - Math.random());
    cards.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.innerText = word;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length < 2) {
        this.classList.add('show');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.word === card2.dataset.word) {
        matchedCards.push(card1.dataset.word);
        selectedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('show');
            card2.classList.remove('show');
            selectedCards = [];
        }, 1000);
    }
    checkWin();
}

function checkWin() {
    if (matchedCards.length === words.length / 2) {
        setTimeout(() => {
            alert('Parabéns! Você ganhou!');
            document.getElementById('game-board').innerHTML = '';
            createBoard();
        }, 500);
    }
}

createBoard();
