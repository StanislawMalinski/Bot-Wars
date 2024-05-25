import './TournamentDetails.scss'
import { getListOfTournaments } from './getListOfTournaments';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../User/store';
import { useEffect } from "react";

function TournamentDetails({isAuthenticated, user, login, logout }) {
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000/ws'); // to be replaced with the actual WS endpoint address

        socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
        });

        socket.addEventListener('message', (event) => {
            console.log('Received message from server:', event.data);
            // Perform actions based on the received data
        });

        socket.addEventListener('close', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Clean up on unmount
        return () => {
            socket.close();
        };
    }, []);
    const { tournamentId } = useParams();
    const tournament = getListOfTournaments().find(t => t.id === parseInt(tournamentId));

    if (!tournament) {
        return <div>Tournament not found</div>;
    }
    
    return (
        <div className="tournamentWrapper">
            <p>Szczegóły Turnieju</p>
            <div className="tournamentDetails">
                <div className="details">
                    <p>Nazwa: {tournament.name}</p>
                    <p>Liczba uczestników: {tournament.participantsAmount}</p>
                    <p>Max liczba uczestników: {tournament.maxParticipants}</p>
                    <p>Data: {tournament.date}</p>
                    <p>Ograniczenia: {tournament.limitations}</p>
                    <p>Status: {tournament.state}</p>
                </div>
                {/* <img className="tournamentImage" src="" alt=""></img> */}
                <div className="tournamentImage"></div>
            </div>
            <p className="tournamentDescription">Opis: {tournament.description}</p>
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
  
const mapDispatchToProps = {login,logout,};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
