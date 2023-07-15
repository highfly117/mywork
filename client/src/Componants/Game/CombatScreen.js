import React, { useState, useEffect, useRef, useCallback } from "react";
import "../CSS//Game/CombatScreen.css"
import spaceshipIcon from '../../spaceship.png'
import ship1 from '../../Assets/cruiser_1_large.png'
import fighter2 from '../../Assets/fighter_2_large.png'
import { FaSpaceAwesome } from 'react-icons/fa6'
const CombatScreen = () => {




    return (

        <div className="GamePanel">
            <div className="CombatArea">
                <div className="CombatCard">
                    <div className="Wrapper">
                        <img className="spaceIcon" src={spaceshipIcon} ></img>
                        <div className="textWrapper">
                            <h4>Browse Combat Areas</h4>
                            <p>Standard Combat Training</p>
                            <p>Variables of Ships and Loot</p>
                        </div>
                    </div>
                </div>
                <div className="displayWrapper">

                    <div className="playerPanel">
                        <div className="barWrappers">
                            <div className="healthbar">
                                <div className="health" ></div>
                                <h3>75/100 HP</h3>
                            </div>
                            <div className="shieldBar">
                                <div className="Shield"></div>
                                <h3>27/100 SP</h3>
                            </div>
                        </div>
                        <div className="AttackandShipwrapper">
                            <div className="Attackgrid">
                                <h1>Attacks</h1>
                                <ul className="nav_list">
                                    <li>
                                        <a href="#">
                                            <span className="links_name">Lazer MK 1</span>
                                            <span className="Weapon_damage">5</span>
                                        </a>
                                        
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="links_name">Lazer MK 1</span>
                                            <span className="Weapon_damage">5 dmg</span>
                                        </a>
                                        
                                    </li>
                                </ul>
                            </div>

                            <div className="ShipGrid">
                                <img src={ship1}></img>
                                <img src={fighter2}></img>
                                <img src={fighter2}></img>
                            </div>

                        </div>



                    </div>
                    <div className="EnemyPanel"></div>
                </div>

            </div>



        </div>

    )


}

export default CombatScreen