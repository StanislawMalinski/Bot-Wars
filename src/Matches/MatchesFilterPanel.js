

export default function MatchesFilterPanel({setTournamentId, setPlayerName, setMaxDate, setMinDate, setGameType}) {
    return (
        <div>
            <label htmlFor="tournamentId">Tournament Id</label>
            <input type="number" id="tournamentId" onChange={(e) => setTournamentId(e.target.value)} />
            <label htmlFor="playerName">Player Name</label>
            <input type="text" id="playerName" onChange={(e) => setPlayerName(e.target.value)} />
            <label htmlFor="maxDate">Max Date</label>
            <input type="date" id="maxDate" onChange={(e) => setMaxDate(e.target.value)} />
            <label htmlFor="minDate">Min Date</label>
            <input type="date" id="minDate" onChange={(e) => setMinDate(e.target.value)} />
            <label htmlFor="gameType">Game Type</label>
            <input type="text" id="gameType" onChange={(e) => setGameType(e.target.value)} />
        </div>
    );

}