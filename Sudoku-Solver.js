var sudoku_1 = [
    [7,8,0,4,0,0,1,2,0],
    [6,0,0,0,7,5,0,0,9],
    [0,0,0,6,0,1,0,7,8],
    [0,0,7,0,4,0,2,6,0],
    [0,0,1,0,5,0,9,3,0],
    [9,0,4,0,6,0,0,0,5],
    [0,7,0,3,0,0,0,1,2],
    [1,2,0,0,0,7,4,0,0],
    [0,4,9,2,0,6,0,0,7]
];
sudoku_0 = [
    [7,8,1,4,1,1,1,2,1],
    [6,1,1,1,7,5,1,1,9],
    [1,1,1,6,1,1,1,7,8],
    [1,1,7,1,4,1,2,6,1],
    [1,1,1,1,5,1,9,3,1],
    [9,1,4,1,6,1,1,1,5],
    [1,7,1,3,1,1,1,1,2],
    [1,2,1,1,1,7,4,1,1],
    [1,4,9,2,1,6,1,1,7]
];

sudoku_solved = [
    [7,8,5,4,3,9,1,2,6],
    [6,1,2,8,7,5,3,4,9],
    [4,9,3,6,2,1,5,7,8],
    [8,5,7,9,4,3,2,6,1],
    [2,6,1,7,5,8,9,3,4],
    [9,3,4,1,6,2,7,8,5],
    [5,7,8,3,9,4,6,1,2],
    [1,2,6,5,8,7,4,9,3],
    [3,4,9,2,1,6,8,5,7]
];

function printBoard(board){
    for (let i = 0; i < board.length; i++) {
        if (i % 3 == 0 && i != 0){
            process.stdout.write("- - - - - - - - - - - - - "+"\n");
        }

        for (let j=0; j < board[i].length; j++){
            if (j % 3 == 0 && j != 0){
                process.stdout.write(" | ");
            }

            if (j == 8){
                process.stdout.write(board[i][j] + "\n");
            } else{
                process.stdout.write(board[i][j] + " ");
            }
        }
    }
}

function find_empty(board){
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] == 0){
                return ([i, j]);
            }
        }
    }
    return ("none");
}

function valid(board, number, position){
    //Check the Row and Column
    for (let i = 0; i < board[0].length; i++){
        if ((board[position[0]][i] == number && position[1] != i) || (board[i][position[1]] == number && position[0] != i)){
            return(false);
        }
    }

    //Check Box
    box_x = Math.floor(position[1] / 3);
    box_y = Math.floor(position[0] / 3);
    for (let i = box_y * 3; i < box_y * 3 + 3; i++){
        for (let j = box_x * 3; j < box_x * 3 + 3; j++){
            let dupe = [i,j];
            if (board[i][j] == number && dupe != position){
                return(false);
            }
        }
    }
    return(true);
}

function solve(boards){
    //Check if board is complete
    let find = find_empty(boards)
    if (find == "none"){
        return (true);
    } else{
        var row = find[0];
        var col = find[1];
    }
    for(let x = 1;x < 10; x++){
        if (valid(boards,x,[row,col])==true){
            //console.log(x);
            boards[row][col] = x;
            var temp = solve(boards);
            if (temp == true){
                return (true);
            }
            boards[row][col] = 0;
        }
    }
    return (false);
}

printBoard(sudoku_1);
console.log('___________________________');
solve(sudoku_1);
printBoard(sudoku_1);
//console.log(valid(sudoku_1,5,[0,2]))
//find = find_empty(sudoku_0)
//console.log(find)

