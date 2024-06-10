import React, { useEffect, useState, useRef } from 'react';
import { GameService } from '../services/GameService';
import { BotService } from '../services/BotService';
import './AddBotForm.scss';
import './Form.scss'

export default function AddBotForm({setMessage}) {
    if (setMessage === undefined) {
        setMessage = (e) => {console.log(e)};
    }
    const [gamePage, setGamePage] = useState([{gameFileName: ''}]);
    const fileInput = useRef(null);

    const [game, setGame] = useState({});
    const [gameName, setGameName] = useState('');
    const [botLanguage, setBotLanguage] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        if (fileInput.current.files.length === 0) {
            setMessage('Please select a file');
            return;
        }
        if (game.id === undefined) {
            setMessage('Please select a game');
            return;
        }

        const file = fileInput.current.files[0];
        const body = new FormData();
        body.append('BotFile', file);
        BotService.addBot(game.id, 0, body).then((response) => {
            setMessage('Bot added successfully');
        }).catch((error) => {
            console.log(error);
            setMessage('Failed to add bot');
        });
    }

    const selectGame = (game) => {
        return () => {
            setGame(game);
            setGameName(game.gameFileName);
            console.log(game);
        }
    }

    useEffect(() => {
        if (gameName.trim() === '') {
            setGamePage([{gameFileName: ''}]);
            return;
        }
        if (gameName.trim() === game.gameFileName) {
            setGamePage([{gameFileName: ''}]);
            return;
        }
        GameService.getByName(gameName, 0, 5)
        .then((response) => {
            console.log(response.data.data.page);
            setGamePage(response.data.data.page);
        })
        .catch((error) => {
            console.log(error);
        })}, [gameName]);

    const setLanguage = () => {
        return () => {
            const file = fileInput.current.files[0];
            if (file === undefined) {
                return;
            }
            const name = file.name;
            const extension = name.split('.').pop();

            switch (extension) {
                case 'cpp':
                    setBotLanguage('C++');
                    break;
                case 'py':
                    setBotLanguage('Python');
                    break;
                case 'java':
                    setBotLanguage('Java');
                    break;
                default:
                    setBotLanguage('Unknown');
                    break;
            }
        }
    }


    return ( <>
        <div className="AddBotForm">
            <div className="form">
                <h1>Add a bot</h1>
                <form onSubmit={submitForm}>
                    <div className="form-group short-input">
                        <label htmlFor="file">Bot:</label>
                        <input type="file" id="file" name="file" ref={fileInput} accept=".cpp,.py,.java" onChange={setLanguage()}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bot-language-label">Bot language:</label>
                        <p className="bot-language">
                            {botLanguage}
                        </p>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="game">Game:</label>
                        <input type="text" placeholder="Game name" value={gameName} onChange={(e) => setGameName(e.target.value)}></input>
                    </div>
                    { gameName.trim() !== '' &&
                      <div className="game-options-container">
                        <div className="game-options">
                            {gamePage.map((game) => {
                                return <div key={game.id} className="game-option" onClick={selectGame(game)}>{game.gameFileName}</div>
                            })}
                        </div>
                      </div>
                    }
                    <div className="form-group actions">
                        <button type="submit" className={"submit"}>Add bot</button>
                    </div>
                </form>
            </div>
        </div>
    </>);
}
