import React, { useState } from 'react';
import "../CSS/Navbar.css";
import axios from "axios";
import Autocomplete from "@mui/material/useAutocomplete";
import TextField from "@mui/material/TextField";

const TopBar = () => {


  return (
    <div className="GamenavbarRE">
        <nav className="navbar bg-light" style={{"flexWrap":"nowrap"}}>
           <a className="navbar-brand" style={{"marginLeft":"15px"}}> Empire 2099 </a>
             
                
            
        </nav>
    </div>
  )
}

export default TopBar;