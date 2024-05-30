import React from 'react';
import { connect } from 'react-redux';
import TournamentNav from './TournamentNav';
import Leaderboard from "./leaderboard";

function TournamentsLeaderboard({ isAuthenticated, user }) {
    return (
        <div className="tournaments-container">
            <TournamentNav />
            <Leaderboard></Leaderboard>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
});

export default connect(mapStateToProps)(TournamentsLeaderboard);
