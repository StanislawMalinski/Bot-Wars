import "./MatchesList.scss";
import {useNavigate} from 'react-router-dom';
import Paginator from '../elements/Paginator/Paginator';

export default function MatchesList({matchList, maxPage, pageClickHandle}) {
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
                    <div className='match-list-element-title-checkbox'>
                        <input type="checkbox" onChange={handleMatchChecked(match.id)} />
                        <div className='match-list-element-title' onClick={handleTournamentClick(match.id)} >{match.tournamentName}</div>
                    </div>
                    <div className='match-list-element-info-container'>
                        <div className='match-list-element-info'>{match.playersBots.map(e => e.userName).join(', ')}</div>
                        <div className='match-list-element-info'>{match.gameName}</div>
                        <div className='match-list-element-info'>{match.playedOutDate}</div>
                    </div>
                </div>
            </div>
        ))}
        <Paginator pageCount={maxPage} handlePageClick={pageClickHandle}/>
        </div>
        </>
}