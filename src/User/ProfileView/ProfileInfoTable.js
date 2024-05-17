import { useEffect, useState } from "react";
import {PointsService} from "../../services/PointsService";
import {XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line  } from 'recharts';
import ProfileGameList from './ProfileGameList';
import TournamentsPlayedTable from './TournamentsPlayedTable';

function RatingTable({user}) {
    const [history, setHistory] = useState([{id: 0, logDate: "", points: 0, playerId: 0}]);
    
    useEffect(() => {
        console.log(user);
        PointsService.getPointsHistoryForPlayer(user.id)
        .then((data) => {
            setHistory(data.data.data);
            console.log(history);
        }).catch((error) => {
            console.log(error);
        });
    }, [user, user.id, history]);

    var ticksize = 20;
    const chart = 
        <ResponsiveContainer minWidth={100} minHeight={200}>
            <LineChart data={history}>
                <CartesianGrid/>
                <Tooltip labelStyle={{fontSize: ticksize}} contentStyle={{fontSize: ticksize}}/>
                <XAxis dataKey="logDate" tick={{fontSize: ticksize}} />
                <YAxis dataKey="before" tick={{fontSize: ticksize}} />
                <Line type="linear" dataKey="before" stroke="#01FF00" fill="#01FF00" /> 
            </LineChart>
        </ResponsiveContainer>
    return (
        <>
        {chart}
        </>
    );
}

function changeState(newState, user) {
    switch (newState) {
        case "rating":
            return <RatingTable user={user}/>;
        case "games":
            return <ProfileGameList user={user}/>;
        case "tournaments":
            return <TournamentsPlayedTable username={user.login} />;
        default:
            return null;
    }
}

function ProfileInfoTable({ state, user }) {
    const [content, setContent] = useState(null);
    useEffect(() => {
        setContent(changeState(state, user));
    }, [state, user]);

    return (<>
        <div className="user-info-table">
            <div className="user-info-table-content">
                {content}
            </div>
        </div>
    </>);
}

export default ProfileInfoTable;