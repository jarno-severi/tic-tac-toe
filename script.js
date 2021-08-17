const Player = function (name, mark) {
    const play = () => {
        Gameboard.cells.forEach(cell => {
            cell.addEventListener('click', () => {
                cell.textContent = mark;
            });
        });
    };
    return { play };
};

const Gameboard = (function () {
    const board = ["X", "O", "X", "X", "X", "O", "O", "X", "O"];
    const cells = document.querySelectorAll('#cell');

    const fillBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = board[i];
        }
    }

    const emptyBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
        }
    }

    return { cells, fillBoard, emptyBoard };
})();

Gameboard.fillBoard();