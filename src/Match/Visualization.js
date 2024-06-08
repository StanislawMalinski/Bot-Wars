import React, { useEffect, useRef, useState } from 'react';
import './Visualization.scss';

export default function Visualization({ gameData, currentMove }) {
  const canvasRef = useRef(null);
  const [gameStateIndex, setGameStateIndex] = useState(0);
  useEffect(() => {
    setGameStateIndex(currentMove);
  }, [currentMove]);

  useEffect(() => {
    if (!gameData || !gameData.gameStates || gameData.gameStates.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cardWidth = 100;
    const cardHeight = 150;
    const margin = 20; // margin between cards
    const gameStates = gameData.gameStates;

    function drawCard(ctx, { liczba, kolor, x, y }) {
      try {
        ctx.fillStyle = kolor.toLowerCase();
        ctx.fillRect(x, y, cardWidth, cardHeight);
        ctx.strokeStyle = 'white'; 
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cardWidth, cardHeight);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(liczba, x + 45, y + 75);
      } catch (error) {
        console.error("Error drawing card:", error, { liczba, kolor, x, y });
      }
    }

    function drawGameState(gameState) {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!gameState.player1 || !gameState.player2 || !gameState.table) return;

        // Calculate starting positions for each row
        const startYPlayer1 = margin;
        const startYTable = startYPlayer1 + cardHeight + margin;
        const startYPlayer2 = startYTable + cardHeight + margin;

        // Draw player 1 cards
        gameState.player1.forEach((card, i) => {
          const [liczba, kolor] = card.split(' of ');
          drawCard(ctx, { liczba, kolor, x: margin + (cardWidth + margin) * i, y: startYPlayer1 });
        });

        // Draw table cards
        gameState.table.forEach((card, i) => {
          const [liczba, kolor] = card.split(' of ');
          drawCard(ctx, { liczba, kolor, x: margin + (cardWidth + margin) * i, y: startYTable });
        });

        // Draw player 2 cards
        gameState.player2.forEach((card, i) => {
          const [liczba, kolor] = card.split(' of ');
          drawCard(ctx, { liczba, kolor, x: margin + (cardWidth + margin) * i, y: startYPlayer2 });
        });
      } catch (error) {
        console.error("Error drawing game state:", error);
      }
    }

    drawGameState(gameStates[gameStateIndex]);
  }, [gameStateIndex, gameData]);

  if (!gameData || !gameData.gameStates || gameData.gameStates.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="visualization-container">
      <canvas id="myCanvas" ref={canvasRef} width="1500" height="600"></canvas>
      <div id="controls">
        <button onClick={() => setGameStateIndex(Math.max(0, gameStateIndex - 1))}>
          Poprzedni układ
        </button>
        <span id="counter">{gameStateIndex + 1} / {gameData.gameStates.length}</span>
        <button onClick={() => setGameStateIndex(Math.min(gameData.gameStates.length - 1, gameStateIndex + 1))}>
          Następny układ
        </button>
        <input
          type="number"
          id="moveNumber"
          min="1"
          max={gameData.gameStates.length}
          value={gameStateIndex + 1}
          onChange={(e) => setGameStateIndex(e.target.value - 1)}
        />
      </div>
    </div>
  );
}
