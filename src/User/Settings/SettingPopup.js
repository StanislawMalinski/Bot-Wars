import ChangeUsernamePopup from "./ChangeUsername"
import ChangePasswordPopup from "./ChangePassword"
import ChangePhotoPopup from "./ChangePhoto"
import DeleteAccountPopup from "./DeleteAccount"

import './UserSettingsPopup.css'
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"


export default function SettingPopup(props) {
    var {state, triggername, setReturn} = props;
    const [content, setContent] = useState(null);

    const getContent = (s) => {
        switch (s) {
            case 'username':
                return <ChangeUsernamePopup setReturn={setReturn}/>
            case 'password':
                return <ChangePasswordPopup setReturn={setReturn}/>
            case 'photo':
                return <ChangePhotoPopup setReturn={setReturn}/>
            case 'delete':
                return <DeleteAccountPopup setReturn={setReturn}/>
            default:
                return null;
        }
    }

    useEffect(() => {
        setContent(getContent(state))
    }, [state, getContent])

    if (typeof triggername !== 'string') {
        console.error('triggername is not a string');
        return null;
    }
    
    var but = <button className='user-setting-button'>{triggername}</button>
    return (<>
        <Popup className='user-setting-popup' trigger={but}>
            {close => 
            <>
                <div className='user-setting-popup-window-background'>
                    <div className='user-setting-popup-window'>
                        <button className="user-setting-popup-close-button" onClick={close}>
                            &times;
                        </button>
                        {content}
                    </div>
                </div>
            </>
            }
        </Popup>
    </>)
}