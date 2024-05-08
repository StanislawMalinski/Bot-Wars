import './../lists/List.scss'
// import DeleteGameButton from './DeleteGameButton';
import { connect } from 'react-redux';
import { login, logout } from '../User/store';
import React, { useState } from "react";
import {GameService} from "../services/GameService";
function PlayerGames({ isAuthenticated, user, login, logout }) {

    const [username, setUsername] = useState('');
    const [gamesList, setGamesList] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const gl = await GameService.getAllForPlayer(username);
            setGamesList(gl.data.data);
        } catch (e) {
            setMessage('There was a problem with fetching game data.');
        }
    };

    return (
        <div className="list">
            <h1>Player Games</h1>
            <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />

                    </div>

                    
                    <div className="form-group actions">
                        <button type="submit" className="submit">Check player</button>
                    </div>
                </form>
            <div className="menu-btns container-list">
                <div className="item-list">
                    {gamesList.map((game, index) => (
                        <div key={index} className="menu-btns list-element btn">
                            <button className="item-name color-primary-3 btn">{game.gameFileName}</button>
                            {/* <DeleteGameButton gameId={index} /> */}
                        </div>
                    ))}
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  });
  
const mapDispatchToProps = {login,logout,};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerGames);



            
