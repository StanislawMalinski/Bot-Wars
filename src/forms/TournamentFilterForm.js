import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {TournamentService} from "../services/TournamentService";
import './TournamentFilterForm.scss';

const TournamentFilterForm = forwardRef(function TournamentFilterForm({
                                               currentPage,
                                               setCurrentPage,
                                               tournamentsPerPage,
                                               setFilteredTournaments,
                                               setPageCount,
                                               setMessage
                                             }, ref) {
  const [tournamentTitle, setTournamentTitle] = useState('');
  const [minPlayOutDate, setMinPlayOutDate] = useState(new Date(0));
  const [maxPlayOutDate, setMaxPlayOutDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 10)));
  const [creator, setCreator] = useState('');
  const [userParticipation, setUserParticipation] = useState('');

  const filterTournaments = async (e) => {
    if (e) {
      e.preventDefault()
    }
    const body = constructObject();
    TournamentService.getFilteredTournaments(currentPage, tournamentsPerPage, body)
      .then((response) => {
        setPageCount(response.data.data.amountOfPages);
        setFilteredTournaments(response.data.data.page);
        if (response.data.data.amountOfPages < currentPage) {
          setCurrentPage(0);
        }
      }).catch((error) => {
      setMessage('Error loading tournaments');
    });
  }

  useEffect(() => {
    filterTournaments();
  }, [currentPage]);

  useImperativeHandle(ref, () => ({
    filterTournaments
  }));

  const constructObject = () => {
    const data = {
      tournamentTitle,
      minPlayOutDate,
      maxPlayOutDate,
      creator,
      userParticipation
    };

    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        data[key] = '';
      }
    });

    return data;
  }

  const handleClearClick = (selectedObject) => {
    setUserParticipation('');
    setCreator('');
    setMaxPlayOutDate(new Date(new Date(new Date().setFullYear(new Date().getFullYear() + 10))));
    setMinPlayOutDate(new Date(0));
    setTournamentTitle('');
  };

  return (
    <div className="tournaments-form-container">
      <form onSubmit={filterTournaments}>
        <h2>Filter tournaments</h2>
        <div className="tournaments-form">
          <div className="tournaments-form-wrapper">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={tournamentTitle}
              onChange={(e) => setTournamentTitle(e.target.value)}
              placeholder="Enter tournament title"
              maxLength="30"
            />
          </div>
          <div className="tournaments-form-wrapper">
            <label htmlFor="minDate">From date</label>
            <input
              type="date"
              id="minDate"
              value={minPlayOutDate}
              onChange={(e) => setMinPlayOutDate(e.target.value)}
              placeholder="Enter from date"
              maxLength="30"
            />
          </div>
          <div className="tournaments-form-wrapper">
            <label htmlFor="maxDate">To date</label>
            <input
              type="date"
              id="maxDate"
              value={maxPlayOutDate}
              onChange={(e) => setMaxPlayOutDate(e.target.value)}
              placeholder="Enter to date"
              maxLength="30"
            />
          </div>
          <div className="tournaments-form-wrapper">
            <label htmlFor="creator">Creator</label>
            <input
              type="text"
              id="creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder="Enter creator username"
              maxLength="30"
            />
          </div>
          <div className="tournaments-form-wrapper">
            <label htmlFor="partcipating">Participant</label>
            <input
              type="text"
              id="partcipating"
              value={userParticipation}
              onChange={(e) => setUserParticipation(e.target.value)}
              placeholder="Enter username of partcipating user"
              maxLength="30"
            />
          </div>
          <div className="tournaments-form-button-container">
            <button type="submit" className="submit">Filter</button>
            <button onClick={handleClearClick}>Clear</button>
          </div>
        </div>
      </form>
    </div>
  )
})

export default TournamentFilterForm