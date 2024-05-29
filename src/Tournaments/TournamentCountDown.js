import Countdown from 'react-countdown';
import './TournamentCountDown.scss';

export default function TournamentCountDown({date}) {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <p>Time's up!</p>;
        } else {
          // Render a countdown
          return <><p>{hours} h</p><p>{minutes} m</p><p>{seconds} s</p></>;
        }
      };

    return (
        <div className="tournamentCountdown">
        <Countdown 
            date={date} 
            renderer={renderer}/>
        </div>
    );
}



