import '../App.scss';
import './UserButtons.scss';
import logoutIcon from '../resources/logout.svg';
import userIcon from '../resources/user.svg';
import settingsIcon from '../resources/settings.svg';
import { connect } from 'react-redux';
import { login, logout } from './store';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

function User({ isAuthenticated, user, login, logout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userInfoRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const userInfoElement = userInfoRef.current;
        const handleMouseEnter = () => {
            userInfoElement.classList.add('hover');
        };
        const handleMouseLeave = () => {
            userInfoElement.classList.remove('hover');
        };
        if (userInfoElement) {
            userInfoElement.addEventListener('mouseenter', handleMouseEnter);
            userInfoElement.addEventListener('mouseleave', handleMouseLeave);
        }
        return () => {
            if (userInfoElement) {
                userInfoElement.removeEventListener('mouseenter', handleMouseEnter);
                userInfoElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <>
            {isAuthenticated ? (
                <div className="user-profile" onClick={toggleMenu}>
                    <div ref={userInfoRef} className="user-info">
                        <span className="user-name">username</span>
                        <svg
                            className={`arrow-icon ${isMenuOpen ? 'open' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <g>
                                <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                                <polygon points="12 12.586 8.707 9.293 7.293 10.707 12 15.414 16.707 10.707 15.293 9.293 12 12.586"/>
                            </g>
                        </svg>
                    </div>
                    <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                        <Link to="/settings" className="dropdown-item">
                            <img className="dropdown-icon" src={settingsIcon} alt="Settings" />
                            Settings
                        </Link>
                        <Link to={`/player/${user.id}`} className="dropdown-item">
                            <img className="dropdown-icon" src={userIcon} alt="Profile" />
                            User Profile
                        </Link>
                        <Link to="/" className="dropdown-item" onClick={logout}>
                            <img className="dropdown-icon" src={logoutIcon} alt="Logout" />
                            Logout
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <Link to="/login">
                        <button className="login-btn">Log In</button>
                    </Link>
                    <Link to="/register">
                        <button className="signup-btn">Sign Up</button>
                    </Link>
                </>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
});

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(User);
