import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
import './PhotoPicker.scss';
import { useState } from 'react';

import Popup from 'reactjs-popup';

export default function PhotoPicker({triggerButton, onSelect}){
    const [imageBuffor, setImageBuffor] = useState('');
    const config = {
        borderRadius: '5px',
        aspectRatio: 1,
        language: 'en',
        width: '300px',
        height: '250px',
        objectFit: 'contain',
        compressInitial: null,
        hideDeleteBtn: true,
        hideDownloadBtn: true,
        hideEditBtn: true,
        hideAddBtn: true
      };
      // const initialImage: string = '/assets/images/8ptAya.webp';
     return (<>
        <Popup className='photo-picker-popup' trigger={triggerButton}>
                {close => <>
                    <div className='user-setting-popup-window-background'>
                        <div className='photo-picker-popup-window'>
                            <div className='photo-picker-popup-container'>
                                <button className='photo-picker-popup-close-btn' onClick={close}>&times;</button>
                                <div className='photo-picker-component'>
                                    < ReactImagePickerEditor                
                                        config={config}
                                        imageSrcProp={imageBuffor}
                                        imageChanged={setImageBuffor} /> 
                                </div>
                                <div className='photo-picker-popup-operation-btns'>
                                    <button className='photo-picker-popup-save-btn' disabled={imageBuffor === ''} onClick={() => {onSelect(imageBuffor); close()}}>Save</button>
                                    <button className='photo-picker-popup-cancel-btn' onClick={close}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </Popup>
        </>)
}