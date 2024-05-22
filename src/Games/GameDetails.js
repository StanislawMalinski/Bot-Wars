import { useEffect, useState } from "react";
import {GameService} from "../services/GameService";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import './GameDetails.scss'

function GameDetails() {

    const { gameId } = useParams();
    const [game, setGame] = useState('');
    const [message, setMessage] = useState('');
    const [date,setDate] = useState([]);
    const [file, setFile] = useState();

    useEffect(() => {
        const fetchGameData = async () => {
            let gr
            try {
                gr = await GameService.getGame(gameId);
                setGame(gr.data.data);
            } catch (e) {
                setMessage('There was a problem with fetching match data.');
            }
            try {
                console.log(game.gameFileName)
                const date = formatTimestamp(gr.data.data.lastModification);
                setDate(date);
                console.log()
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
    console.log(file)
    return (
        message.length === 0 ?
        <>
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
                        <span><p className="bold-text">modification</p></span>
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
                </div>
                <div className="font-bold">
                    {file ? 'łuuuuuuuuuuuu': 'no file'}
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



