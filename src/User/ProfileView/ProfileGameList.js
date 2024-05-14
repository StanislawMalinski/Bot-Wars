import React, { useEffect, useState } from 'react';
import {UserService } from '../../services/UserService';
import {useNavigate} from 'react-router-dom';

import './ProfileGameList.scss';

import notAvailableIcon from '../../resources/cross.svg';

export default function ProfileGameList({ user }) {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        UserService.getGamesForPlayer(user.id).then((response) => {
            console.log(response);
            setGames(response.data.data);
            console.log(games);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [user.id]);

    const handleGameElementClick = (gameId) => {
        return () => navigate(`/games/details/${gameId}`);
    };

    return (
        <div className="user-info-table">
            <div className="user-info-table-content">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                <>
                {games.map((game, index) => (
                        <div className={`${(index % 2) ? 'light' : 'dark'} game-list-element-container`}
                            key={game.id}
                            onClick={handleGameElementClick(game.id)}>
                            <p className="game-list-element-name">
                                {game.gameFileName}
                            </p>
                            <p className="game-list-element-date">
                                {game.lastModificatiosn}
                            </p>
                            <div className="game-list-element-availability">
                                {game.isAvailableForPlay || (
                                    <img className="not-available-icon" src={notAvailableIcon} alt="Not available" />
                                )}
                            </div>
                        </div>
                    ))}
                </>)}
            </div>
        </div>
    );
}
