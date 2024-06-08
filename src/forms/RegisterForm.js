import './AddGameForm.scss'
import './Form.scss'
import './LoginRegisterGameForm.scss'
import React, {useState} from "react";
import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [message, setMessage] = useState(true);

    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === repeatPassword);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.registerUser(name, email, password)
            await UserService.loginUser(email, password)
            navigate("/")
        } catch (e) {
            setMessage('There was a problem with the registration.')
        }
    };

    return (
        <div>
            <div className="login-register-game-form">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your username"
                            maxLength="30"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            minLength="2" // change (just for development)
                            required
                        />

                    </div>

                    <div className="form-group ">
                        <label htmlFor="repeatPassword">Repeat password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                            placeholder="Repeat your password"
                            required
                        />

                    </div>

                    {!passwordsMatch && <p style={{color: 'red'}}>Passwords do not match</p>}

                    <div className="form-group actions">
                        {passwordsMatch && <button type="submit" className="submit">Register</button>}

                        <button type="button" className="cancel" onClick={() => navigate("/")}>Cancel</button>
                    </div>
                </form>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default RegisterForm