import * as React from 'react';
import AppFooter from '../Navigation/AppFooter';
import ResponsiveAppNavbar from '../Navigation/AppNavbar';
import Main from '../AppComponents/Main';
import Treatment from '../AppComponents/Treatment';

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";


const userData = JSON.parse(sessionStorage.getItem('user'));


const csrfTokenMatch = document.cookie.match(/csrftoken=(\w+)/);
const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

const axiosConfig = {
  headers: {
    'X-CSRFToken': csrfToken,
  },
};


function Recommendation(){

    const [recommendationData, setRecommendationData] = useState([]);
   
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/recommendations/', {
            params: { user_id: userData.user_data.id },
          }, axiosConfig);
  
         
          setRecommendationData(response.data);
  
          console.log('This is the data', response.data);
          
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [userData.user_data.id]);

    return(
        <div className="home">
            <ResponsiveAppNavbar/>
            <div style={{ display: 'flex', justifyContent: 'center',  marginLeft: 100}}>
                <Main style={{ flex: 1 }} name= {userData.user_data.first_name} />
                <Treatment style={{ flex: 1 }} data={recommendationData}/>
             </div>
            <AppFooter/>
        </div>
    );
}

export default Recommendation;