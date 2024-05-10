import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/UserService'
import ProfileInfoTable from './ProfileInfoTable';
import ProfileInfoTableAchievements from './ProfileInfoTableAchievements';
import { Buffer } from 'buffer';
import './ProfileView.css';
import ProfileInfoTableButtons from './ProfileInfoTableButtons';
import { Tooltip } from '@mui/material';
import { dateToResponse } from '../../services/ServiceUtils';

import defIcon from "../../resources/user.svg";
import banIcon from "../../resources/ban.svg";

function ProfileView() {
    const { name } = useParams();
    const [user, setUser] = useState({});
    const [state, setState] = useState("stats");
    const [image, setImage] = useState("");
    const myID = 1;

    useEffect(() => {
        UserService.getPlayerInfo(name).then((data) => {
            setUser(data.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [name]);

    useEffect(() => {
        if (user.id === undefined) return;  
        UserService.getImageForPlayer(user.id).then((data) => {
            setImage(Buffer.from(data.data.data, "base64").toString());
        }).catch((error) => {
            console.log(error);
        });
    }, [user]);

    return (<>
        <div className='main-container'>
            <div className='cell row1col1 notcollapse'> 
                <div className='widget user-photo'>
                {image === "" ? 
                        <img className='profile-image' src={defIcon} alt='user'/>
                    :
                        <img className='profile-image' src={`data:image/jpeg;base64,${image}`} />
                    }                  
                </div>
            </div>
            <div className='cell row1col2'> 
                <div className='widget user-overview'>
                    {user.isBanned && <>
                        <div className='user-ban-icon'>
                            <Tooltip 
                                title={"This user is banned!"} 
                                followCursor 
                                enterDelay={100} 
                                leaveDelay={100}
                                >
                                    <img className='ban-icon' src={banIcon} alt='ban'/>
                            </Tooltip>
                        </div></>}
                    <div className='user-overview-container'>
                        <p>{user.login}</p>   
                        <p>{user.point}</p>
                    </div>
                </div>
                <div className='widget user-achivments'>
                    <ProfileInfoTableAchievements userId={user.playerid}/>
                </div>
            </div>
            <div className='cell row2col1 notcollapse'>
                {user.id === myID ? 
                    <a className='change-photo' href='/'>Change photo</a> 
                    : 
                    <></>
                    }
            </div>
            <div className='cell row2col2'>
                <div className='widget user-info-table-buttons'>
                    <ProfileInfoTableButtons setState={setState}/>
                </div>
            </div>
            <div className='cell row3col1 notcollapse'>
                <div className='widget user-info'> 
                    <p>Member since: <span className='user-info-text'>{dateToResponse("2024-04-26T11:13:01.8196733")}</span></p>
                    <p>Last seen: <span className='user-info-text'>{user.lastSeen}</span></p>
                    <p>Bots added: <span className='user-info-text'>{user.botsNumber}</span></p>
                    <p>Tournaments created: <span className='user-info-text'>{user.tournamentNumber}</span></p>
                </div>
                <div className='widget user-settings'>
                    <button className='settings-button'>User Settings</button>
                </div>
            </div>
            <div className='cell row3col2'>        
                <div className='widget user-info-table-container'>
                    <ProfileInfoTable user={user} state={state}/>    
                </div>
            </div>
        </div>    
        </>
    );
}

export default ProfileView;