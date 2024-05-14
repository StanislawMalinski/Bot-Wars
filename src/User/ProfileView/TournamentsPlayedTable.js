import { useEffect, useState } from 'react';
import {TournamentService} from '../../services/TournamentService';
import './TournamentsPlayedTable.scss';

export default function TournamentsPlayedTable({username}){
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        TournamentService.getFilteredTournaments(1, 10,{userParticipation: username})
        .then((data) => {
            setTournaments(data.data.data.page);
            setLoading(false);   
        }).catch((error) => {
            console.log(error);
        });
    }, [username]);

    const getColor = function(status){
        switch(status){
            case "SCHEDULED":
                return "dark-blue";
            case "CANCELLED":
                return "red";
            case "PLAYED":
                return "yellow";
            case "DONE":
                return "green";
            default:
                return "red";
        }
    }

    return (
        <>
            <div className="user-info-table">
                <div className="user-info-table-content">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                    <>{tournaments.map((tournament, index) => (
                            <div className={`${(index % 2) ? 'light' : 'dark'} tournament-list-element-container`}
                                key={tournament.id}>
                                <p className="tournament-list-element-title">
                                    {tournament.tournamentTitle}
                                </p>
                                <p className={`${(getColor(tournament.status))} tournament-list-element-status`}>
                                    {tournament.status}
                                </p>                    
                            </div>
                        ))}</>)}
                </div>
            </div>
        </>
    );
}