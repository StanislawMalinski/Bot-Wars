import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import User from './User/User';
import './Navbar.scss';

function Navbar({ isAuthenticated, user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navbar">
            <div className="logo">
                <h1>Bot-Wars</h1>
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <div className="menu-btns">
                    <div className="menu-btn">
                        <Link to="/tournaments/home">
                            <button className="btn">Tournaments</button>
                        </Link>
                    </div>
                    <div className="menu-btn">
                        <Link to="/games">
                            <button className="btn">Games</button>
                        </Link>
                    </div>
                    <div className="menu-btn">
                        <Link to="/bots">
                            <button className="btn">Your bots</button>
                        </Link>
                    </div>
                    <div className="menu-btn">
                        <Link to="/about">
                            <button className="btn">About us</button>
                        </Link>
                    </div>
                    <div className="menu-btn">
                        <User isAuthenticated={isAuthenticated} user={user} />
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

export default Navbar;
