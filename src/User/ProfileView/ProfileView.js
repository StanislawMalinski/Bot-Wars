import {Link, useParams} from 'react-router-dom';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import { Buffer } from 'buffer';
import { Tooltip } from '@mui/material';

import { UserService } from '../../services/UserService'
import PhotoPicker from '../../utils/photo-picker/PhotoPicker';
import ProfileInfoTable from './ProfileInfoTable';
import ProfileInfoTableAchievements from './ProfileInfoTableAchievements';
import ProfileInfoTableButtons from './ProfileInfoTableButtons';
import './ProfileView.scss';

import defIcon from "../../resources/user.svg";
import banIcon from "../../resources/ban.svg";
import deletedIcon from "../../resources/skull.svg";
import store from "../store";

function ProfileView() {
    const { name } = useParams();
    const [user, setUser] = useState({});
    const [state, setState] = useState("games");
    const [image, setImage] = useState("");
    const [userLoading, setUserLoading] = useState(true);
    const isThatMe = () => {if(!store.getState().user)
        return false;
        return parseInt(store.getState().user.id) === user.id;}

    useLayoutEffect(() => {
        UserService.getPlayerInfo(name).then((data) => {
            setUser(data.data.data);
            setUserLoading(false)
        }).catch((error) => {
            console.log(error);
        });
    }, [name, user]);

    useEffect(() => {
        UserService.getImageForPlayer(user.id).then((data) => {
            setImage(Buffer.from(data.data.data, "base64").toString());
        }).catch((error) => {
            console.log(error);
        });
    }, [user.id]);

    const updateImage = () => {
        UserService.changeMyImage(image)
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });}

    return (<>
        <div className='main-container'>
            <div className='main-container-grid'>
                <div className='cell row1col1 notcollapse'> 
                    <div className='widget user-photo'>
                    {image === "" ? 
                            <img className='profile-image' src={defIcon} alt='user'/>
                        :
                            <img className='profile-image' src={image} />
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
                                        <img className='ban-icon' src={banIcon} alt='banned-account'/>
                                </Tooltip>
                            </div></>}
                        {user.isDeleted && <>
                            <div className='user-deleted-icon'>
                                <Tooltip 
                                    title={"This user has deleted, his account"} 
                                    followCursor 
                                    enterDelay={100} 
                                    leaveDelay={100}
                                    >
                                    <img className='deleted-icon' src={deletedIcon} alt='deleted-account'/>
                                </Tooltip>
                            </div></>}
                        <div className='user-overview-container'>
                            <p>{user.login}</p>   
                            <p>{user.point}</p>
                        </div>
                    </div>
                    <div className='widget user-achivments'>
                        <ProfileInfoTableAchievements userId={user.id}/>
                    </div>
                </div>
                <div className='cell row2col1 notcollapse'>
                    {isThatMe() ? 
                        <PhotoPicker 
                            triggerButton={<button className='photo-picker-button'>Change photo</button>} 
                            onSelect={(p) => {
                                setImage(p); 
                                updateImage();
                                console.log(p)}}/>
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
                        <p>Member since: <span className='user-info-text'>{user.memberSince}</span></p>
                        <p>Last seen: <span className='user-info-text'>{user.lastSeen}</span></p>
                        <p>Bots added: <span className='user-info-text'>{user.botsNumber}</span></p>
                        <p>Tournaments created: <span className='user-info-text'>{user.tournamentNumber}</span></p>
                    </div>
                    <div className='widget user-settings'>
                        <Link to={'/settings'}>
                            <button className='settings-button'>User Settings</button>
                        </Link>
                    </div>
                </div>
                <div className='cell row3col2'>        
                    <div className='widget user-info-table-container'>
                        {userLoading ? <></> : <ProfileInfoTable user={user} state={state}/>}
                    </div>
                </div>
            </div>
        </div>    
        </>
    );
}

export default ProfileView;