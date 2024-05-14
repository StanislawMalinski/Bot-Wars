import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

import {AchivmentService} from '../../services/AchivmentService';

import './ProfileInfoTableAchievements.css'

function ProfileInfoTableAchievements(props) {
    const {userId} = props;
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        console.log(userId);
        AchivmentService.getAchivmentsForPlayer(userId)
        .then((data) => {
            setAchievements(data.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [userId]);

    let content = achievements.map((achiv) => {
        let tooltipcontent = <>
            <h3>{achiv.achiv}</h3>
            <p>{achiv.description}</p> 
            <p>Current value: {achiv.value}</p>
      </>
        return (
            <Tooltip 
                title={tooltipcontent} 
                followCursor 
                enterDelay={500} 
                leaveDelay={100}
                >
                <div className='user-achivments-icon-container'>
                    <img 
                    className='user-achivments-icon' 
                    src={AchivmentService.getIcon(achiv.achievementTypeId)} 
                    style={{
                        filter: `grayscale(${achiv.achived ? 1 : 0}) brightness(${100}%)`,
                      }}
                      />
                </div>
            </Tooltip>
        );
    });
    
    return (
        <>
            <div className='user-achivments-container'>
                <div className='user-achivments-container-content'>
                    <div className='user-achivments-scroll'>
                        {content}
                    </div>
                </div>
                <div className='user-achivments-background'>
                    <p className='user-achivments-background-text'>Achievements</p>
                </div>
            </div>
        </>
    );
}

export default ProfileInfoTableAchievements;