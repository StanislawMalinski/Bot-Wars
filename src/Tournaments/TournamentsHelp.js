import TournamentNav from './TournamentNav';
import { connect } from 'react-redux';

function TournamentsHelp({ tournaments, isAuthenticated }) {
    return (
        <div className="tournaments-container">

            <TournamentNav /> 

            <h1>HELP</h1>            
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(TournamentsHelp);
