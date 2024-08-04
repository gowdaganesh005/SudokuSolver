import { useState,useEffect,useRef } from 'react'
import solveSudoku from './logic';

import { Link } from 'react-router-dom';

import './App.css'
import Button from './components/Button';
import { ThemeProvider } from './contexts/theme';

function App() {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill('')));
  const [initialCells, setInitialCells] = useState(Array(9).fill(Array(9).fill(false)));
  const [notification, setNotification] = useState(null)

  const [themeMode, setthenemode] = useState("light")
  const lighttheme=()=>{setthenemode("light")}
  const darktheme=()=>{setthenemode("dark")}
  useEffect(()=> {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])
  const inputRefs = useRef(Array(9).fill(null).map(() => Array(9).fill(null)));

  const handleChange = (e, row, col) => {
    const value = e.target.value;

    if (!/^[1-9]$/.test(value)) {
      return;
    }

    if (isDuplicate(board, row, col, value)) {
      setNotification("Duplicate value not allowed");
      setTimeout(() => {
        setNotification(null);
      }, 2000); 
      return;
    }

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? value : cell))
    );
  
    setBoard(newBoard);
    const newInitialCells = initialCells.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? true : cell))
    );
    setInitialCells(newInitialCells);

    if (col < 8) {
      inputRefs.current[row][col + 1]?.focus();
    } else if (row < 8) {
      inputRefs.current[row + 1][0]?.focus();
    }

    
  }
    const isDuplicate = (board, row, col, value) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === value || board[i][col] === value) {
          return true;
        }
      }
  
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (board[i][j] === value) {
            return true;
          }
        }
      }
    
    return false;
  };
  const handleSolve = () => {
    const solvedBoard = JSON.parse(JSON.stringify(board)); // Deep copy
    if (solveSudoku(solvedBoard)) {
      setBoard(solvedBoard);
    } else {
      alert('No solution exists for the given puzzle.');
    }
  }
  const handleKeyDown = (e, row, col) => {
    switch (e.key) {
      case 'ArrowUp':
        if (row > 0) {
          inputRefs.current[row - 1][col]?.focus();
        }
        break;
      case 'ArrowDown':
        if (row < 8) {
          inputRefs.current[row + 1][col]?.focus();
        }
        break;
      case 'ArrowLeft':
        if (col > 0) {
          inputRefs.current[row][col - 1]?.focus();
        }
        break;
      case 'ArrowRight':
        if (col < 8) {
          inputRefs.current[row][col + 1]?.focus();
        }
        break;
        case 'Backspace':
          case 'Delete':
            // Clear the cell value
            const newBoard = board.map((r, i) =>
              r.map((cell, j) => (i === row && j === col ? '' : cell))
            );
            const newInitialCells = initialCells.map((r, i) =>
              r.map((cell, j) => (i === row && j === col ? false : cell))
            );
            setBoard(newBoard);
            setInitialCells(newInitialCells);
            break;
          default:
            break;
    }
  }

  function handleReset(){
    setBoard(Array(9).fill(Array(9).fill('')))
    setInitialCells(Array(9).fill(Array(9).fill(false)))
  }
  

  return (
    <>
    <ThemeProvider value={{themeMode,lighttheme,darktheme}}>
     <div className=" h-screen flex flex-col items-center p-4 font-monto dark:bg-gray-800">
     <div className="w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-between px-6 py-4 shadow-md">
            <div className="flex-1">
            <h1 className="sm:text-7xl text-4xl font-bold text-center text-gray-900 dark:text-white font-pacifico">
              Sudoku Solver
            </h1>
            <br />
            
            
           
          
            
            <div className="flex-1 flex justify-end items-center">
            
              <Button />
              <span className="mr-2 text-gray-900 dark:text-white">Dark Mode</span>
             
            <a className='p-2' href="https://github.com/gowdaganesh005/SudokuSolver.git">
           
           <img src='https://cdn-icons-png.flaticon.com/128/733/733553.png' className='w-10 h-10 ' />
           </a>
              
            </div>
            </div>
          </div>
    <div className="flex flex-col items-center p-4">
    {notification ?( 
              <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                {notification}
              </div>
            ):( 
              <div className="bg-green-500 text-white px-4 py-2 rounded mb-4 sm:text-4xl  text-sm s">
                Enter the inital state of the Board
              </div>
            ) }
      
      <div className="grid grid-cols-9 gap-1 w-full max-w-sm sm:max-w-md">
      {board.map((row, i) =>
          row.map((cell, j) => {
            const isDarkGray =
              Math.floor(i / 3) % 2 === Math.floor(j / 3) % 2;
              const backgroundColor = initialCells[i][j]
              ? isDarkGray
                ? 'bg-green-500'
                : 'bg-green-600'
              : isDarkGray
              ? 'bg-yellow-500 '
              : 'bg-orange-600 text-blue-300';

            return (
              <b>
              <input
                key={`cell-${i}-${j}`}
                ref={(el) => inputRefs.current[i][j] = el}
                type="text"
                maxLength="1"
                value={cell}
                onChange={(e) => handleChange(e, i, j)}
                onKeyDown={(e) => handleKeyDown(e, i, j)}
                className={`w-full aspect-square ${backgroundColor} rounded-md text-center shadow-md text-3xl`}
                 
                            /></b> 
            );
          })
        )}
        
      </div>
      <div className="flex space-x-4 mt-4"> {/* Flex container for buttons */}
            <button
              onClick={handleSolve}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 shadow-lg shadow-gray-950"
            >
              Solve
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg shadow-gray-950"
            >
              Reset
            </button>
          </div>
      
    </div>
    </div>
      

        </ThemeProvider>

    </>
  )
}


export default App
