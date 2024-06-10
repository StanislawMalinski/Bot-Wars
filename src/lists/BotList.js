import './TournamentList.scss';
import React, {useEffect, useState} from "react";
import {BotService} from "../services/BotService";
import {GameService} from "../services/GameService";
import {connect} from "react-redux";
import Paginator from "../elements/Paginator/Paginator";
import Navbar from "../Navbar";
import {Link} from "react-router-dom";

function BotList({user, isAuthenticated}) {
    const [bots, setBots] = useState([])
    const [pageCount, setPageCount] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [message, setMessage] = useState('');
    const pageSize = 8
    const [gameIdsToGames, setGameIdsToGames] = useState(new Map())

    useEffect(() => {
        (async () => {
            try {
                let bots
                const res = await BotService.getBotsForPlayer(user.name, pageSize, currentPage)
                bots = res.data.data.page
                setMessage('')
                const gameIds = [...new Set(bots.map(bot => bot.gameId))]
                console.log(gameIds)
                await Promise.all(gameIds.map(async (gameId) => {
                    const game = (await GameService.getGame(gameId)).data.data
                    console.log(game)
                    gameIdsToGames.set(gameId, game)
                }));
                setGameIdsToGames(gameIdsToGames)
                bots.forEach(bot => {
                    bot.game = gameIdsToGames.get(bot.gameId)
                })
                console.log(bots)
                setBots(bots)
            } catch (e) {
                setMessage('Failed to fetch the list of your bots')
            }
        })()
    }, [])

    const handlePageClick = (selectedObject) => {
        setCurrentPage(selectedObject.selected);
    };

    const handleBotDelete = (botId) => {

    }

    const BotItem = ({bot}) => {
        return (
            <div className="tournament-item">
                <div className="tournament-detail">{bot.game.gameFileName}</div>
                <button onClick={() => {handleBotDelete(bot.id)}}>Delete bot</button>
            </div>
        );
    }

    const BotHeader = ({bot}) => {
        return (
            <div className="tournament-item">
                <div className="tournament-detail">{bot.gameId}</div>
            </div>
        );
    }

    return (<>
            <Navbar isAuthenticated={isAuthenticated} user={user}></Navbar>
            {isAuthenticated ?
                <div className="tournaments-container">
                    <div className="tournaments-box">
                        <button className="btn">
                            <Link className="menu-btn" activeClassName="active" to="/bots/add">
                                Add a bot
                            </Link>
                        </button>
                        {bots.length > 0 ?
                            <div className="tournament-wrapper">
                                <h1>Your bots</h1>
                                <div className="tournament-headers">
                                    <BotHeader bot={{gameId: 'Game name'}}/>
                                </div>
                                <div className="tournaments-content">
                                    {bots.map(bot => (
                                        <div className="tournaments-table-row" key={bot.id}>
                                            <BotItem bot={bot}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            : <>There are no bots for given filters</>}
                        <Paginator pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick}/>
                    </div>
                    <p>{message}</p>
                </div>
                : <>
                    <h1>Log in to view your bots</h1>
                </>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user
});
export default connect(mapStateToProps)(BotList);
