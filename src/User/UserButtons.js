import '../App.scss'
import './UserButtons.scss';
import logoutIcon from '../resources/logout.svg';
import userIcon from '../resources/user.svg';
import settingsIcon from '../resources/settings.svg';
import { connect } from 'react-redux';
import { login, logout } from './actions';
import {Link} from "react-router-dom";

function UserButtons({ isAuthenticated, user, login, logout }) {
    //takie chwilowe bo nie ma jak z bakcu pobrać loginu i elo bo oba są querowane po player_id którego nie mamy, issue do omówienia na spotkaniu
    const huj = '{'
    const huj1 = '}'
    return (
        <>
        {isAuthenticated ? (
        <div className="user-bar">
          <div>{huj}Login{huj1} {huj}Elo{huj1}</div>
          <div className="user-buttons-container">
            <Link to="/settings">
                <img className="user-button setting-button" src={settingsIcon} alt="S"></img>
            </Link>
            <Link to="/player/1">
                <img className="user-button" src={userIcon} alt="U"></img>
            </Link>
            <Link to="/">
                <img className="user-button" src={logoutIcon} alt="U" onClick={logout}></img>
            </Link>
          </div>
        </div>
        ) : (
        <>
        
        </>
        )}
        </>
    );
  }

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  });
  
const mapDispatchToProps = {login,logout,};

export default connect(mapStateToProps, mapDispatchToProps)(UserButtons);