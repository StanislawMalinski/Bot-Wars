// src/Tournaments/AddTournamentForm.js
import React, { useState } from 'react';
import './Form.scss';
import { connect } from 'react-redux';
import { login, logout } from '../User/store';
import {TournamentService} from "../services/TournamentService";


function AddTournamentForm({isAuthenticated, user, login, logout }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [gameType, setGameType] = useState('');
    const [playerLimit, setPlayerLimit] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');

    if (!isAuthenticated) {
        return <div>Resource not allowed </div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tournamentData = {
            title,
            description,
            gameType,
            playerLimit: parseInt(playerLimit, 10),
            date
        };

        try {
            const response = await TournamentService.addTournament(tournamentData);
            
            console.log(response);
            setMessage('Tournament added successfully');
        } catch (e) {
            console.error(e);
            setMessage('There was a problem with adding the tournament.');
        }
    };

    return (
        <div className="form">
            <h1>Add a new tournament</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        placeholder="Title (max 30 characters)"
                        id="title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength="30"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        placeholder="Description (max 200 characters)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        maxLength="200"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gameType">Game Type</label>
                    <select 
                        id="gameType" 
                        value={gameType}
                        onChange={e => setGameType(e.target.value)}
                    >
                    </select>
                </div>

                <div className="form-group short-input">
                    <label htmlFor="playerLimit">Player limit</label>
                    <input 
                        type="number" 
                        id="playerLimit" 
                        value={playerLimit}
                        onChange={e => setPlayerLimit(e.target.value)}
                    />
                </div>

                <div className="form-group short-input">
                    <label htmlFor="date">Tournament date</label>
                    <input 
                        type="date" 
                        id="date" 
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group short-input">
                    <label htmlFor="image">Image</label>
                    <input 
                        type="file" 
                        id="image"
                        accept=".jpg,.jpeg,.png"
                    />
                </div>

                <div className="form-group actions">
                    <button type="submit" className="submit">Add a tournament</button>
                    <button type="button" className="cancel">Cancel</button>
                </div>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  });
  
const mapDispatchToProps = {login,logout,};

export default connect(mapStateToProps, mapDispatchToProps)(AddTournamentForm);
