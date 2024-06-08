import { useParams } from 'react-router-dom';
import TournamentNav from '../Tournaments/TournamentNav';
import { useEffect, useState } from 'react';
import { MatchesService } from '../services/MatchesService';
import MatchesList from './MatchesList';
import MatchesFilterPanel from './MatchesFilterPanel';
import './MatchesSearch.scss';

export default function MatchesSearch({isAuthenticated}) {
  const [filter, setFilter] = useState({});
  const [matches, setMatches] = useState([]);

  const [page, setPage] = useState({selected: 0});
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (filter.minPlayOutDate === '') {
      filter.minPlayOutDate = new Date(1).toISOString();
    }
    MatchesService.getMatches(page.selected, 10, filter).then((data) => {
      console.log(data);
      setMatches(data.data.page);
      setMaxPage(data.data.amountOfPages);
    }).catch((e) => {
      console.log(e);
    });
  }, [filter, page]);

  return (
    <div>
      <TournamentNav isAuthenticated={isAuthenticated}/>
      <h1>Matches</h1>
      <div className="matches-list-container">
        <MatchesFilterPanel triggerFilter={setFilter} />
        <MatchesList matchList={matches} maxPage={maxPage} pageClickHandle={setPage} />
      </div>
    </div>
  );
}