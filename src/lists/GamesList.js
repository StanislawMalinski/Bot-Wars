import './List.scss'
import DeleteGameButton from './DeleteGameButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../User/store';
import React, { useState, useEffect } from "react";
import {GameService} from "../services/GameService";
function GamesList({games, isAuthenticated, user, login, logout }) {

    const [gamesList, setGamesList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const gl = await GameService.getListOfGames();
                setGamesList(gl.data.data);
            } catch (e) {
                setMessage('There was a problem with fetching game data.');
            }
        };

        fetchGameData();
    }, []); 

    return (
        <div className="list">
            <h1>Games</h1>
            <div className="menu-btns container-list">
                <div className="item-list">
                    {isAuthenticated && user.role === 'Admin' && (
                        <div className="menu-btns list-element btn">
                            <Link className="item-name add-btn color-primary-3" to="/games/add">Dodaj grę</Link>
                        </div>
                    )}
                    {gamesList.map((game, index) => (
                        <div key={index} className="menu-btns list-element btn">
                            <button className="item-name color-primary-3 btn">{game.gameFileName}</button>
                          {isAuthenticated && user.role === 'Admin' && (
                            <DeleteGameButton gameId={index} />
                          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
