import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Register from './Register';
import RegisterAdmin from './RegisterAdmin';
function Home() {
    return (
      <div className="Home">
        {/* <header className="Home-header"> */}
        <div className='Display'>
          <p>
            
          <font size="5">
          
            <p align="center" className="pt-5" style={{ color: 'white' }}>
            </p>
            <h1 align="center" style={{ color: 'White' }}>
              Online Food Recipes Portal
            </h1>
            <h2 align="center" style={{color:'white'}}>No One is Born a Great Cook,One Learn by Doing</h2>
          </font>
          </p>
        </div> 
            
        {/* </header> */}
      </div>
    );
  }
  
  export default Home;
  