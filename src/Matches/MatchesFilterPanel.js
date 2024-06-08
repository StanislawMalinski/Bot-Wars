import React, { useEffect, useState } from 'react';
import { GameService } from '../services/GameService';
import { UserService } from '../services/UserService';
import { TournamentService } from '../services/TournamentService';
import './MatchesFilterPanel.scss';
import { set } from 'date-fns';

export default function MatchesFilterPanel({triggerFilter}) {
    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');

    const [gameName, setGameName] = useState('');
    const [games, setGames] = useState([]);
    const [gameType, setGameType] = useState({});

    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState({});

    const [tournamentName, setTournamentName] = useState('');
    const [tournaments, setTournaments] = useState([]);
    const [tournament, setTournament] = useState({});

    const composeAndTriggerFilter = () => {
        const filter = {};
        if (tournament !== null || tournamentName !== '') {
            filter.tournamentName = tournamentName;
        }
        if (player !== null || playerName !== '') {
            filter.userParticipation = playerName;
        }
        if (gameType !== null || gameName !== '') {
            filter.gameName = gameName;
        }
        if (maxDate !== null || minDate !== null) {
            filter.maxPlayOutDate = maxDate;
        }
        if (minDate !== null || minDate !== null) {
            filter.minPlayOutDate = minDate;
        }
        triggerFilter ? triggerFilter(filter) : console.log(filter);
    }

    useEffect(() => {
        if (gameName === '' || gameName === gameType.gameFileName) {
            setGames([]);
            return;
        }
        GameService.getByName(gameName, 0, 5)
        .then((response) => {
            setGames(response.data.data.page);
        })
        .catch((error) => {
            console.log(error);
        })}, [gameName, gameType]);

    useEffect(() => {
        if (playerName === '' || playerName === player.login) {
            setPlayers([]);
            return;
        }
        UserService.searchPlayersByName(playerName, 0, 5)
        .then((response) => {
            setPlayers(response.data.data);
        }).catch((error) => {
            console.log(error);
        })}, [playerName, player]);

    useEffect(() => {
        if (tournamentName === '' || tournamentName === tournament.tournamentTitle) {
            setTournaments([]);
            return;
        }
        TournamentService.getByName(tournamentName, 0, 5)
        .then((response) => {
            setTournaments(response.data.data.page);
        }).catch((error) => {
            console.log(error);
        })}, [tournamentName, tournament]);

    const gameClickHandler = (game) => {
        return () => {
            setGameType(game);
            setGameName(game.gameFileName);
        }
    }

    const playerClickHandler = (player) => {
        return () => {
            setPlayer(player);
            setPlayerName(player.login);
        }
    }

    const tournamentClickHandler = (tournament) => {
        return () => {
            setTournament(tournament);
            setTournamentName(tournament.tournamentTitle);
        }
    }

    return (
        <div className='matches-search-filter-panel'>
            <label htmlFor="tournamentId">Tournament</label>
            <input type="text" id="tournament" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} />
            <div className='tournaments-list-container'>
                <div className='tournaments-list'>
                    {tournaments.map((tournament) => (
                        <div className='tournaments-list-element' onClick={tournamentClickHandler(tournament)}>
                            {tournament.tournamentTitle}
                        </div>))}
                </div>
            </div>
            <label htmlFor="playerName">Player Name</label>
            <input type="text" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <div className='players-list-container'>
                <div className='players-list'>
                    {players.map((player) => (
                        <div className='players-list-element' onClick={playerClickHandler(player)}>
                            {player.login}
                        </div>))}
                </div>
            </div>
            <label htmlFor="maxDate">Max Date</label>
            <input type="date" id="maxDate" onChange={(e) => setMaxDate(e.target.value)} />
            <label htmlFor="minDate">Min Date</label>
            <input type="date" id="minDate" onChange={(e) => setMinDate(e.target.value)} />
            <label htmlFor="gameType">Game</label>
            <input type="text" id="gameType" value={gameName} onChange={(e) => setGameName(e.target.value)} />
            <div className='games-list-container'>
                <div className='games-list'>
                    {games.map((game) => (
                        <div className='games-list-element' onClick={gameClickHandler(game)}>
                            {game.gameFileName}
                        </div>))}
                </div>
            </div>
            <button onClick={composeAndTriggerFilter}>Filter</button>
        </div>
    );

}