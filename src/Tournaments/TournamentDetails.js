import './TournamentDetails.scss'
import {getListOfTournaments} from './getListOfTournaments';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login, logout} from '../User/store';
import {TournamentService} from "../services/TournamentService";
import React, {useEffect, useState} from "react";
import {Buffer} from "buffer";
import Ladder from "../elements/Ladder/Ladder";

function TournamentDetails({isAuthenticated, user, login, logout}) {

    const {tournamentId} = useParams();
    const [tournament, setTournament] = useState([]);
    const [message, setMessage] = useState('');

    const ladder = [
        {"matchId":1,"PlayersBots":[{"BotId":8,"BotFile":"Back_jackbot_8","UserName":"emma_jenkins"},{"BotId":5,"BotFile":"Back_jackbot_5","UserName":"sam_wilson"}],"Status":"Resolve","Winner":5,"Position":4,"PlayedOutDate":"2024-06-10T09:32:46.4116135","MatchResult":"Won"},
        {"matchId":2,"PlayersBots":[{"BotId":7,"BotFile":"Back_jackbot_7","UserName":"david_miller"},{"BotId":1,"BotFile":"Back_jackbot_1","UserName":"john_doe"}],"Status":"Resolve","Winner":7,"Position":3,"PlayedOutDate":"2024-06-10T09:32:47.7387294","MatchResult":"Won"},
        {"matchId":3,"PlayersBots":[{"BotId":9,"BotFile":"Back_jackbot_9","UserName":"ryan_clark"},{"BotId":2,"BotFile":"Back_jackbot_2","UserName":"jane_smith"}],"Status":"Resolve","Winner":2,"Position":5,"PlayedOutDate":"2024-06-10T09:32:47.5846803","MatchResult":"Won"},
        {"matchId":4,"PlayersBots":[{"BotId":6,"BotFile":"Back_jackbot_6","UserName":"olivia_brown"},{"BotId":2,"BotFile":"Back_jackbot_2","UserName":"jane_smith"}],"Status":"Resolve","Winner":2,"Position":2,"PlayedOutDate":"2024-06-10T09:32:56.4706626","MatchResult":"Won"},
        {"matchId":5,"PlayersBots":[{"BotId":5,"BotFile":"Back_jackbot_5","UserName":"sam_wilson"},{"BotId":7,"BotFile":"Back_jackbot_7","UserName":"david_miller"}],"Status":"Resolve","Winner":7,"Position":1,"PlayedOutDate":"2024-06-10T09:32:55.2517037","MatchResult":"Won"},
        {"matchId":6,"PlayersBots":[{"BotId":2,"BotFile":"Back_jackbot_2","UserName":"jane_smith"},{"BotId":7,"BotFile":"Back_jackbot_7","UserName":"david_miller"}],"Status":"Resolve","Winner":7,"Position":0,"PlayedOutDate":"2024-06-10T09:33:05.4557752","MatchResult":"Won"}
    ]

    useEffect(() => {
        // Create a WebSocket instance
        const socket = new WebSocket(`ws://10.242.93.198:8080/tournamentWs/${tournamentId}`);

        // Event listeners
        socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
        });

        socket.addEventListener('message', (event) => {
            console.log('Received message from server:', event.data);
            // setLadder(JSON.parse(event.data));
            // Perform actions based on the received data
        });

        socket.addEventListener('close', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Clean up on unmount
        return () => {
            if (socket.readyState === 1) { // <-- This is important
                socket.close();
            }
        }
    }, []);
    useEffect(() => {
        TournamentService.getTournament(tournamentId)
            .then((response) => {
                    setTournament(response.data.data);
                }
            ).catch((error) => {
            setMessage('Error loading tournaments');
        });
    }, []);

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
            {console.log(ladder)}
        <Ladder status={ladder}/>

        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
});

const mapDispatchToProps = {login, logout,};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
