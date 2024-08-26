const words = [
    'Onça Pintada', 'Onça Pintada',
    'Arara Azul', 'Arara Azul',
    'Boto Cor-de-Rosa', 'Boto Cor-de-Rosa',
    'Mico-leão-dourado', 'Mico-leão-dourado',
    'Tamanduá-bandeira', 'Tamanduá-bandeira',
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
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = `<div class="text">${word}</div>`;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = 'Amazônia';
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('show')) {
        this.classList.add('show');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const text1 = card1.querySelector('.card-front .text').textContent;
    const text2 = card2.querySelector('.card-front .text').textContent;

    if (text1 === text2) {
        matchedCards.push(text1);
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
