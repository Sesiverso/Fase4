const cardsData = [
    { question: 'Animal famoso pintado', answer: 'Onça Pintada' },
    { question: 'Ave colorida da Amazônia', answer: 'Arara Azul' },
    { question: 'Golfinho de cor rosa encontrado na Amazônia', answer: 'Boto Cor-de-Rosa' },
    { question: 'Primata de pelagem dourada da Amazônia', answer: 'Mico-leão-dourado' },
    { question: 'Animal com focinho longo e grande cauda', answer: 'Tamanduá-bandeira' },
    { question: 'Mamífero lento que vive nas árvores', answer: 'Preguiça-de-três-dedos' },
    { question: 'Maior roedor do mundo, encontrado na Amazônia', answer: 'Capivara' },
    { question: 'Povo tradicional da região litorânea da Amazônia', answer: 'Caiçara' }
];

let cards = [];
let selectedCards = [];
let matchedCards = [];

function createBoard() {
    const gameBoard = document.getElementById('game-board');

    // Criar pares de cartas para perguntas e respostas
    cards = cardsData.flatMap(card => [
        { type: 'question', text: card.question },
        { type: 'answer', text: card.answer }
    ])
    .sort(() => 0.5 - Math.random()); // Embaralhar

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = `<div class="text">${card.text}</div>`;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = '<div class="text">Amazônia</div>'; // Texto padrão para o verso
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    // Remove animação de flip após a animação inicial
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.animation = 'none';
        });
    }, 1000); // Tempo da animação
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

    const isMatch = cardsData.some(card =>
        (card.question === text1 && card.answer === text2) ||
        (card.question === text2 && card.answer === text1)
    );

    if (isMatch) {
        matchedCards.push(text1, text2);
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
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('Parabéns! Você ganhou!');
            document.getElementById('game-board').innerHTML = '';
            createBoard();
        }, 500);
    }
}

createBoard();
