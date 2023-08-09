import React,{useEffect, useRef} from "react";
import "./CSS/SideNav.css";
import Uploadbutton from "./Uploadbutton";
import { DiReact } from 'react-icons/di'
import { FaCodeBranch, FaSearch } from 'react-icons/fa'
import { BiMenu } from "react-icons/bi";
import { HiVariable } from "react-icons/hi";
import { RiOrganizationChart } from "react-icons/ri";
import { VscJson } from "react-icons/vsc";
import rwcIcon from '../Assets/RWC2023_512x512.png'
import weatherIcon from '../Assets/weather-forecast.png'
import gameIcon from '../Assets/spaceship.png'
import gymIcon from '../Assets/member-card.png'
import { MdHeight } from "react-icons/md";
import { height } from "@mui/system";


const SideNav = ({props, changePanel}) => {

    const sideRef = useRef(null);
    const collapse = () => {
        sideRef.current.classList.toggle('active')
    } 

    
    
    return (
        <div  ref={sideRef}className="sideNav active">

            <div className="logo_content">
                <div className="logo">
                    <div className="logo_name"><DiReact size={"4rem"} />RnD</div>
                </div>
                <BiMenu onClick={collapse} className="react-icons" id="btn"></BiMenu>
            </div>
            <ul className="nav_list">
                {/* <li>
                    <a className="nohover" href="#">
                        <FaSearch onClick={collapse} id="faSearch" className="react-icons" />
                        <input type={"text"} placeholder={"search...."}></input>
                    </a>
                </li> */}
                {/* <Uploadbutton  ></Uploadbutton> */}
                <li onClick={() => {changePanel("Weather"); collapse()}}>
                    <a href="#">
                    <img style={{height:"40px", width:"40px", marginLeft:"5px", marginRight:"7px"}} src={weatherIcon} alt="Weather Icon"  />
                        <span className="links_name">Weather</span>
                    </a>
                    <span className="tooltips">Weather</span>
                </li>
                <li onClick={() => {changePanel("Game"); collapse()}}>
                    <a href="#">
                    <img style={{height:"40px", width:"40px", marginLeft:"5px", marginRight:"7px"}} src={gameIcon} alt="Game Icon"  />
                        <span className="links_name">Empire 2099</span>
                    </a>
                    <span className="tooltips">Empire 2099</span>
                </li>
                <li className="wrap-text" onClick={() => {changePanel("Fitness"); collapse()}}>
                    <a href="#">
                    <img style={{height:"40px", width:"40px", marginLeft:"5px", marginRight:"7px"}} src={gymIcon} alt="Gym Icon"  />
                        <span className="links_name">FitnessQuest: Dungeon Edition</span>
                    </a>
                    <span className="tooltips">FitnessQuest</span>
                </li>
                <li style={{marginTop:"30px"}} onClick={() => {changePanel("Sports")}}>
                    <a href="#">
                    <img style={{height:"50px"}} src={rwcIcon} alt="RWC Icon" className="react-icons" />
                        <span className="links_name">RWC 2023</span>
                    </a>
                    <span className="tooltips">JSON</span>
                </li>
            </ul>
        </div>

    )
};




export default SideNav