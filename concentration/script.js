document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;

    function initializeGame() {
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        lockBoard = false;

        const cardSymbols = [...symbols, ...symbols];
        cardSymbols.sort(() => 0.5 - Math.random());

        cardSymbols.forEach(symbol => {
            const card = createCard(symbol);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.textContent = symbol;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (lockBoard || this === flippedCards[0] || this.classList.contains('flipped')) {
            return;
        }

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        lockBoard = true;
        const [card1, card2] = flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            disableCards();
            matchedPairs++;
            if (matchedPairs === symbols.length) {
                setTimeout(() => alert('You won!'), 500);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        flippedCards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
            });
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false];
    }

    resetButton.addEventListener('click', initializeGame);

    initializeGame();
});
