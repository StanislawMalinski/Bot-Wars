import { useEffect, useState, useRef } from "react"
import { Bracket, Seed, SeedItem, SeedTeam} from 'react-brackets';
import defeatIcon from '../../resources/defeat.png';
import victoryIcon from '../../resources/glory.png';
import robotIcon from '../../resources/robot1.svg';

import zoomInIcon from '../../resources/zoom-in.svg';
import zoomOutIcon from '../../resources/zoom-out.svg';


import './Ladder.scss';


const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}) => {    
    const getColor = (seed, index) => {
        if (seed.Winner === seed.teams[index]?.BotId) {
            return 'green';
        } else if (seed.Winner === seed.teams[1 - index]?.BotId) {
            return 'red';
        } else {
            return 'gray';
        }
    }
    const getImage = (seed, index) => {
        let icon;
        if (seed.Winner === seed.teams[index]?.BotId) {
            icon = victoryIcon;
        } else if (seed.Winner !== seed.teams[index]?.BotId && seed.Winner !== -1) {
            icon = defeatIcon;
        } else if (seed.Winner === -1 && seed.teams[index].BotId){
            icon = robotIcon;
        } else {
            return <></>;
        }
        return <img src={icon} alt='icon' className='bot-icon'/>;
    }

    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
        <SeedItem>
          <div>
            {seed.teams.map((team, index) => (
            <SeedTeam style={{ color: getColor(seed, index) }}>
                <div className='ladder-record'>
                    <div className='user-name'>
                        {team.UserName|| '...'}
                    </div>
                    <div className='bot'>
                        {getImage(seed, index)}
                        <div className='bot-name'>
                            {team.BotFile || '...'}
                        </div>
                    </div>
                </div>
            </SeedTeam>))}
          </div>
        </SeedItem>
      </Seed>
    );
}

const buildRounds = function (json) {
    let result = json;
    let temp = [];
    result.sort((a, b) => (a.Position-b.Position));
    const minPosition = result[0].Position;
    const maxPosition = result[result.length - 1].Position;
    const heapSize = Math.pow(2, Math.ceil(Math.log2(maxPosition))) - 1;
    
    for (let i = 0; i < minPosition; i++) {
        temp.push({
            id: i,
            date: new Date().toDateString(),
            teams: [{}, {}],
        });
    };
    temp = temp.concat(result);
    let tail = heapSize - temp.length;
    for (let i = 0; i < tail; i++) {
        temp.push({
            id: i + maxPosition + 1,
            date: new Date().toDateString(),
            teams: [{}, {}],
        });
    }
    result = temp;

    result = result.map(element => {
        if (element.PlayersBots) element.teams = element.PlayersBots;
        if (!element.Status) element.Status = "NotReadyToPlay";
        if (!element.Winner) element.Winner = -1;
        if (!element.PlayedOutDate) element.PlayedOutDate = "0001-01-01T00:00:00";
        if (!element.Position) element.Position = element.matchId;
        return element;
    });
    
    temp = [];
    let cursor = -1;
    for (let i = result.length - 1; i >= 0 ; i--) {
        if (Number.isInteger(Math.log2(i + 2))) {
            temp.push([]);
            cursor++;
        }
        temp[cursor].push(result[i]);
    }
    result = temp;

    result = result.map((round, index) => {
        return {
            title: 'Round ' + (index + 1),
            seeds: round,
        };
    });
    
    return result;
}

const roundClassName = function (title, roundIndex) {
    return <div className='round-title'>{title}</div>;    
}


export default function Ladder({status}){
    const [rounds, setRounds] = useState([]);
    const [zoom, setZoom] = useState(1);
    const [origin, setOrigin] = useState({x: 0, y: 0});
    const divRef = useRef(null);

    let mouseDown = false;
    let startX, startY, scrollLeft, scrollTop;

    const move = (e) => {
        e.preventDefault();
        if(!mouseDown) { return; }
        const x = e.pageX - divRef.offsetLeft;
        const y = e.pageY - divRef.offsetTop;
        const scrollX = x - startX;
        const scrollY = y - startY;
        divRef.scrollLeft = scrollLeft - scrollX;
        divRef.scrollTop = scrollTop - scrollY;
    };

    const stopDrag = (e) => {
        mouseDown = false;
    }

    const startDrag = (e) => {
        mouseDown = true;
        startX = e.pageX - divRef.offsetLeft;
        startY = e.pageY - divRef.offsetTop;
        scrollLeft = divRef.scrollLeft;
        scrollTop = divRef.scrollTop;
    }

    useEffect(() => {
        divRef.current.addEventListener('mousemove', move, false);
        divRef.current.addEventListener('mousedown', startDrag, false);
        divRef.current.addEventListener('mouseup', stopDrag, false);
        divRef.current.addEventListener('mouseleave', stopDrag, false);
    },[divRef]);

    useEffect(() => {
        setRounds(buildRounds(status));
    }, [status]);

    const changeZoom = (delta) => {
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        div.style.top = `${Math.max(rect.top,0)}px`;
        div.style.left = `${Math.max(rect.left,0)}px`;
        setOrigin({x: rect.width/2, y: rect.height/2 });
        console.log(rect);
        console.log(origin);
        setZoom(Math.min(Math.max(zoom + delta * 0.1, 0.1), 2));
    }

    return (<>
        <div className='ladder'>
            <div className='ladder-zoom' >
                <div className='ladder-zoom-container' 
                style={{ 
                    transform: `scale(${zoom})`, 
                    transformOrigin: `${origin.x}px ${origin.y}px`
                }}
                ref={divRef}>
                    <div className='origin' style={{left: origin.x, top: origin.y}}></div>
                    <Bracket rounds={rounds} 
                        rtl={false} 
                        mobileBreakpoint={100} 
                        renderSeedComponent={CustomSeed}
                        roundTitleComponent={roundClassName}
                        roundClassName="round"
                        />
                </div>
            </div>
            <div className='zoom-btns'>
                <div className="zoom-btn" onClick={() => changeZoom(1)}>
                    <img src={zoomInIcon} alt='zoom-in' className='zoom-in-icon'/>
                </div>
                <div className="zoom-btn" onClick={() => changeZoom(-1)}>
                    <img src={zoomOutIcon} alt='zoom-out' className='zoom-out-icon'/>
                </div>
            </div>
        </div>
    </>)
} 