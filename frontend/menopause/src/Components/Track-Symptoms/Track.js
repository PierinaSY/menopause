import * as React from "react";
import AppFooter from "../Navigation/AppFooter";
import ResponsiveAppNavbar from "../Navigation/AppNavbar";
import Main from "../AppComponents/Main";
import Add from "../AppComponents/Add";

import axios from "axios";

import { useEffect }  from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const userData = JSON.parse(sessionStorage.getItem('user'));


function Track() {
  const location = useLocation();
    console.log(location);
    console.log('Location state:', location.state);

    // Check if location.state exists and has the user property
    const email = location.state ? location.state.email: null;

  return (
    <div className="home">
      <ResponsiveAppNavbar />
      <div style={{ display: "flex", justifyContent: "center", marginLeft: 100 }}>
        <Main style={{ flex: 1 }} name= {userData.user_data.first_name} />
        <Add style={{ flex: 1 }} user_id= {userData.user_data.id} />
      </div>
      <AppFooter />
    </div>
  );
}

export default Track;