import "./MatchesList.css";
import {useNavigate} from 'react-router-dom';

export default function MatchesList({matchList}) {
    const navigate = useNavigate();
    const handleTournamentClick = (matchId) => {
        return () => navigate(`/match/${matchId}`);
    };

    const handleMatchChecked = (matchId) => {
        return () => navigate(`/match/${matchId}`);
    }

    return <>
        <div className='match-list-container'>
        {matchList.map((match) => (
            <div className='match-list-element' key={match.id}>
                <div className='match-list-element-container'>
                    <input type="checkbox" onChange={handleMatchChecked(match.id)} />
                    <div className='match-list-element-title' onClick={handleTournamentClick(match.id)} >{match.tournamentName}</div>
                    <div className='match-list-element-info-container'>
                        <div className='match-list-element-info'>{match.players.join(', ')}</div>
                        <div className='match-list-element-info'>{match.gameType}</div>
                        <div className='match-list-element-info'>{match.date}</div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        </>
}