const cardsData = [
    { question: 'Qual é o maior rio da Amazônia?', answer: 'Rio Amazonas' },
    { question: 'Qual animal é conhecido por sua habilidade de camuflagem na Amazônia?', answer: 'Camaleão' },
    { question: 'Qual é o nome da maior floresta tropical do mundo?', answer: 'Floresta Amazônica' },
    { question: 'Qual é o principal tributo da vegetação amazônica?', answer: 'Diversidade de espécies' },
    { question: 'Qual é o nome da famosa arara da Amazônia?', answer: 'Arara Azul' },
    { question: 'Qual é o mamífero conhecido como o "rei da floresta"?', answer: 'Onça Pintada' },
    { question: 'Qual é o peixe famoso por sua mordida forte?', answer: 'Piranha' },
    { question: 'Qual animal é conhecido por sua capacidade de nadar em água doce?', answer: 'Boto Cor-de-Rosa' }
];

let cards = [];
let selectedCards = [];
let matchedCards = [];

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    cards = [...cardsData, ...cardsData]  // Duplicar para criar pares
        .sort(() => 0.5 - Math.random());
    cards.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = `<div class="text">${cardData.question}</div>`;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `${cardData.answer}`;
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const answer1 = card1.querySelector('.card-back').textContent;
    const answer2 = card2.querySelector('.card-back').textContent;

    if (answer1 === answer2) {
        matchedCards.push(answer1);
        selectedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
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
