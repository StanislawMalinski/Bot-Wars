import './TournamentList.scss';
import DeleteTournamentButton from './DeleteTournamentButton';
import TournamentNav from '../Tournaments/TournamentNav';
import UserButtons from '../User/UserButtons';
import {Link, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { TournamentService } from "../services/TournamentService";
import React, { useState, useEffect } from "react";
import Paginator from "../elements/Paginator/Paginator"

function TournamentsList({ tournaments, isAuthenticated }) {
    const tournamentsPerPage = 3;
    const navigate = useNavigate();
    const [filteredTournaments, setFilteredTournaments] = useState([]);
    const [allTournaments, setAllTournaments] = useState([]);
    const [tournamentTitle, setTournamentTitle] = useState('');
    const [minPlayOutDate, setMinPlayOutDate] = useState('');
    const [maxPlayOutDate, setMaxPlayOutDate] = useState('');
    const [creator, setCreator] = useState('');
    const [userParticipation, setUserParticipation] = useState('');
    const [message, setMessage] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        console.log("CP: "+ currentPage + " TPP: " + tournamentsPerPage)
        TournamentService.getFilteredTournaments(currentPage, tournamentsPerPage, {})
            .then((response) => {
                setAllTournaments(response.data.data.page);
                setPageCount(response.data.data.amountOfPages)
                console.log(currentPage)
            }).catch((error) => {            
                setMessage('Error loading tournaments');
            });
    }, [currentPage]);

    const handleTournamentClick = (tournamentId) => {
        navigate(`/tournaments/details/${tournamentId}`);
    };

    const TournamentItem = ({ tournament }) => (
        <div className="tournament-item" onClick={() => handleTournamentClick(tournament.id)}>
            <div className="tournament-detail">{tournament.tournamentTitle}</div>
            <div className="tournament-detail">{tournament.author}</div>
            <div className="tournament-detail">{tournament.tournamentsDate}</div>
            <div className="tournament-detail">{tournament.wasPlayedOut ? "finished" : "to be played"}</div>
        </div>
    );

    const constructObject = () => {
        const data = {
            tournamentTitle,
            minPlayOutDate,
            maxPlayOutDate,
            creator,
            userParticipation
        };

        Object.keys(data).forEach(key => {
            if (data[key] === undefined || data[key] === '') {
                delete data[key];
            }
        });

        return data;
    };
    const handlePageClick = (selectedObject) => {
        setCurrentPage(selectedObject.selected);
    };
    const filterTournaments = async (e) => {
        e.preventDefault();
        const body = constructObject();
        TournamentService.getFilteredTournaments(currentPage, tournamentsPerPage, body)
        .then((response) => {
            setFilteredTournaments(response.data.data.page);
            setPageCount(response.data.data.amountOfPages);
            }).catch((error) => {
                setMessage('Error loading tournaments');
        });
    }
    
    return (
        <div className="tournaments-container">
            <UserButtons/>
            <TournamentNav/>
            <div className="tournaments-box">
            {isAuthenticated && (
            <Link className="menu-btn" activeClassName="active" to="/tournaments/add">
                <button className="btn">Add Your Tournament</button>
            </Link>
            )}
            <div className="tournaments-form-container">
                <form onSubmit={filterTournaments}>
                    <h2>Filter tournaments</h2>
                    <div className="tournaments-form">
                        <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            onChange={(e) => setTournamentTitle(e.target.value)}
                            placeholder="Enter tournament title"
                            maxLength="30"
                        /></div>
                        <div><label htmlFor="minDate">From date</label>
                        <input
                            type="date"
                            id="minDate"
                            onChange={(e) => setMinPlayOutDate(e.target.value)}
                            placeholder="Enter from date"
                            maxLength="30"
                        /></div>
                        <div><label htmlFor="maxDate">To date</label>
                        <input
                            type="date"
                            id="maxDate"
                            onChange={(e) => setMaxPlayOutDate(e.target.value)}
                            placeholder="Enter to date"
                            maxLength="30"
                        /></div>
                        <div><label htmlFor="creator">Creator</label>
                        <input
                            type="text"
                            id="creator"
                            onChange={(e) => setCreator(e.target.value)}
                            placeholder="Enter creator username"
                            maxLength="30"
                        /></div>
                        <div><label htmlFor="partcipating">Partcipating user</label>
                        <input
                            type="text"
                            id="partcipating"
                            onChange={(e) => setUserParticipation(e.target.value)}
                            placeholder="Enter username of partcipating user"
                            maxLength="30"
                        /></div>
                        <button type="submit" className="submit">Filter</button>
                        </div>
                    </form>
                </div>
                {filteredTournaments.length < 1 &&  allTournaments.length > 0 ?
                <div className="tournament-wrapper">
                    <h1>Past Tournaments</h1>
                    <div className="tournament-headers">
                        <span className="header-detail">Name</span>
                        <span className="header-detail">Author</span>
                        <span className="header-detail">Date</span>
                        <span className="header-detail">Status</span>
                    </div>
                    <div className="tournaments-content">
                    {isAuthenticated ?
                    allTournaments.map(tournament => (
                        <div key={tournament.id}>
                            <TournamentItem key={tournament.id} tournament={tournament} />
                            <DeleteTournamentButton tournamentId={tournament.id} />
                        </div>
                    )) 
                    : 
                    allTournaments.map(tournament => (
                        <TournamentItem key={tournament.id} tournament={tournament} />
                    ))}
                </div>
                </div>
                : filteredTournaments.length > 0 ? 
                <div className="tournament-wrapper">
                    <h1>Past Tournaments</h1>
                    <div className="tournament-headers">
                        <span className="header-detail">Name</span>
                        <span className="header-detail">Author</span>
                        <span className="header-detail">Date</span>
                        <span className="header-detail">Status</span>
                    </div>
                    <div className="tournaments-content">
                    {isAuthenticated ?
                    filteredTournaments.map(tournament => (
                        <div key={tournament.id}>
                            <TournamentItem key={tournament.id} tournament={tournament} />
                            <DeleteTournamentButton tournamentId={tournament.id} />
                        </div>
                    )) 
                    : 
                    filteredTournaments.map(tournament => (
                        <TournamentItem key={tournament.id} tournament={tournament} />
                    ))}
                </div>
                </div>
                :<>There was an error fetching data</>}
                <Paginator pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            <p>{message}</p>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(TournamentsList);
