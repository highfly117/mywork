import React,{useEffect, useRef} from "react";
import "./CSS/SideNav.css";
import Uploadbutton from "./Uploadbutton";
import { DiReact } from 'react-icons/di'
import { FaCodeBranch, FaSearch } from 'react-icons/fa'
import { BiMenu } from "react-icons/bi";
import { HiVariable } from "react-icons/hi";
import { RiOrganizationChart } from "react-icons/ri";
import { VscJson } from "react-icons/vsc";


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
                        <HiVariable  className="react-icons" />
                        <span className="links_name">Weather and API</span>
                    </a>
                    <span className="tooltips">Weather and API</span>
                </li>
                <li onClick={() => {changePanel("Game"); collapse()}}>
                    <a href="#">
                        <FaCodeBranch className="react-icons" />
                        <span className="links_name">Game</span>
                    </a>
                    <span className="tooltips">Empire 2099</span>
                </li>
                <li className="wrap-text" onClick={() => {changePanel("Fitness"); collapse()}}>
                    <a href="#">
                        <RiOrganizationChart className="react-icons" />
                        <span className="links_name">FitnessQuest: Dungeon Edition</span>
                    </a>
                    <span className="tooltips">FitnessQuest</span>
                </li>
                <li>
                    <a href="#">
                        <VscJson className="react-icons" />
                        <span className="links_name">Show Code</span>
                    </a>
                    <span className="tooltips">JSON</span>
                </li>
            </ul>
        </div>

    )
};




export default SideNav