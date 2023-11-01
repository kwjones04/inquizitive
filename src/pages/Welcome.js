import React from 'react';
import { useNavigate } from 'react-router-dom';


/* ---------
WELCOME PAGE
--------- */

export default function Welcome(props) {

    const navigate = useNavigate();

    const onButtonClick = () => {
        if (!props.loggedIn) {
            navigate('/login');
        } else {
            navigate('/home');
        }
    }

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <h1>Inquizitive</h1>
            </div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"}
                />
            </div>
        </div>
    );
}