import './List.scss'
import './GamesList.scss'
import DeleteGameButton from './DeleteGameButton';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../User/store';
import React, { useState, useEffect } from "react";
import {GameService} from "../services/GameService";
import Paginator from '../elements/Paginator/Paginator';
function GamesList({setGameId, isAuthenticated, user, login, logout }) {
    const [gamesList, setGamesList] = useState([]);
    const [message, setMessage] = useState('');

    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    const handleGameClick = (gameId) => {
        setGameId(gameId);
    };

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const gl = await GameService.getListOfGames(page, 10);
                setGamesList(gl.data.data.page);
                setMaxPage(gl.data.data.amountOfPages)
            } catch (e) {
                setMessage('There was a problem with fetching game data.');
            }
        };

        fetchGameData();
    }, [page]); 

    return (
        <div className="game-list-container">
            <div className='game-list-container'>
                <div className="list">
                    <div className="menu-btns container-list">
                        <div className="item-list">
                            {isAuthenticated && user.role === 'Admin' && (
                                <div className="menu-btns list-element btn">
                                    <Link className="item-name add-btn color-primary-3" to="/games/add">Dodaj grę</Link>
                                </div>
                            )}
                            {gamesList.map((game, index) => (
                                <div key={index} className="menu-btns list-element btn">
                                    <button className="item-name color-primary-3 btn" onClick={() => handleGameClick(game.id)}>{game.gameFileName}</button>
                                    {isAuthenticated && user.role === 'Admin' && (
                                    <DeleteGameButton gameId={index} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Paginator pageCount={maxPage} currentPage={page} handlePageClick={setPage}/>
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
