import '../App.scss'
import { connect } from 'react-redux';
import { login, logout } from './store';
import {Link} from "react-router-dom";

function User({ isAuthenticated, user, login, logout }) {
    return (
        <>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
        <>
          <Link to="/login">
              <button className="login-btn">Login</button>
          </Link>
          <Link to="/register">
              <button className="login-btn">Register</button>
          </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(User);