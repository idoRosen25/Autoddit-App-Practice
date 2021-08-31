import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';
 
const CommentModal = ({modalOpen, triggerModal, onModalSubmit, onModalChange, modalFormValue}) => {

    const modalHeight =document.body.scrollHeight;

    return (
        <React.Fragment>
            {
                (modalOpen) ? (
                    <div className='commentModal' style={{'height':modalHeight}}>
                    <div className='modalContent'>
                        <header className='modalHeader'><FontAwesomeIcon icon={faComment} style={{'marginRight':'1%'}}/>  header modal</header>
                        <div>
                            <textarea onChange={onModalChange} value={modalFormValue} className='modalText' placeholder='Enter Comment Here...' />
                            <footer className='modalFooter'>
                                <button className='actionBtn' style={{'backgroundColor':'limegreen'}} onClick={onModalSubmit}>Save</button>
                                <button className='actionBtn'style={{'backgroundColor':'red'}} onClick={triggerModal}>Cancel</button>
                            </footer>
                        </div>
                    </div>
                </div>
                ) : null
            }
        </React.Fragment>
    )

};

export default CommentModal;


