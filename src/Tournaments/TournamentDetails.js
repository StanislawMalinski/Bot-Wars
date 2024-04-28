import './TournamentDetails.scss'
import { getListOfTournaments } from './getListOfTournaments';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../User/store';
function TournamentDetails({isAuthenticated, user, login, logout }) {

    const { tournamentId } = useParams();
    const tournament = getListOfTournaments().find(t => t.id === parseInt(tournamentId));

    if (!tournament) {
        return <div>Tournament not found</div>;
    }
    
    // alert(tournament)

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
