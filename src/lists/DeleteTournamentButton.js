import React from 'react';
import {TournamentService} from "../services/TournamentService";


function DeleteTournamentButton({tournamentId,onDeleteSuccess}) {
  const handleClick = async (event, tournamentId) => {
    event.stopPropagation();
    try {
      await TournamentService.deleteTournament(tournamentId);
      onDeleteSuccess();
    } catch (e) {
        console.log(e);
    }
  };
  return (
      <div className="del-btn color-primary-3" onClick={(e) => handleClick(e, tournamentId)}>Delete</div>    );

}

export default DeleteTournamentButton;