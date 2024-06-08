import "./MovesTable.scss";
import { useState } from 'react';

function getColor(value) {
    if (typeof value !== 'string') return 'def';
    if (value.toUpperCase().includes('RED')) {
        return 'red';
    } else if (value.toUpperCase().includes('BLUE')) {
        return 'blue';
    } else if (value.toUpperCase().includes('YELLOW')) {
        return 'yellow';
    } else if (value.toUpperCase().includes('BROWN')) {
        return 'brown';
    } else if (value.toUpperCase().includes('PINK')) {
        return 'pink';
    } else if (value.toUpperCase().includes('WHITE')) {
        return 'white';
    } else if (value.toUpperCase().includes('GREEN')) {
        return 'green';
    }
    return 'def';
}

function MovesTableButtons({move, setMove}) {
    return(<> 
            <div className="match-table-btns">
                <div className="match-table-btns-container">
                        <button className="match-table-btn" onClick={setMove(0)}>First</button>
                        <button className="match-table-btn" onClick={setMove(move - 1)}>≪</button>
                        <button className="match-table-btn">{move + 1}</button>
                        <button className="match-table-btn" onClick={setMove(move + 1)}>≫</button>
                        <button className="match-table-btn" onClick={setMove(-2)}>Last</button>
                </div>
            </div>
        </>
    );
}

export default function MovesTable({log, scrollRef, }) {
    let boardState, playerMove, playerHand;

    return <>
        <div className="move-table">
            <div className="move-table-container">
                <div className='move-table-container-scrollable-table' ref={scrollRef}>
                    <table>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Board State</th>
                                <th>Move</th>
                                <th>Player hand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {log.rounds.map((round, index) => {
                                boardState = round.boardState.map((x) => <p className={getColor(x)}>{x}</p>)
                                playerMove = round.playerMove.map((x) => <p className={getColor(x)}>{x}</p>)
                                playerHand = round.playerHand.map((x) => <p className={getColor(x)}>{x}</p>)
                                return <tr className={`move-element-row ${'player-' + round.player}`}
                                    key={index}>
                                    <td>{index}.</td>
                                    <td>{boardState}</td>
                                    <td>{playerMove}</td>
                                    <td>{playerHand}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export { MovesTableButtons };