import loseIcon from '../resources/poop.svg';
import drawIcon from '../resources/poop.svg';
import winIcon from '../resources/crown.svg';

import './MatchOverView.scss';

export default function MatchOverView({match}) {
    if (Object.keys(match).length === 0) {
        return <></>;
    }
    const getResult = (res) => {
       switch(res) {
        case 0:
            return 'loser';
        case 1:
            return 'draw';
        case 2:
            return 'winner';
       }
    }

    const getIcon = (res) => {
        switch(res) {
            case 0:
                return loseIcon;
            case 1:
                return drawIcon;
            case 2:
                return winIcon;
        }
    }

    console.log(match);
    return (<>
        <div className='match-overview'>
            <div className='match-overview-border'>
                <div className='match-overview-container'>
                    <div className='match-overview-container-top'>
                        {match.players.map((player, index) => {
                            return <>
                                <div className='match-overview-players-list' key={index}>
                                    <img className="icon" src={getIcon(match.result[player])} alt='icon'/>
                                    <p className={getResult(match.result[player])}>{player}</p>
                                </div>
                            </>
                        })}
                    </div>
                    <div className='match-overview-container-middle'>
                        <p>MatchOverView</p>
                        <p><b>{match.tournamentName}</b></p>
                        <p>Game: <b>{match.gameType}</b></p>
                        <p>Played: <b>{match.date}</b></p>
                    </div>
                    <div className='match-overview-container-bottom'>
                        <button>Download game</button>
                    </div>
                </div>

            </div>
        </div>
    </>);
}