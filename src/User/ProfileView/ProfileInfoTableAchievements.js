import './ProfileInfoTableAchievements.css';
import icon1 from '../../resources/icon1.svg'
import icon2 from '../../resources/icon2.svg'
import icon3 from '../../resources/icon3.svg'
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

function getAchievements(playerId) {
    return [
        {'achiv': 'achiv1', 'description': 'very good description', 'icon': icon1, 'value': '1000', 'achived': true},
        {'achiv': 'achiv2', 'description': 'very bad description', 'icon': icon2, 'value': '2000', 'achived': true}, 
        {'achiv': 'achiv3', 'description': 'very ugly description', 'icon': icon3, 'value': '3000', 'achived': false},
        {'achiv': 'achiv4', 'description': 'very beautiful description', 'icon': icon2, 'value': '4000', 'achived': true},
        {'achiv': 'achiv5', 'description': 'very descriptive description', 'icon': icon1, 'value': '5000', 'achived':false},
        {'achiv': 'achiv6', 'description': 'very good description', 'icon': icon2, 'value': '1000', 'achived': false},
        {'achiv': 'achiv7', 'description': 'very bad description', 'icon': icon3, 'value': '2000', 'achived': true},
        {'achiv': 'achiv8', 'description': 'very ugly description', 'icon': icon2, 'value': '3000','achived': false},
        {'achiv': 'achiv9', 'description': 'very beautiful description', 'icon': icon1, 'value': '4000', 'achived': true},
        {'achiv': 'achiv10', 'description': 'very descriptive description', 'icon': icon3, 'value': '5000', 'achived': false},
        {'achiv': 'achiv11', 'description': 'very good description', 'icon': icon1, 'value': '1000', 'achived': false},
        {'achiv': 'achiv12', 'description': 'very bad description', 'icon': icon2, 'value': '2000', 'achived': true},
        {'achiv': 'achiv13', 'description': 'very ugly description', 'icon': icon3, 'value': '3000', 'achived': false},
        {'achiv': 'achiv7', 'description': 'very bad description', 'icon': icon1, 'value': '2000', 'achived': true},
        {'achiv': 'achiv8', 'description': 'very ugly description', 'icon': icon3, 'value': '3000', 'achived':false},
        {'achiv': 'achiv9', 'description': 'very beautiful description', 'icon': icon1, 'value': '4000','achived': true},
        {'achiv': 'achiv10', 'description': 'very descriptive description', 'icon': icon2, 'value': '5000','achived': false},
        {'achiv': 'achiv11', 'description': 'very good description', 'icon': icon1, 'value': '1000','achived': true},
        {'achiv': 'achiv12', 'description': 'very bad description', 'icon': icon2, 'value': '2000','achived': false},
        {'achiv': 'achiv13', 'description': 'very ugly description', 'icon': icon3, 'value': '3000','achived': true},
    ]
}

function ProfileInfoTableAchievements(props) {
    const {playerId} = props;
    const [achievements, setAchievements] = useState([{'achiv':'', 'description':'', 'icon':'', 'value':'', 'achived':false}]);

    useEffect(() => {
        setAchievements(getAchievements(playerId));
    }, [playerId]);

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
                    src={achiv.icon} 
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
                    <p className='user-achivments-background-text'>Achivments</p>
                </div>
            </div>
        </>
    );
}

export default ProfileInfoTableAchievements;