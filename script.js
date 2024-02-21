function clearBoard(){
    var tds = document.getElementsByTagName("td");
    for(var i = 0;i<tds.length;i++){
        tds[i].innerText = "";

    }
}


function boardToString(){
    var string = "";
    var validNum = /[1-9]/;
    var tds = document.getElementsByTagName("td");
    for(var i = 0;i<tds.length;i++){
        if(validNum.test(tds[i].innerText)){
            string += tds[i].innerText;
        }
        else{
            string += ".";
        }
    }
    return string;
}

function stringToBoard(string){
    var currentCell;
    var validNum = /[1-9]/;
    var cells = string.split("");
    var tds = document.getElementsByTagName("td");
    for(var i = 0;i<tds.length;i++){
        currentCell = cells.shift()
        if(validNum.test(currentCell)){
            tds[i].innerText = currentCell;
        }
    }
}

function solveSudoku(boardString) {
    // Convert string representation of board to 2D array
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push(boardString.substring(i * 9, (i + 1) * 9).split(''));
    }
    
    // Define recursive function to solve Sudoku
    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num.toString())) {
                            board[row][col] = num.toString();
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || 
                board[i][col] === num ||
                board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num ){ // same column
                return false;
            }
        }
        return true;
    }
    
    // Call the solve function
    if (solve(board)) {
        // Convert solved board back to string representation
        let solvedString = '';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                solvedString += board[row][col];
            }
        }
        return solvedString;
    } else {
        return false; // No solution found
    }
}


document.getElementById("sudoku-board").addEventListener("keyup", function(event) {
    if (event.target && event.target.nodeName == "TD") {
        var validNum = /[1-9]/;
        var getEle = event.target;
        if (getEle.innerText.length > 0 && validNum.test(getEle.innerText[0])) {
            getEle.style.backgroundColor = "white";
            getEle.innerText = getEle.innerText[0];
        } else {
            getEle.style.backgroundColor = "red";
            getEle.innerText = "";
        }
    }
});


document.getElementById("solve-button").addEventListener("click", function(e) {
    var boardString = boardToString();
    var solution = solveSudoku(boardString);
    if (solution) {
        stringToBoard(solution);
    } else {
        alert("Invalid Sudoku");
    }
});

document.getElementById("clear-button").addEventListener("click",clearBoard);

