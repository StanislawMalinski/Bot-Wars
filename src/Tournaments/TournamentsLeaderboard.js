import TournamentNav from './TournamentNav';
import { connect } from 'react-redux';
import UserButtons from "../User/UserButtons";
import Leaderboard from "./leaderboard";

function TournamentsLeaderboard({ tournaments, isAuthenticated }) {
    return (
        <div className="tournaments-container">
            <UserButtons></UserButtons>
            <TournamentNav />
            <Leaderboard></Leaderboard>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(TournamentsLeaderboard);
