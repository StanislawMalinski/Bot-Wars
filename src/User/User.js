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
          <button>
          <Link to="login">
              Login
          </Link>
          </button>

          <button>
          <Link to="register">
            Register
          </Link>
          </button>
          <button onClick={() => login({ username: 'exampleUser' })}>
            test
          </button>
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