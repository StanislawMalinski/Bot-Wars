import React from 'react';
import {TournamentService} from "../services/TournamentService";


class DeleteTournamentButton extends React.Component {
  handleClick = async (tournamentId) => {
    try {
      console.log('usuwamy gre o id: ' + tournamentId)
      const response = await TournamentService.deleteTournament(tournamentId);
      console.log(response)
    } catch (e) {
        console.log(e);
    }
  };

  render() {
    return (
        <div className="del-btn color-primary-3" onClick={() => this.handleClick(this.props.tournamentId)}>Delete</div>    );
  }
}

export default DeleteTournamentButton;