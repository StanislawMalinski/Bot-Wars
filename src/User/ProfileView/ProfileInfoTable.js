import { useEffect, useState } from "react";
import {PointsService} from "../../services/PointsService";
import {XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line  } from 'recharts';


function RatingTable(props) {
    const [history, setHistory] = useState([{id: 0, logDate: "", points: 0, playerId: 0}]);
    
    useEffect(() => {
        setHistory(PointsService.getPointsHistoryForPlayer(props.playerid)["data"]);
    }, [props.playerid]);

    var ticksize = 20;
    const chart = 
        <ResponsiveContainer minWidth={100} minHeight={200}>
            <LineChart data={history}>
                <CartesianGrid/>
                <Tooltip labelStyle={{fontSize: ticksize}} contentStyle={{fontSize: ticksize}}/>
                <XAxis dataKey="logDate" tick={{fontSize: ticksize}} />
                <YAxis dataKey="rating" tick={{fontSize: ticksize}} />
                <Line type="linear" dataKey="rating" stroke="#01FF00" fill="#01FF00" /> 
            </LineChart>
        </ResponsiveContainer>
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
    const { state, user } = props;
    const [content, setContent] = useState(null);
    useEffect(() => {
        var con = changeState(state);
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