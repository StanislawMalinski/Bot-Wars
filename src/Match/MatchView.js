import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UserButtons from '../User/UserButtons';
import { MatchesService } from '../services/MatchesService';
import MovesTable from './MovesTable';
import {MovesTableButtons} from './MovesTable';
import MatchOverView from './MatchOverView';
import Visualization from './Visualization';

import './MatchView.scss';
import { set } from 'date-fns';

function getLog(log) {
  let table = log.split('\n').map((x) => x.trim());
  const result = table[table.length - 1];
  table = table.slice(0, -2)
  const boardStates = [];
  const playerMoves = [];
  const playerHands = [];
  let currentPlayer = 0;
  let round, move;
  const output = {"rounds": [], "result": result};
  for (let i = 0; i < table.length; i++) {
    switch (i % 3) {
      case 0: // player side
        currentPlayer = parseInt(table[i]);
        output.rounds.push({"player": currentPlayer});
        break;
      case 1: // board state and player hand
        round = table[i].split('; Table:').map((x) => x.split(';').map((y) => y.trim()));
        boardStates.push(round[0]);
        round[1] = round[1].slice(0, -1);
        playerHands.push(round[1]);
        output.rounds[output.rounds.length - 1]["boardState"] = round[1];
        output.rounds[output.rounds.length - 1]["playerHand"] = round[0];
        break;
      case 2: // player move
        move = table[i].trim();
        if (move === 'fold') {
          move = ['fold'];
        } else {
          console.log(move);
          move = move.split(' ').map((x) => parseInt(x));
          move = [playerHands[playerHands.length - 1][move[1]], boardStates[boardStates.length - 1][move[0]]];
        }
        playerMoves.push(move); 
        output.rounds[output.rounds.length - 1]["playerMove"] = move;
        break;
    }
  }
  return output;
}

export default function MatchView() {
  const { id } = useParams();
  
  const [match, setMatch] = useState({});
  const [log, setLog] = useState({"rounds": [], "result": ""});
  const [gameData, setGameData] = useState({ gameStates: [] });
  const canvasRef = useRef(null);
  const [round, setRound] = useState(0);
  const setMove = function (value) {
    if (value == -2 || value >= log.rounds.length) setRound(log.rounds.length - 1);
    else setRound(Math.min(Math.max(value,0), log.rounds.length - 1));
    console.log("round: " + round);
  }

  useEffect(() => {
    MatchesService.getMatch(id).then((data) => {
      setMatch(data);
      console.log("match: " + match)
    }).catch((e) => {
      console.log(e);
    });

    MatchesService.getMatchLog(id).then((data) => {
      const parsedLog = getLog(data.log);
      setLog(parsedLog);
      setGameData({
        gameStates: parsedLog.rounds.map(round => ({
          player1: round.boardState,
          player2: round.playerHand,
          table: round.playerMove
        }))
      });
    }).catch((e) => {
      console.log(e);
    });
  }, [id]);

  return (
    <div>
      <div className="match-site"> 
        <MatchOverView match={match} />
        <div className="visualization">
          <Visualization gameData={gameData} curentRound={round} />
          <MovesTableButtons move={round} setMove={setMove}/>
        </div>
        <MovesTable log={log} scrollRef={canvasRef}/>
      </div>
    </div>
  );
} 
