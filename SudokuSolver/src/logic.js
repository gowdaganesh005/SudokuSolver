const solveSudoku = (board) => {
    const isSafe = (board, row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
          return false;
        }
      }
  
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (board[i][j] === num) {
            return false;
          }
        }
      }
  
      return true;
    };
  
    const findEmpty = (board) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === '') {
            return [i, j];
          }
        }
      }
      return null;
    };
  
    const solve = () => {
      const empty = findEmpty(board);
      if (!empty) {
        return true;
      }
  
      const [row, col] = empty;
  
      for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, String(num))) {
          board[row][col] = String(num);
  
          if (solve()) {
            return true;
          }
  
          board[row][col] = '';
        }
      }
  
      return false;
    }
  
    return solve();
  }

  export default solveSudoku