import React, { useState } from 'react';
import GameList from '../lists/GamesList';
import GameDetails from './GameDetails';

import './GamesView.scss';

export default function GamesView() {
    const [gameId, setGameId] = useState(-1);
    return (
        <>
            <h1>Games</h1>
            <div className="games-container">
                <div className="game-list-container">
                    <GameList setGameId={setGameId}/>
                </div>
                <div className="game-details-container">
                    <GameDetails gameId={gameId}/>
                </div>
            </div>
        </>
    )
}