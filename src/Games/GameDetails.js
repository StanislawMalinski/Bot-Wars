import { useEffect, useState } from "react";
import {GameService} from "../services/GameService";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import './GameDetails.scss'

function GameDetails({gameId}) {
    const [game, setGame] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState([]);
    const [file, setFile] = useState();

    const [download, setDownload] = useState('');

    useEffect(() => {
        const fetchGameData = async () => {
            let gr
            setMessage('');
            if (gameId === -1) {
                setMessage('Select game to see it\'s details.')
                return;
            }
            try {
                gr = await GameService.getGame(gameId);
                setGame(gr.data.data);
            } catch (e) {
                setMessage('There was a problem with fetching match data.');
            }
            try {
                const date = formatTimestamp(gr.data.data.lastModification);
                setDate(date);
            } catch (e) {
                console.log('There was a problem with fetching date.');
            }
            try {
                const gf = await GameService.getGameFile(gr.data.data.fileId);
                setFile(gf.data.data);
            } catch (e) {
                console.log('There was a problem with fetching files.');
            }
        };

        fetchGameData();
    },[gameId, game.gameFileName]);
    

    function formatTimestamp(timestamp) {
        try {
            const normalizedTimestamp = timestamp.replace(/\.\d{3,}/, match => match.slice(0, 4));
            const date = new Date(normalizedTimestamp);

            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
        
            return [format(date, 'yyyy-MM-dd'), format(date, 'HH:mm:ss')];
        } catch (error) {
            console.error("Error formatting timestamp:", error);
            return ["", ""];
        }
    }

    const onButtonClick = () => {
        GameService.getGameFile(game.id)
            .then((response) => {
                console.log(response)
            });
        };
    
    return (
        message.length === 0 ?
        <>
            <div className="game-info-container-scroll">
                <div className="game-info-container">
                    <h1>{game.gameFileName}</h1>
                    <div className="article-content bold-text">
                        <p>{game.interfaceDefinition}</p>
                    </div>
                    <div className="article-content">
                        <p>{game.gameInstructions}</p>
                    </div>
                    <div className="game-info-table article-content">
                        <div className="game-info-col">
                            <p className="bold-text">modification</p>
                            <p>{date[0]}</p>
                            <p>{date[1]}</p>
                        </div>
                        <div className="game-info-col">
                            <span><p className="bold-text">players</p></span>
                            <p>{game.numbersOfPlayer}</p>
                        </div>
                        <div className="game-info-col">
                            <span><p className="bold-text">available</p></span>
                            <p>{game.isAvailableForPlay ? "Yes" : "no"}</p>
                        </div>
                        <div className="font-bold">
                            <button onClick={onButtonClick}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>:<>
            <div className="font-bold error-message">
                <p>{message}</p>
            </div>
        </>
    );
}

export default GameDetails;



