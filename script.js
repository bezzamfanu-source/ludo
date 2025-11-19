document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const diceBtn = document.getElementById('dice');
    const diceResultDiv = document.getElementById('dice-result');
    const playerTurnDiv = document.getElementById('player-turn');

    const boardLayout = [
        // Simplified layout for a 1v1 Ludo
        // 0: empty, 1: player1 path, 2: player2 path, 3: safe zone
        // Simplified for brevity
    ];

    const player1Path = [/* cell indices */];
    const player2Path = [/* cell indices */];

    let player1Pieces = [-1, -1, -1, -1]; // -1 for home, otherwise cell index
    let player2Pieces = [-1, -1, -1, -1];

    let currentPlayer = 1;
    let diceValue = 0;

    function createBoard() {
        for (let i = 0; i < 15 * 15; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            // Color the cells based on a simplified layout
            if ((i >= 0 && i < 36) || (i >= 45 && i < 51)) { // Simplified home/path areas
                 if (i % 15 < 6 && i < 90) {
                    cell.classList.add('player1-home');
                 } else if (i % 15 > 8 && i > 134) {
                    cell.classList.add('player2-home');
                 }
            }
            board.appendChild(cell);
        }
        // This is a very simplified board generation. A real one would be more complex.
    }

    function drawPieces() {
        // Clear board
        document.querySelectorAll('.player1-piece, .player2-piece').forEach(p => p.remove());

        player1Pieces.forEach(pos => {
            if (pos !== -1) {
                const piece = document.createElement('div');
                piece.classList.add('player1-piece');
                board.children[pos].appendChild(piece);
            }
        });
        player2Pieces.forEach(pos => {
            if (pos !== -1) {
                const piece = document.createElement('div');
                piece.classList.add('player2-piece');
                board.children[pos].appendChild(piece);
            }
        });
    }


    function rollDice() {
        diceValue = Math.floor(Math.random() * 6) + 1;
        diceResultDiv.textContent = `Dice: ${diceValue}`;
        // Basic logic to move a piece out of home
        if (diceValue === 6) {
            let pieceToMove = -1;
            if (currentPlayer === 1) {
                pieceToMove = player1Pieces.indexOf(-1);
                if(pieceToMove !== -1) player1Pieces[pieceToMove] = 0; // Start position
            } else {
                pieceToMove = player2Pieces.indexOf(-1);
                if(pieceToMove !== -1) player2Pieces[pieceToMove] = 224; // Start position for player 2
            }
        }
        drawPieces();
        switchPlayer();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        playerTurnDiv.textContent = `Player ${currentPlayer}'s Turn`;
    }

    diceBtn.addEventListener('click', rollDice);

    createBoard();
    drawPieces();
});