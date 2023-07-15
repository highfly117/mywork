import React, { useEffect, useRef } from "react";
import "../CSS/Game/GameSideBar.css";
import Uploadbutton from "../Uploadbutton";
import { DiReact } from 'react-icons/di'
import { FaSpaceAwesome } from 'react-icons/fa6'
import { MdOutlineDesignServices } from 'react-icons/md'
import { GiMining, GiCircuitry, GiClayBrick, GiArchiveResearch, GiPlanetConquest } from 'react-icons/gi'
import { VscJson } from "react-icons/vsc";


const GameSideBar = ({ props, ChangeActiveScreen }) => {



    return (
        <div className="GameSideBar active">
            <div className="logo_content">
                <div className="logo">
                    <div className="logo_name"><DiReact size={"4rem"} />Empire 2099</div>
                </div>
            </div>
            <ul className="nav_list">
                <li onClick={() => { ChangeActiveScreen("Combat") }}>
                    <a href="#">
                        <FaSpaceAwesome className="react-icons FaSpaceAwesome" />
                        <span className="links_name">Combat</span>
                    </a>
                    <span className="tooltips">JSON</span>
                </li>
                <li onClick={() => { ChangeActiveScreen("Empire") }}>
                    <a href="#">
                        <GiPlanetConquest className="react-icons GiPlanetConquest" />
                        <span className="links_name">Empire</span>
                    </a>
                    <span className="tooltips">JSON</span>
                </li>
                <li onClick={() => { }}>
                    <a href="#">
                        <GiMining className="react-icons GiMining" onClick={() => { }} />
                        <span className="links_name">Mining</span>
                    </a>
                    <span className="tooltips">Variables</span>
                </li>
                <li onClick={() => { }}>
                    <a href="#">
                        <GiClayBrick className="react-icons GiClayBrick" />
                        <span className="links_name">Material Processing</span>
                    </a>
                    <span className="tooltips">Show Branches</span>
                </li>
                <li>
                    <a href="#">
                        <GiCircuitry className="react-icons GiCircuitry" />
                        <span className="links_name">Fabricating</span>
                    </a>
                    <span className="tooltips">Tree View</span>
                </li>
                <li>
                    <a href="#">
                        <GiArchiveResearch className="react-icons GiArchiveResearch" />
                        <span className="links_name">Research</span>
                    </a>
                    <span className="tooltips">JSON</span>
                </li>
                <li>
                    <a href="#">
                        <MdOutlineDesignServices className="react-icons MdOutlineDesignServices" />
                        <span className="links_name">Design</span>
                    </a>
                    <span className="tooltips">JSON</span>
                </li>
            </ul>
        </div>

    )
};




export default GameSideBar