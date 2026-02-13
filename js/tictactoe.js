// Tic-Tac-Toe Game - Single Player vs Computer (Hard Mode)
class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.humanPlayer = 'X';
        this.computerPlayer = 'O';
        this.gameActive = true;
        this.isComputerThinking = false;
        this.gameContainer = null;
        this.winningPattern = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    render() {
        const container = document.getElementById('tictactoe-game');
        if (!container) return;
        
        this.gameContainer = container;
        this.resetState();
        
        container.innerHTML = `
            <div class="ttt-header">
                <span class="ttt-title">Quick Game</span>
                <span class="ttt-turn" id="ttt-turn">Your turn</span>
            </div>
            <div class="ttt-board" id="ttt-board">
                ${this.board.map((cell, index) => `
                    <div class="ttt-cell" data-index="${index}">
                        ${cell}
                    </div>
                `).join('')}
            </div>
            <button class="ttt-reset" id="ttt-reset">Reset</button>
        `;

        this.attachEvents();
    }

    resetState() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.isComputerThinking = false;
        this.winningPattern = null;
    }

    attachEvents() {
        const cells = this.gameContainer.querySelectorAll('.ttt-cell');
        const resetBtn = this.gameContainer.querySelector('#ttt-reset');

        cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        resetBtn.addEventListener('click', () => this.resetGame());
    }

    handleCellClick(e) {
        const index = e.target.dataset.index;
        
        if (this.board[index] !== '' || !this.gameActive || this.isComputerThinking) return;

        // Human player move
        this.board[index] = this.humanPlayer;
        e.target.textContent = this.humanPlayer;
        e.target.classList.add('filled');

        if (this.checkWinner(this.humanPlayer)) {
            this.gameActive = false;
            this.updateTurn(`You win! 🎉`);
            this.highlightWinner();
            return;
        }

        if (this.board.every(cell => cell !== '')) {
            this.gameActive = false;
            this.updateTurn("Draw! 🤝");
            return;
        }

        // Computer move
        this.isComputerThinking = true;
        this.updateTurn("Computer...");
        setTimeout(() => this.makeComputerMove(), 500);
    }

    makeComputerMove() {
        const bestMove = this.findBestMove();
        
        if (bestMove !== -1) {
            this.board[bestMove] = this.computerPlayer;
            const cell = this.gameContainer.querySelector(`[data-index="${bestMove}"]`);
            cell.textContent = this.computerPlayer;
            cell.classList.add('filled');

            if (this.checkWinner(this.computerPlayer)) {
                this.gameActive = false;
                this.updateTurn(`Computer wins! 🤖`);
                this.highlightWinner();
                this.isComputerThinking = false;
                return;
            }

            if (this.board.every(cell => cell !== '')) {
                this.gameActive = false;
                this.updateTurn("Draw! 🤝");
                this.isComputerThinking = false;
                return;
            }
        }

        this.isComputerThinking = false;
        this.updateTurn("Your turn");
    }

    // Minimax algorithm for optimal play
    minimax(board, depth, isMaximizing) {
        const winner = this.checkWinnerHelper(board);
        
        if (winner === this.computerPlayer) return 10 - depth;
        if (winner === this.humanPlayer) return depth - 10;
        if (board.every(cell => cell !== '')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = this.computerPlayer;
                    let score = this.minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = this.humanPlayer;
                    let score = this.minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    findBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = this.computerPlayer;
                let score = this.minimax(this.board, 0, false);
                this.board[i] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    checkWinner(player) {
        return this.checkWinnerHelper(this.board, player);
    }

    checkWinnerHelper(board, player = null) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.winningPattern = pattern;
                return board[a];
            }
        }

        return null;
    }

    highlightWinner() {
        if (!this.winningPattern) return;
        
        const cells = this.gameContainer.querySelectorAll('.ttt-cell');
        this.winningPattern.forEach(index => {
            cells[index].classList.add('winner');
        });
    }

    updateTurn(message) {
        const turnEl = this.gameContainer.querySelector('#ttt-turn');
        if (turnEl) turnEl.textContent = message;
    }

    resetGame() {
        this.resetState();
        this.updateTurn('Your turn');
        
        const cells = this.gameContainer.querySelectorAll('.ttt-cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('filled', 'winner');
        });
    }
}

// Initialize game when script loads
window.ticTacToe = new TicTacToe();

