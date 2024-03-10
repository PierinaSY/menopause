import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Main from '../AppComponents/Main';
import Profile from '../AppComponents/Profile';
import Base from '../AppComponents/BaseSymptoms';
import CircularProgress from '@mui/material/CircularProgress';

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState }  from 'react';


const userData = JSON.parse(sessionStorage.getItem('user'));


function Meno(props){

    const location = useLocation();

    console.log(location);
    console.log('Location state:', location.state);
   

    // Check if location.state exists and has the user property
    const email = location.state ? location.state.email: null;

    console.log('Userdata for you: ', userData);

    return(
        <div>
            <ResponsiveAppNavbar/>
            <div style={{ padding: '20px', flex: 1, display: 'flex', justifyContent: 'center' }}>
                <Main style={{ flex: 1 }} name= {userData.user_data.first_name} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Conditionally render the Profile component */}
                    {/* {!hasProfile && <Profile user_id={userData.user_data.id} />} */}
                    <Profile user_id={userData.user_data.id} />
                    <Base user_id= {userData.user_data.id} />
                </div>
            </div>
        </div>
    );
}

export default Meno;