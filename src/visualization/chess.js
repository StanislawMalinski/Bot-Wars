import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjs';
import './chessboard-1.0.0.min.css';
import FileMoves from './moves.txt';
import './chess.scss'

const parseMoves = (gameLog) => {
    const lines = gameLog.trim().split('\n');
    const moves = [];

    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i].trim();

        if (currentLine === '1' || currentLine === '0') {
            const fromMove = lines[i + 1].trim().split(' ').join('-');
            const toMove = lines[i + 2].trim().split(' ').join('-');
            if (!moves.includes(fromMove)) {
                moves.push(fromMove);
            }
            if (!moves.includes(toMove)) {
                moves.push(toMove);
            }
            i += 2;
        } else if (currentLine === '-1') {
            break;
        }
    }
    return moves.slice(1);  // Return list without the first element
}

const ChessComponent = () => {
  const [moves, setMoves] = useState([]);
  const boardRef = useRef(null);
  const [currentMove, setCurrentMove] = useState(0);
  const [board, setBoard] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Fetch and parse the moves from the file
    fetch(FileMoves)  // Adjust the path to where the moves file is located
      .then((response) => response.text())
      .then((text) => {
        const parsedMoves = parseMoves(text);
        setMoves(parsedMoves);
      });
  }, []);

  useEffect(() => {
    const board = Chessboard(boardRef.current, 'start');
    setBoard(board);

    // Clean up the board on unmount
    return () => {
      board.destroy();
    };
  }, []);

  const handleNextMove = () => {
    if (currentMove < moves.length) {
      board.move(moves[currentMove]);
      setCurrentMove(currentMove + 1);
      scrollToCurrentMove(currentMove + 1);
    }
  };

  const handlePrevMove = () => {
    if (currentMove > 0) {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);

      const newBoard = Chessboard(tempDiv, 'start');
      for (let i = 0; i < currentMove - 1; i++) {
        newBoard.move(moves[i]);
      }
      board.position(newBoard.fen());
      newBoard.destroy();
      document.body.removeChild(tempDiv);

      setCurrentMove(currentMove - 1);
      scrollToCurrentMove(currentMove - 1);
    }
  };

  const handleMoveClick = (moveIndex) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    const newBoard = Chessboard(tempDiv, 'start');
    for (let i = 0; i < moveIndex; i++) {
      newBoard.move(moves[i]);
    }
    board.position(newBoard.fen());
    newBoard.destroy();
    document.body.removeChild(tempDiv);

    setCurrentMove(moveIndex);
    scrollToCurrentMove(moveIndex);
  };

  const scrollToCurrentMove = (moveIndex) => {
    if (listRef.current) {
      const currentMoveElement = listRef.current.children[moveIndex];
      if (currentMoveElement) {
        currentMoveElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  };

  return (
    <div className="chess-container">
      <div className="chessboard-container">
        <div ref={boardRef} className="chessboard" />
        <div className="buttons">
          <button onClick={handlePrevMove}>&lt; Back</button>
          <button onClick={handleNextMove} style={{ marginLeft: '10px' }}>Next &gt;</button>
        </div>
      </div>
      <div className="moves-list-container">
        <ul ref={listRef} className="moves-list">
          {moves.map((move, index) => (
            <li
              key={index}
              onClick={() => handleMoveClick(index)}
              className={`move-item ${index === currentMove ? 'current-move' : ''}`}
            >
              {`${index + 1}. ${move}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChessComponent;
