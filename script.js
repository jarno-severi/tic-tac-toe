const Player = function (mark) {
    return { mark };
};

const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.querySelectorAll('#cell');
    const fillBoard = () => {

        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = board[i];
        }
    };
    const emptyBoard = () => {

        for (let i = 0; i < cells.length; i++) {
            board[i] = "";
            cells[i].textContent = board[i];
        }
    };
    const counter = () => {
        let n = 0;

        for (let i = 0; i < cells.length; i++) {
            if (board[i] !== "") n++;
        }
        return n;
    };
    return { board, cells, fillBoard, emptyBoard, counter };
})();

const Controller = (function () {
    const player1 = Player('X');
    const player2 = Player('O');
    let player;
    let n = 2;

    const turn = () => {
        let turn = n % 2;

        if (turn === 0) player = player1;
        else player = player2;

        n++;
        return player.mark;
    };

    const play = () => {
        Gameboard.emptyBoard();
        Gameboard.cells.forEach(cell => {
            cell.addEventListener('click', markCell);
        });

        function markCell() {

            if (this.textContent === "") {
                let i = this.dataset.index;
                Gameboard.board[i] = turn();
                Gameboard.fillBoard();

                if (Boolean(checkForWinner())) {
                    alert(checkForWinner());
                    clearListeners();
                };
            }

            if (Gameboard.counter() === 9) alert("Board full, tie game!");
        }

        function clearListeners () {
            Gameboard.cells.forEach(cell => {
                cell.removeEventListener('click', markCell)
            });
        }
    };

    const checkForWinner = () => {
        // Possible winning conditions
        let firstRow = Gameboard.board.slice(0, 3);
        let secondRow = Gameboard.board.slice(3, 6);
        let thirdRow = Gameboard.board.slice(6);
        let firstCol = [
            Gameboard.board[0],
            Gameboard.board[3],
            Gameboard.board[6]
        ];
        let secondCol = [
            Gameboard.board[1],
            Gameboard.board[4],
            Gameboard.board[7]
        ];
        let thirdCol = [
            Gameboard.board[2],
            Gameboard.board[5],
            Gameboard.board[8]
        ];
        let leftObl = [
            Gameboard.board[0],
            Gameboard.board[4],
            Gameboard.board[8]
        ];
        let rightObl = [
            Gameboard.board[2],
            Gameboard.board[4],
            Gameboard.board[6]
        ];
        // Conditions to an Array to check with forEach
        const pieces = [
            firstRow,
            secondRow,
            thirdRow,
            firstCol,
            secondCol,
            thirdCol,
            leftObl,
            rightObl
        ];
        // Check for both player 3 in a row condition
        function checkForX(cell) {
            return cell === "X";
        }
        function checkForO(cell) {
            return cell === "O";
        }
        // Returns winning player if 3 in a row is found
        function winner(player) {
            pieces.forEach(piece => {

                if (piece.every(checkForX)) {
                    player = "Player X wins!";

                } else if (piece.every(checkForO)) {
                    player = "Player 0 wins!"
                }
            });
            return player;
        };
        return winner();
    }
    return { play };
})();

document.querySelector('#play-button').addEventListener('click', Controller.play);