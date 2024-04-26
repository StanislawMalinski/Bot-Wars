import './App.scss'
import User from "./User/User";
import {Link} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <div className="title">
                <h1>Bot-Wars</h1>
                <div className="login-btns">
                    <User isLoggedIn={false}/>
                </div>
            </div>
            <div className="menu-btns">
                <div className="menu-btn">
                    <Link to="index.html">
                        <button className="btn">Home</button>
                    </Link>
                </div>
                <div className="menu-btn">
                    <Link to="tournaments/home">
                        <button className="btn">Tournaments</button>
                    </Link>
                </div>
                <div className="menu-btn">
                    <Link to="games">
                        <button className="btn">Games</button>
                    </Link>
                </div>
                <div className="menu-btn">
                    <Link to="about">
                        <button className="btn">About</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default App
