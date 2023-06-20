import React,{useEffect, useRef} from "react";
import "../CSS/Mob/SideNavMob.css"
import Uploadbutton from "../Uploadbutton";
import { DiReact } from 'react-icons/di'
import { FaCodeBranch, FaSearch } from 'react-icons/fa'
import { BiMenu } from "react-icons/bi";
import { HiVariable } from "react-icons/hi";
import { RiOrganizationChart } from "react-icons/ri";
import { VscJson } from "react-icons/vsc";


const SideNav = ({isActive, toggleActive}) => {

    const sideRef = useRef(null);
    const collapse = () => {
        sideRef.current.classList.toggle('active')
    } 

    const mobilecollapse = () => {
        sideRef.current.classList.remove('active')

    } 

    const isMobileDevice = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    useEffect(() => {
        if (isActive) {
            sideRef.current.classList.add('active');
        } else {
            sideRef.current.classList.remove('active');
        }
    }, [isActive]);

    


    useEffect(() => {
        if (isMobileDevice()) {

            console.log("yes mobile")
            mobilecollapse();

           

        }else{console.log("not mobile")}



    }, []);

    
    
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
                <li>
                    <a href="#">
                        <HiVariable className="react-icons" />
                        <span className="links_name">Weather and API demo</span>
                    </a>
                    <span className="tooltips">Variables</span>
                </li>
                <li>
                    <a href="#">
                        <FaCodeBranch className="react-icons" />
                        <span className="links_name">Show Branches</span>
                    </a>
                    <span className="tooltips">Show Branches</span>
                </li>
                <li>
                    <a href="#">
                        <RiOrganizationChart className="react-icons" />
                        <span className="links_name">Tree View</span>
                    </a>
                    <span className="tooltips">Tree View</span>
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