import './TournamentDetails.scss'
import { TournamentService } from '../services/TournamentService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../User/store';
import UserButtons from '../User/UserButtons';
import TournamentBotList from './TournamentBotList';
import TournamentCountDown from './TournamentCountDown';

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
        (<>
            <UserButtons/>
            <div className="tournamentWrapper">
                <div className="col1">
                    <div className="tournamentOverview">
                        <div className="tournamentOverviewInfo">
                            <p>Creator: {tournament.creatorName}</p>
                            <p>Player limit: {tournament.playersLimit}</p>
                            <p>Planned on: {tournament.tournamentsDate}</p>
                            <p>Ograniczenia: {tournament.limitations}</p>
                            <p>Status: {tournament.status}</p>
                        </div>
                        {tournament.image &&
                            <div className='tournamentOverviewImage'>
                                <img src={tournament.image} alt="tournament"></img>
                            </div>}
                        <div className="tournamentOverviewDescription">
                            <p>Description: {tournament.description}</p>
                        </div>
                    </div>
                </div>
                <div className="col2">
                    <div className="tournamentTitle">
                        <h1>{tournament.tournamentTitle}</h1>
                    </div>
                    <TournamentCountDown date={tournament.tournamentsDate} />
                    <TournamentBotList botList={tournament.playersBots} />
                </div>
            </div>
        </>)}
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  });
  
const mapDispatchToProps = {login,logout,};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
