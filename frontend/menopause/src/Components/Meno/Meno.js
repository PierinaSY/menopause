import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Main from '../AppComponents/Main';

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect }  from 'react';


const userData = JSON.parse(sessionStorage.getItem('user'));


function Meno(props){

    const location = useLocation();

    console.log(location);
    console.log('Location state:', location.state);
   

    // Check if location.state exists and has the user property
    const email = location.state ? location.state.email: null;

    console.log('Userdata for you: ', userData);

    // if (!email) {
    //     return <div>User data not found.</div>;
    // }

    // navigate({ state: { email } });

    return(
        <div>
            <ResponsiveAppNavbar/>
            <Main name= {userData.email} />
            <AppFooter/>
        </div>
    );
}

export default Meno;