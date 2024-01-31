import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Main from '../AppComponents/Main';
import Metrics from '../AppComponents/Metrics';

import axios from "axios";

import { useEffect }  from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const userData = JSON.parse(sessionStorage.getItem('user'));

function Patterns(){

    return(
        <div className="home">
            <ResponsiveAppNavbar/>
            <div style={{ display: 'flex', justifyContent: 'center',  marginLeft: 100}}>
                <Main style={{ flex: 1 }} name= {userData.user_data.first_name} />
                <Metrics style={{ flex: 1 }} userData={userData} />
             </div>
            <AppFooter/>
        </div>
    );
}

export default Patterns;