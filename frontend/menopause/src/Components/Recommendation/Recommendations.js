import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Main from '../AppComponents/Main';
import Treatment from '../AppComponents/Treatment';

import axios from "axios";

import { useEffect }  from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const userData = JSON.parse(sessionStorage.getItem('user'));


function Recommendation(){

    return(
        <div className="home">
            <ResponsiveAppNavbar/>
            <div style={{ display: 'flex', justifyContent: 'center',  marginLeft: 100}}>
                <Main style={{ flex: 1 }} name= {userData.user_data.first_name} />
                <Treatment style={{ flex: 1 }} />
             </div>
            <AppFooter/>
        </div>
    );
}

export default Recommendation;