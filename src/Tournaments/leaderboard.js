import React, { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom';
import {PointsService} from "../services/PointsService";
import Paginator from '../elements/Paginator/Paginator';
import './leaderboard.scss'
import { UserService } from "../services/UserService";
function Leaderboard({isAuthenticated, user, login, logout }) {
    const navigate = useNavigate();
    const [leaderboardsList, setLeaderboardsList] = useState([]);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState({selected: 0});
    const [pageCount, setPageCount] = useState(1);
    const pageSize = 10;

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchLeaderboardsData = async () => {
            try {
                const gl = await PointsService.getLeaderboards(page.selected, pageSize);
                console.log(gl.data.data.page);
                setLeaderboardsList(gl.data.data.page);
                setPageCount(gl.data.data.amountOfPages);
            } catch (e) {
                setMessage('There was a problem with fetching leaderboards data.');
            }
        };

        fetchLeaderboardsData();
    }, [page]); 

    const handlePlayerClick = (player) => {
        return () => {navigate(`/player/${player}`)};   
    }

    useEffect(() => {
        if (search === '') {
            setSearchResults([]);
            return;
        }
        UserService.searchPlayersByName(search, 0, 8)
            .then((response) => {
                console.log(response);
                setSearchResults(response.data.data);
            })
            .catch((error) => {
                setMessage('There was a problem with fetching search results.');
            });
        }, [search]);

    return (
        <>
            <div className="leaderboard-view">
                <div className="leaderboard-list">
                    <h1 className="heading">Leaderboard</h1>
                    <div className="leaderboard-container">
                        <table className="standings">
                            <thead>
                                <tr className="leaderboard-item">
                                    <th className="rankcol header column">Rank</th>
                                    <th className="playercol header column">Player</th>
                                    <th className="elocol header column">Elo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardsList.map((player, index) => (
                                    <tr key={index} 
                                        className="leaderboard-item"
                                        onClick={handlePlayerClick(player.login)}>
                                        <td className="rankcol element column">{page.selected*pageSize + index+1}</td>
                                        <td className="playercol element column">{player.login}</td>
                                        <td className="elocol element column">{player.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Paginator pageCount={pageCount} handlePageClick={setPage}/>
                </div>
                <div className="player-browser">
                    <h1 className="heading">Search for a player</h1>
                    <input type="text" placeholder="Search for a player" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <div className="search-results">
                        <table className="search-results">
                            <thead>
                                <th className="playercol header column">Player</th>
                                <th className="elocol header column">Elo</th>
                            </thead>
                            <tbody>
                            {searchResults.map((player, index) => (
                                <tr key={index}
                                    className="search-result"
                                    onClick={handlePlayerClick(player.login)}>
                                    <td className="playercol element column">{player.login}</td>
                                    <td className="elocol element column">{player.point}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p>{message}</p>
            </div>
        </>
    );
}

export default Leaderboard;
