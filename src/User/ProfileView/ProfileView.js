import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/UserService'
import ProfileInfoTable from './ProfileInfoTable';
import ProfileInfoTableAchievements from './ProfileInfoTableAchievements';

import './ProfileView.css';
import ProfileInfoTableButtons from './ProfileInfoTableButtons';

function ProfileView() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [state, setState] = useState("stats");
    const myID = 1;


    useEffect(() => {
        setUser(UserService.getPlayerInfo(id));
    }, [id]);


    return (<>
        <div className='main-container'>
            <div className='cell row1col1'> 
                <div className='widget user-photo'>
                    <img className='profile-image' src={user.photoURL} alt='user'/>
                </div>
            </div>
            <div className='cell row1col2'>
                <div className='widget user-overview'>
                    <div className='user-overview-container'>
                        <p>{user.login}</p>   
                        <p>{user.rating}</p>
                    </div>
                </div>
                <div className='widget user-achievements'>
                    <ProfileInfoTableAchievements userId={user.playerid}/>
                </div>
            </div>
            <div className='cell row2col1'>
                {id === myID ?
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
            <div className='cell row3col1'>
                <div className='widget user-info'> 
                    <p>Member since: {user.joined}</p>
                    <p>Last seen: {user.lastseen}</p>
                    <p>Bots added: #TODO#</p>
                    <p>Tournaments created: #TODO#</p>
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