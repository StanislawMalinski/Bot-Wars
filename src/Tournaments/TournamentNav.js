import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { login, logout } from '../User/store';
import { connect } from 'react-redux';
import User from "../User/User";
import '../Navbar.scss';

function TournamentNav({ isAuthenticated }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar">
            <NavLink exact to="/" className="logo-link">
                <div className="logo">
                    <h1>Bot-Wars</h1>
                </div>
            </NavLink>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <div className="menu-btns">
                    <div className="menu-btn">
                        <NavLink exact to="/tournaments/home" className={({ isActive }) => (isActive ? 'active-nav' : 'inactive')}>
                            <button className="btn">Tournaments</button>
                        </NavLink>
                    </div>
                    <div className="menu-btn">
                        <NavLink to="/tournaments/leaderboard" className={({ isActive }) => (isActive ? 'active-nav' : 'inactive')}>
                            <button className="btn">Leaderboard</button>
                        </NavLink>
                    </div>
                    <div className="menu-btn">
                        <NavLink to="/tournaments/help" className={({ isActive }) => (isActive ? 'active-nav' : 'inactive')}>
                            <button className="btn">Help</button>
                        </NavLink>
                    </div>
                    <div className="menu-btn">
                        <NavLink exact to="/matches/" className={({ isActive }) => (isActive ? 'active-nav' : 'inactive')}>
                            <button className="btn">Matches</button>
                        </NavLink>
                    </div>
                    <div className="menu-btn">
                        <User isAuthenticated={isAuthenticated} />
                    </div>
                </div>
            </nav>
            <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3"></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(TournamentNav);
