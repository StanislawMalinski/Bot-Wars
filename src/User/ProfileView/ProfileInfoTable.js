import { useEffect, useState } from "react";
import {GetPointsHistoryForPlayer} from "../../services/Api";
import {XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line  } from 'recharts';

function StatsTable(props) {
    return (
        <table>
            <tr>
                <th>Wins</th>
                <th>Losses</th>
                <th>Draws</th>
            </tr>
            <tr>
                <td>{props.wins}</td>
                <td>{props.losses}</td>
                <td>{props.draws}</td>
            </tr>
        </table>
    );
}

function RatingTable(props) {
    const [history, setHistory] = useState([{id: 0, logDate: "", points: 0, playerId: 0}]);
    
    useEffect(() => {
        setHistory(GetPointsHistoryForPlayer(props.playerid)["data"]);
    }, [props.playerid]);

    const chart = 
        <LineChart data={history} width={1000} height={300}>
            <CartesianGrid />
            <Tooltip />
            <XAxis dataKey="logDate" />
            <YAxis dataKey="rating"  />
            <Line type="linear" dataKey="rating" stroke="#01FF00" fill="#01FF00" /> 
        </LineChart>;

        console.log(history);

    return (
        <>
        {chart}
        </>
    );
}

function BotsTable(props) {
    return (
        <table>
            <tr>
                <th>Bots</th>
            </tr>
            <tr>
                <td>{props.bots}</td>
            </tr>
        </table>
    );
}

function GamesAddedTable(props) {
    return (
        <table>
            <tr>
                <th>Games Added</th>
            </tr>
            <tr>
                <td>{props.games}</td>
            </tr>
        </table>
    );
}

function TournamentsPlayedTable(props) {
    return (
        <table>
            <tr>
                <th>Tournaments Played</th>
            </tr>
            <tr>
                <td>{props.tournaments}</td>
            </tr>
        </table>
    );
}

function changeState(newState) {
    switch (newState) {
        case "stats":
            return <StatsTable wins={10} losses={5} draws={3} />;
        case "rating":
            return <RatingTable/>;
        case "bots":
            return <BotsTable bots={5} />;
        case "games":
            return <GamesAddedTable games={5} />;
        case "tournaments":
            return <TournamentsPlayedTable tournaments={5} />;
        default:
            return null;
    }
}

function ProfileInfoTable(props) {
    const { state } = props;
    const [content, setContent] = useState(null);
    useEffect(() => {
        const con = changeState(state);
        setContent(con);
    }, [state]);

    return (<>
        <div className="user-info-table">
            <div className="user-info-table-content">
                {content}
            </div>
        </div>
    </>);
}

export default ProfileInfoTable;