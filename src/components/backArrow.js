import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


export default function BackArrow() {
    
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className={'iconDiv'}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} />
        </div>
    ); 
}