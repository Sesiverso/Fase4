const cardsData = [
    { question: 'Onça', answer: 'Animal da Amazônia muito conhecido' },
    { question: 'Arara Azul', answer: 'Ave colorida da Amazônia' },
    { question: 'Boto Cor-de-Rosa', answer: 'Golfinho de cor rosa encontrado na Amazônia' },
    { question: 'Mico-leão-dourado', answer: 'Primata de pelagem dourada da Amazônia' },
    { question: 'Tamanduá-bandeira', answer: 'Animal com focinho longo e grande cauda' },
    { question: 'Preguiça-de-três-dedos', answer: 'Mamífero lento que vive nas árvores' },
    { question: 'Capivara', answer: 'Maior roedor do mundo, encontrado na Amazônia' },
    { question: 'Caiçara', answer: 'Povo tradicional da região litorânea da Amazônia' }
];

let cards = [];
let selectedCards = [];
let matchedCards = [];

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    cards = [...cardsData, ...cardsData] // Duplicar para criar pares
        .sort(() => 0.5 - Math.random()); // Embaralhar
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = `<div class="text">${card.answer}</div>`;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `<div class="text">Amazônia</div>`;
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
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
    if (matchedCards.length === cardsData.length) {
        setTimeout(() => {
            alert('Parabéns! Você ganhou!');
            document.getElementById('game-board').innerHTML = '';
            createBoard();
        }, 500);
    }
}

createBoard();
