import './TournamentList.scss';
import DeleteTournamentButton from './DeleteTournamentButton';
import TournamentNav from '../Tournaments/TournamentNav';
import UserButtons from '../User/UserButtons';
import {Link, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { TournamentService } from "../services/TournamentService";
import React, { useState, useEffect, useMemo } from "react";

function TournamentsList({ tournaments, isAuthenticated }) {
    const navigate = useNavigate();
    const currentDate = new Date();
    const [upcomingTournaments, setUpcomingTournaments] = useState([]);
    const [pastTournaments, setPastTournaments] = useState([]);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        TournamentService.getFilteredTournaments(0, 10, {minPlayOutDate: currentDate.toISOString()})
            .then((response) => {
                setUpcomingTournaments(response.data.data);
            }).catch((error) => {
                setMessage('Error loading tournaments');
            });
        TournamentService.getFilteredTournaments(0, 10, {maxPlayOutDate: currentDate.toISOString()})
            .then((response) => {
                setPastTournaments(response.data.data);
            }).catch((error) => {
                setMessage('Error loading tournaments');
            });
    }, [currentDate]);

    const handleTournamentClick = (tournamentId) => {
        navigate(`/tournaments/details/${tournamentId}`);
    };

    const TournamentItem = ({ tournament }) => (
        <div className="tournament-item" onClick={() => handleTournamentClick(tournament.id)}>
            <div className="tournament-detail">{tournament.tournamentTitle}</div>
            <div className="tournament-detail">{tournament.author}</div>
            <div className="tournament-detail">{tournament.tournamentsDate}</div>
            <div className="tournament-detail">{tournament.playersLimit}</div>
        </div>
    );

    return (
        <div className="tournaments-container">
            <UserButtons/>
            <TournamentNav/>
            <div className="tournaments-box">
                <h1>Upcoming Tournaments</h1>
                {isAuthenticated && (
                        <Link className="menu-btn" activeClassName="active" to="/tournaments/add">
                            <button className="btn">Add Your Tournament</button>
                        </Link>
                    )}
                <div className="tournament-headers">
                    <span className="header-detail">Name</span>
                    <span className="header-detail">Author</span>
                    <span className="header-detail">Date</span>
                    <span className="header-detail">Action</span>
                </div>
                <div className="tournaments-content">
                    {isAuthenticated ?
                    upcomingTournaments.map(tournament => (
                        <div key={tournament.id}>
                            <TournamentItem key={tournament.id} tournament={tournament} />
                            <DeleteTournamentButton tournamentId={tournament.id} />
                        </div>
                    )) 
                    : 
                    upcomingTournaments.map(tournament => (
                        <TournamentItem key={tournament.id} tournament={tournament} />
                    ))}
                </div>
                <h1>Past Tournaments</h1>
                <div className="tournament-headers">
                    <span className="header-detail">Name</span>
                    <span className="header-detail">Author</span>
                    <span className="header-detail">Date</span>
                    <span className="header-detail">Action</span>
                </div>
                <div className="tournaments-content">
                    {pastTournaments.map(tournament => (
                        <TournamentItem key={tournament.id} tournament={tournament} />
                    ))}
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(TournamentsList);
