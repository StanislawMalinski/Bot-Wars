import { useParams } from 'react-router-dom';
import UserButtons from '../User/UserButtons';
import { useEffect, useState } from 'react';
import { MatchesService } from '../services/MatchesService';
import MatchesList from './MatchesList';
import MatchesFilterPanel from './MatchesFilterPanel';
import './MatchesSearch.css';

export default function MatchesSearch() {
  const { tournamentid, playername, maxdate, mindate, gametype } = useParams();
  
  const [tournamentId, setTournamentId] = useState(parseInt(tournamentid) ? parseInt(tournamentid) : null);
  const [playerName, setPlayerName] = useState(playername ? playername : null);
  const [maxDate, setMaxDate] = useState(maxdate ? new Date(maxdate) : null);
  const [minDate, setMinDate] = useState(mindate ? new Date(mindate) : null);
  const [gameType, setGameType] = useState(gametype ? gametype : null);

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    MatchesService.getMatches(1, 10, tournamentId, maxDate, minDate, gameType).then((data) => {
      setMatches(data);
    }).catch((e) => {
      console.log(e);
    });
  }, [tournamentId, playerName, maxDate, minDate, gameType]);

  return (
    <div>
      <UserButtons />
      <h1>Matches</h1>
      <div className="matches-list-container">
        <MatchesFilterPanel setTournamentId={setTournamentId} setPlayerName={setPlayerName} setMaxDate={setMaxDate} setMinDate={setMinDate} setGameType={setGameType} />
        <MatchesList matchList={matches} />
      </div>
    </div>
  );
}