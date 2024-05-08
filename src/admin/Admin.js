import './../App.scss'
import './admin.scss'
import {AdminService} from "../services/AdminService";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
function Admin() {
    const [message, setMessage] = useState(true);
    const [banId, setBanId] = useState('');
    const [unbanId, setUnbanId] = useState('');

    const handleSubmitBan = async (e) => {
        e.preventDefault();

        try {
             await AdminService.banPlayer(banId)
            setMessage('Ban succesful.')
        } catch (e) {
            setMessage('There was a problem with banning player.')
        }
    };
    const handleSubmitUnban = async (e) => {
        e.preventDefault();

        try {
            await AdminService.unbanPlayer(unbanId)
            setMessage('Unban succesful.')
        } catch (e) {
            setMessage('There was a problem with unbanning player.')
        }
    };
    return (
        <div className="app">
            <h1>Admin</h1>
            <div className="menu-btns admin">
                <div className="menu-btn">
                    <Link to="/admin/PlayerBots">
                        <button className="btn">Player Bots</button>
                    </Link>
                </div>
                <div className="menu-btn">
                    <Link to="/admin/PlayerGames">
                        <button className="btn">Player Games</button>
                    </Link>
                </div>
                <div className="menu-btn">
                    <Link to="/admin/PlayerTournaments">
                        <button className="btn">Player Tournaments</button>
                    </Link>
                </div>
            </div>
            <div className="ban-container">
                <div className="ban-form">
                    <form onSubmit={handleSubmitBan}>
                    <label htmlFor="username">Player to ban</label>
                                <input
                                    type="text"
                                    id="username"
                                    onChange={(e) => setBanId(e.target.value)}
                                    placeholder="Enter username to ban"
                                    maxLength="30"
                                />
                                <button type="submit" className="submit">Ban</button>
                    </form>
                </div>
                <div className="ban-form">
                    <form onSubmit={handleSubmitUnban}>
                    <label htmlFor="username">Player to unban</label>
                                <input
                                    type="text"
                                    id="username"
                                    onChange={(e) => setUnbanId(e.target.value)}
                                    placeholder="Enter username to unban"
                                    maxLength="30"
                                />
                                <button type="submit" className="submit">Unban</button>
                    </form>
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
}

export default Admin;
