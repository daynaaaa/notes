import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onGoHomeClicked = () => navigate('/dash');

    let goHomeButton = null;
    if (pathname !== '/dash') {
        goHomeButton = (
            <button 
                className='dash-footer_button icon-button'
                title='Home'
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }


    const content = (
        <footer className='dash-footer'>
            {goHomeButton} {/*this button only appears when were not at the root page of dash*/}
            <p>current user:</p>
            <p>status:</p>
        </footer>
    )
  return content;
}

export default DashFooter