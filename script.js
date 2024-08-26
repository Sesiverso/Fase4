const imageUrls = [
    'https://www.u-amazon.com/medias/general/2023/01/arara-de-caninde.jpg?w=auto&h=auto&fit=auto&crop=center',
    'https://www.petz.com.br/blog/wp-content/uploads/2021/10/animais-da-amazonia3.jpg',
    'https://equadorviagens.com.br/wp-content/uploads/2018/09/Amazon-Animals.jpg',
    'https://ogimg.infoglobo.com.br/in/23286915-be5-8db/FT1500A/690/80185060_SOCOnca-pintada-da-Amazonia.-1.jpg'
];

// Duplicando cada imagem para criar pares
const cards = imageUrls.flatMap(url => [{ type: 'image', url }, { type: 'image', url }]);

cards.sort(() => 0.5 - Math.random()); // Embaralhar as cartas

let selectedCards = [];
let matchedCards = [];

function createBoard() {
    const gameBoard = document.getElementById('game-board');

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = '<div class="text">Amazônia</div>'; // Texto padrão para o verso
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `<img src="${card.url}" alt="Imagem da Amazônia" class="card-image">`;
        
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
        this.classList.add('flip');
        this.classList.add('show');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            setTimeout(() => checkMatch(), 600); // Tempo de animação de virar
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    const image1 = card1.querySelector('.card-back img').src;
    const image2 = card2.querySelector('.card-back img').src;

    if (image1 === image2) {
        matchedCards.push(image1, image2);
        selectedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('show', 'flip');
            card2.classList.remove('show', 'flip');
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

