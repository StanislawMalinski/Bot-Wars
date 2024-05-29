
import './TournamentBotList.scss';
/*
    {
        "botId": 1,
        "botFile": "quake3_bot_1",
        "userName": "john_doe"
    }
*/

export default function TournamentBotList({botList}) {
    return (
        <>
            <div className="tournamentBotListContainer">
                <div className="tournamentBotList">
                {botList.map((bot, index) => (
                    <div key={bot.botId} className={`${index % 2 ? 'light' : 'dark'} tournamentBot`}>
                        <p>{bot.userName}</p>
                        <p>{bot.botFile}</p>
                    </div>
                ))}
                </div>
            </div>
        </>
    )

}