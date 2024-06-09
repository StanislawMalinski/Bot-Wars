import './AddGameForm.scss'
import './Form.scss'
import React, {useState, useRef} from "react";
import {GameService} from "../services/GameService";

function AddGameForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [message, setMessage] = useState(true);

    const fileInput = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const file = fileInput.current.files[0];
        const body = new FormData();
        body.append('BotFile', file);

        try {
            console.log(name, description)
            await GameService.addGameType(10, name, description, "string", true)
            setMessage('Game added succesfully')
        } catch (e) {
            setMessage('There was a problem with adding game.')
        }
    };

    const onUploadFile = (e) => {
        console.log(e.target.value)
        setFile(e.target.value)
    }

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
                            maxLength="200"
                            ref={fileInput}
                        />

                        <p style={{
                            color: "#0BE400",
                            fontSize: "16px"
                        }}>
                            The main game program must be a file containing raw code ending with a appropriate file
                            extension (.py .java .c).<br></br>
                        </p>
                    </div>
                    <div className="form-group short-input">
                        <label htmlFor="files">Game files</label>
                        <input
                            type="file"
                            id="files"
                            accept=".py,.java,.c"
                            onChange={onUploadFile}
                        />
                    </div>

                    <div className="form-group actions">
                        <button type="submit" className="submit">Add game</button>
                        <button type="button" className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default AddGameForm