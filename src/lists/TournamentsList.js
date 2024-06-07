import './TournamentList.scss';
import DeleteTournamentButton from './DeleteTournamentButton';
import TournamentNav from '../Tournaments/TournamentNav';
import {Link, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import React, {useState} from "react";
import Paginator from "../elements/Paginator/Paginator"
import TournamentFilterForm from '../forms/TournamentFilterForm';

function TournamentsList({tournaments, isAuthenticated, user}) {
  const tournamentsPerPage = 8;
  const navigate = useNavigate();
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [message, setMessage] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const tournamentFilterFormRef = React.useRef();

  const handleTournamentClick = (tournamentId) => {
    navigate(`/tournaments/details/${tournamentId}`);
  };

  const handlePageClick = (selectedObject) => {
    setCurrentPage(selectedObject.selected);
  };

  const handleDeleteSuccess = () => {
    tournamentFilterFormRef.current.filterTournaments();
  };

  const TournamentItem = ({tournament}) => (
    <div className="tournament-item" onClick={() => handleTournamentClick(tournament.id)}>
      <div className="tournament-detail">{tournament.tournamentTitle}</div>
      <div className="tournament-detail">{tournament.creatorName}</div>
      <div className="tournament-detail">{tournament.tournamentsDate}</div>
      <div className="tournament-detail">{tournament.status}</div>
      {isAuthenticated && user.role === "Admin" ?
        <DeleteTournamentButton tournamentId={tournament.id} onDeleteSuccess={handleDeleteSuccess}/>
        : <></>}
    </div>
  );

  return (<>
    <TournamentNav/>
    <div className="tournaments-container">
      <TournamentFilterForm
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        tournamentsPerPage={tournamentsPerPage}
        setFilteredTournaments={setFilteredTournaments}
        setPageCount={setPageCount}
        setMessage={setMessage}
        ref = {tournamentFilterFormRef}
      />
      <div></div>
      <div className="tournaments-box">
        {isAuthenticated && (
          <button className="btn">
            <Link className="menu-btn" activeClassName="active" to="/tournaments/add">
            Add Your Tournament
            </Link>
          </button>
        )}
        {filteredTournaments.length > 0 ?
          <div className="tournament-wrapper">
            <h1>Tournaments</h1>
            <div className="tournament-headers">
              <span className="header-detail">Name</span>
              <span className="header-detail">Author</span>
              <span className="header-detail">Date</span>
              <span className="header-detail">Status</span>
              {isAuthenticated && user.role === "Admin" ?
                <span className="header-detail">Delete</span>
                : <></>}
            </div>
            <div className="tournaments-content">
              {filteredTournaments.map(tournament => (
                <div className="tournaments-table-row" key={tournament.id}>
                  <TournamentItem key={tournament.id} tournament={tournament}/>
                </div>
              ))}
            </div>
          </div>
          : <>There are no tournaments for given filters</>}
        <Paginator pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick}/>
      </div>
      <p>{message}</p>
    </div>
    </> 
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps)(TournamentsList);