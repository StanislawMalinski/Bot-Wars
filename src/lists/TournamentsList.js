import './TournamentList.scss';
import DeleteTournamentButton from './DeleteTournamentButton';
import TournamentNav from '../Tournaments/TournamentNav';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TournamentService } from "../services/TournamentService";
import React, { useState, useEffect } from "react";



function TournamentsList({ tournaments, isAuthenticated }) {
    const navigate = useNavigate();
    const currentDate = new Date();

    const [tournamentList, setTournamentList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTournamentData = async () => {
            try {
                const gl = await TournamentService.getListOfTournaments();
                setTournamentList(gl.data.data);
            } catch (e) {
                console.log(e);
                setMessage('Sorry, there was a problem with fetching tournament data.Try again later');
            }
        };

        fetchTournamentData();
    }, []);

    const upcomingTournaments = tournamentList.filter(t => {
        const tournamentDate = new Date(t.tournamentsDate);
        return tournamentDate > currentDate;
    });
    const pastTournaments = tournamentList.filter(t => {
        const tournamentDate = new Date(t.tournamentsDate);
        return tournamentDate <= currentDate;
    });;

    const TournamentItem = ({ tournament }) => (
        <div className="tournament-item" onClick={() => handleTournamentClick(tournament.id)}>
            <div className="tournament-detail">{tournament.tournamentsTitle}</div>
            <div className="tournament-detail">{tournament.author}</div>
            <div className="tournament-detail">{tournament.tournamentsDate}</div>
            <div className="tournament-detail">{tournament.playersLimit}</div>
        </div>
    );

    const handleTournamentClick = (tournamentId) => {
        navigate(`/tournaments/details/${tournamentId}`);
    };

    return (
        <div className="tournaments-container">

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
                    {upcomingTournaments.map(tournament => (
                        <div>
                        <TournamentItem key={tournament.id} tournament={tournament} />
                        <DeleteTournamentButton key={tournament.id} />
                        </div>
                    ))}

                    {upcomingTournaments.map(tournament => (
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
