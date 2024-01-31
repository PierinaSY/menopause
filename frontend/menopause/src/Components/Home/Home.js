import * as React from 'react';
import Hero from "./Components/Hero";
import Feature1 from "./Components/Feature1";
import Feature2 from "./Components/Feature2";
import Stats from './Components/Stats';
import Quote from './Components/Quote';
import Features from './Components/Features';
import Navbar from '../Navigation/Navbar';
import Footer from '../Navigation/Footer';

function Home(){

    return(
        <div className="home">
            <Navbar />
            <Hero/>
            <Feature1 />
            <Feature2 />
            <Stats />
            <Quote />
            <Features />
            <Footer />
        </div>
    );
}

export default Home;