import './TournamentDetails.scss'
import {getListOfTournaments} from './getListOfTournaments';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login, logout} from '../User/store';
import {TournamentService} from "../services/TournamentService";
import React, {useEffect, useState} from "react";
import {Buffer} from "buffer";

function TournamentDetails({isAuthenticated, user, login, logout}) {

    const {tournamentId} = useParams();
    const [tournament, setTournament] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        TournamentService.getTournament(tournamentId)
            .then((response) => {
                    setTournament(response.data.data);
                }
            ).catch((error) => {
            setMessage('Error loading tournaments');
        });
    }, []);

    console.log(tournament);
    if (!tournament) {
        return <div>Tournament not found</div>;
    }

    // alert(tournament)

    return (
        <div className="tournamentWrapper">
            <p>Tournament details</p>
            <div className="tournamentDetails">
                <div className="details">
                    <p>Name: {tournament.tournamentTitle}</p>
                    <p>Current amount of competitors: {tournament.playersBots?.length}</p>
                    <p>Max amount of competitors: {tournament.playersLimit}</p>
                    <p>Tournament date: {tournament.tournamentsDate}</p>
                    <p>Limitations: {tournament.constraints}</p>
                    <p>Status: {tournament.status}</p>
                    <p>Game type: {tournament.gameName}</p>
                </div>
{/*
                <div className="tournamentImage">
                    <img className='profile-image' src={`data:image/jpeg;base64,${tournament.image}`} alt='tournament image'/>
                </div>
*/}
            </div>
            <p className="tournamentDescription">Description: {tournament.description}</p>
            {isAuthenticated ? (
                <button className="btn"><Link to={`/tournaments/edit/${tournament.id}`}>Edit Tournament</Link></button>
            ) : null}
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
});

const mapDispatchToProps = {login, logout,};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
