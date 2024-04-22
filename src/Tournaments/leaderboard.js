import React, { useState, useEffect } from "react";
import {PointsService} from "../services/PointsService";
import './leaderboard.scss'
function Leaderboard({isAuthenticated, user, login, logout }) {

    const [leaderboardsList, setLeaderboardsList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLeaderboardsData = async () => {
            try {
                const gl = await PointsService.getLeaderboards();
                setLeaderboardsList(gl.data.data);
            } catch (e) {
                setMessage('There was a problem with fetching leaderboards data.');
            }
        };

        fetchLeaderboardsData();
    }, []); 

    return (
        <>
            <div className="list">
                <h1 className="heading">Leaderboard</h1>
                <div className="standings">
                <div className="leaderboard-item">
                                <div className="color-primary-3">Rank</div><div className="color-primary-3">Player </div><div className="color-primary-3">Elo</div><div className="color-primary-3">Bots created</div>
                            </div>
                {leaderboardsList.map((player, index) => (
                            <div key={index} className="leaderboard-item">
                                <div className="color-primary-3">{index+1} </div><div className="color-primary-3">{player.login} </div><div className="color-primary-3">{player.points}</div><div className="color-primary-3">{index+1}</div>
                            </div>
                        ))}
            </div></div>
            <p>{message}</p>
        </>
    );
}

export default Leaderboard;
