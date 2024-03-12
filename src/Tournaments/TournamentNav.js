import './TournamentNav.scss';
import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { login, logout } from '../User/actions';
import { connect } from 'react-redux';


function TournamentNav({ isAuthenticated }) {
    return (
        <>
            <div className="user-info-strip">
                <div className="userData">
                    <Link to="/">  <span className="username">Username</span> </Link>
                    <span className="score">1234</span>
                </div>
                <div className="icons">
                    {/* <i className="icon-settings"></i> */}
                    <span className="score">set</span>
                </div>
            </div>
            <nav className="tournament-nav">
                <NavLink exact className="menu-btn" activeClassName="active" to="/tournaments/home">
                    <button className="btn">Tournaments</button>
                </NavLink>
                <NavLink className="menu-btn" activeClassName="active" to="/tournaments/leaderboard">
                    <button className="btn">Leaderboard</button>
                </NavLink>
                <NavLink className="menu-btn" activeClassName="active" to="/tournaments/help">
                    <button className="btn">Help</button>
                </NavLink>
                <NavLink exact className="menu-btn" activeClassName="active" to="/">
                    <button className="btn">Home</button>
                </NavLink>
            </nav>
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = { login, logout, };

export default connect(mapStateToProps, mapDispatchToProps)(TournamentNav);
