import './TournamentDetails.scss'
import { TournamentService } from '../services/TournamentService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../User/store';
function TournamentDetails({isAuthenticated, user, login, logout }) {

    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState(null);

    useEffect(() => {
        TournamentService.getTournament(tournamentId)
            .then((response) => {
                setTournament(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tournamentId]);

    console.log(tournamentId)
    // alert(tournament)

    return (<>{(!tournament || Object.keys(tournament).length === 0) ? <div>Tournament not found</div> :
        (<div className="tournamentWrapper">
            <p>Szczegóły Turnieju</p>
            <div className="tournamentDetails">
                <div className="details">
                    <p>Title: {tournament.tournamentTitle}</p>
                    <p>Creator: {tournament.creatorName}</p>
                    <p>Player limit: {tournament.playersLimit}</p>
                    <p>Planned on: {tournament.tournamentsDate}</p>
                    <p>Ograniczenia: {tournament.limitations}</p>
                    <p>Status: {tournament.status}</p>
                </div>
                {/* <img className="tournamentImage" src="" alt=""></img> */}
                <div className="tournamentImage"></div>
            </div>
            <p className="tournamentDescription">Description: {tournament.description}</p>
            {isAuthenticated ? (
                <button className="btn"><Link to={`/tournaments/edit/${tournament.id}`}>Edit Tournament</Link></button>
            ) : null}
        </div>)}
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  });
  
const mapDispatchToProps = {login,logout,};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
