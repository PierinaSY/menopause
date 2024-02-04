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
        <div style={{ position: 'relative', minHeight: '100vh', padding: '64px 0' }}>
        <ResponsiveAppNavbar style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
        <div style={{ padding: '20px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Main style={{ minWidth: '40vh' }} name={userData.user_data.first_name} />
            <Metrics style={{ flex: 1 }} userData={userData} />
        </div>
        <AppFooter style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} />
        </div>
    );
}

export default Patterns;