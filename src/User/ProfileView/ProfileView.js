import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getUser } from '../../services/Api';
import ProfileInfoTable from './ProfileInfoTable';
import ProfileInfoTableAchivments from './ProfileInfoTableAchivments';

import './ProfileView.css';


function ProfileView() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const myID = 1;


    useEffect(() => {
        setUser(getUser({"playerid" : id}));
    }, [id]);


    return (<>
        <div className='main-container'>
            <div className='row1col1'> 
                <div className='widget user-photo'>
                    <img className='profile-image' src={user.photoURL} alt='user-photo'/>
                </div>
            </div>
            <div className='row1col2'>
                <div className='widget user-overview'>
                    <div className='user-overview-container'>
                        <p>{user.nickname}</p>            
                        <p>{user.points}</p>
                    </div>
                </div>
            </div>
            <div className='row2col1'>
                {id == myID ? 
                    <a className='change-photo' href='/'>Change photo</a> 
                    : 
                    <></>
                    }
            </div>
            <div className='row2col2'>
                <div className='widget user-achivments'>
                    <ProfileInfoTableAchivments userId={user.playerid}/>
                </div>
            </div>
            <div className='row3col1'>
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
            <div className='row3col2'>        
                <div className='widget user-info-table-container'>
                    <ProfileInfoTable user={user}/>    
                </div>
            </div>
        </div>    
        </>
    );
}

export default ProfileView;