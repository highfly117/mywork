import React, { useState } from 'react';
import "../CSS/Fitness/TopBarFitness.css";
import axios from "axios";
import { GiBiceps } from 'react-icons/gi'

import SigninModel from './SigninModel';
import SignupModel from './SignupModel';

const TopBarFitness = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const toggleLogin = () => {
    setLoginOpen(prev => !prev)
    console.log("login is " + loginOpen)
  };
  const toggleSignup = () => {
    
    setSignupOpen(prev => !prev)
    console.log("signup is " + signupOpen)
  };

  const handleSignUpClick = () => {
    toggleLogin();  // close login modal
    toggleSignup(); // open signup modal
  };
  

  return (
    <div className="FitnessnavbarRE">
      <nav className="navbar bg-light" style={{ "flexWrap": "nowrap" }}>
        <a className="navbar-brand" style={{ "marginLeft": "15px" }}> <h1><strong>FitnessQuest</strong></h1> </a>
        <div className='SignupWrapper' onClick={toggleLogin}>
          <GiBiceps className="react-icons"></GiBiceps>
          <a>Sign Up / Login</a>
        </div>

        <SigninModel open={loginOpen} toggleModal={toggleLogin} onSignUpClick={handleSignUpClick} />
        <SignupModel open={signupOpen} toggleModal={toggleSignup} />

      </nav>
    </div>
  )
}

export default TopBarFitness;