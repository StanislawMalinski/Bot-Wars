import './AddGameForm.scss'
import './Form.scss'
import React, {useState} from "react";
import {GameService} from "../services/GameService";

function AddGameForm({isAuthenticated, user, login, logout}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [setFile] = useState('');
    const [message, setMessage] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(name,description)
            await GameService.addGameType(10,name,description,"string",true)
            setMessage('Game added succesfully')
        } catch (e) {
            setMessage('There was a problem with adding game.')
        }
    };

    return (
        <div className="add-game-form">
            <div className="form">
                <h1>Add a new type of game</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Name:</label>
                        <input
                            type="text"
                            id="title"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength="30"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Game description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength="200"
                        />
                    </div>

                    <div className="form-group short-input">
                        <label htmlFor="files">Game files</label>
                        <input
                            type="file"
                            id="files"
                            accept=".zip"
                            onChange={e => setFile(e.target.value)}
                        />
                    </div>

                    <div className="form-group actions">
                        <button type="submit" className="submit">Add game</button>
                        <button type="button" className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
            <div className={"text-below-form"}>
                <p className="color-primary-3">
                    Here you can add a new type of a Bot Wars game to the system.<br></br>
                    Following game files must be in the zip archive:<br></br>
                    <ul>
                        <li>The main game program must be a valid Linux executable and must be named: <i>game</i></li>
                        <li>File defining game interface for bots, named: <i>interface</i></li>
                        <li>Text file defining possible numbers of players containing a list of numbers
                            separated by commas, named: <i>interface</i></li>
                    </ul>
                </p>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default AddGameForm