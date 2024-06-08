import './AddGameForm.scss'
import './Form.scss'
import './LoginRegisterGameForm.scss'
import React, {useState} from "react";
import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await UserService.loginUser(email, password)
            navigate("/")
        } catch (e) {
            setMessage('Invalid credentials.')
        }
    };

    return (
        <div>
            <div className="form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            minLength="2" // change (just for development)
                            required
                        />

                    </div>
                    <div className="form-group actions">
                        <button type="submit" className="submit">Login</button>

                        <button onClick={() => navigate("/")} type="button" className="cancel">Cancel</button>
                    </div>
                </form>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default RegisterForm
