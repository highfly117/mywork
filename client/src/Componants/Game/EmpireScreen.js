import React, { useState, useEffect, useRef, useCallback } from "react";


const EmpireScreen = () => {

    const [activeLocation, setActiveLocation] = useState(null);

    const handleClick = useCallback((location) => {
        setActiveLocation(location);
    }, [activeLocation]);


    return(

        <div className="GamePanel">

                    <div className="ResourceBar">
                        <div className="row resourceRow" style={{ marginBottom: "10px" }}>
                            <div className="material">Population 1000</div>
                            <div className="material">Credits 1000</div>
                            <div className="material">Research 1000</div>
                            <div className="material">Happiness 1000</div>
                            <div className="material">Shields 1000</div>
                            <div className="material">Armor 1000</div>
                            <div className="material">Storage 1000</div>
                        </div>
                        <div className="row resourceRow">
                            <div className="material">Iron 1000</div>
                            <div className="material">Carbon 1000</div>
                            <div className="material">Aluminum 1000</div>
                            <div className="material">Silicon 1000</div>
                            <div className="material">Chemicals 1000</div>
                            <div className="material">Ice 1000</div>

                            <div className="material">Glass 1000</div>
                            <div className="material">Steel 1000</div>
                            <div className="material">Electronics 1000</div>
                            <div className="material">Mech Parts 1000</div>
                            <div className="material">Food 1000</div>
                            <div className="material">Polymers 1000</div>
                        </div>
                    </div>
                    <div className="BuilidingPanel">
                        <div className="BuildLocations col-2">
                            <div className={`Locations${activeLocation === 'Planets' ? ' active' : ''}`} onClick={() => { handleClick('Planets') }} style={{ marginTop: "0px" }}>Planets</div>
                            <div className={`Locations${activeLocation === 'Stars' ? ' active' : ''}`} onClick={() => { handleClick('Stars') }}>Stars</div>
                            <div className={`Locations${activeLocation === 'Solar Objects' ? ' active' : ''}`} onClick={() => { handleClick('Solar Objects') }}>Solar Objects</div>
                            <div className={`Locations${activeLocation === 'Space Stations' ? ' active' : ''}`} onClick={() => { handleClick('Space Stations') }}>Space Stations</div>
                            <div className={`Locations${activeLocation === 'Fleets' ? ' active' : ''}`} onClick={() => { handleClick('Fleets') }}>Fleets</div>
                        </div>
                        <div className="Buildings col-10">

                            <div className="Planets">
                                <div className="PlanetWrapper">
                                    <div className="Planet" style={{ marginTop: "0px" }}>Mercury</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Venus</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Earth</div>
                                    <div className="IndustryWrapper">
                                    <div className="Industry">
                                        <div>
                                            <div>Automated Mine</div>
                                            <div>Cost: Credits: 240 Iron: 340</div>
                                        </div>
                                        <div className="buybutton">Build</div>
                                    </div>
                                    <div className="Industry">
                                        <div>
                                            <div>Finance Centre</div>
                                            <div>Cost: Credits: 240 Iron: 340</div>
                                        </div>
                                        <div className="buybutton">Build</div>
                                    </div>
                                    <div className="Industry">
                                        <div>
                                            <div>Research Lab</div>
                                            <div>Cost: Credits: 240 Iron: 340</div>
                                        </div>
                                        <div className="buybutton">Build</div>
                                    </div>
                                    <div className="Industry">
                                        <div>
                                            <div>Equipment  Factory</div>
                                            <div>Cost: Credits: 240 Iron: 340</div>
                                        </div>
                                        <div className="buybutton">Build</div>
                                    </div>
                                    <div className="Industry">
                                        <div>
                                            <div>Spaceship  Factory</div>
                                            <div>Cost: Credits: 240 Iron: 340</div>
                                        </div>
                                        <div className="buybutton">Build</div>
                                    </div>
                                    <div className="Industry">
                                        <div>
                                            <div>Weapon Factory</div>
                                            <div>Cost: Credits: 240 Iron: 340</div>
                                        </div>
                                        <div className="buybutton">Build</div>
                                    </div>
                                    
                                    </div>
                                </div>

                                <div className="PlanetWrapper">
                                    <div className="Planet">Mars</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Jupiter</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Saturn</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Uranus</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Neptune</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                                <div className="PlanetWrapper">
                                    <div className="Planet">Pluto</div>
                                    <div className="NoSurvey">
                                        <div>
                                            <div>No Survey Completed</div>
                                            <div></div>
                                        </div>
                                        <div className="buybutton">Start Survey</div>
                                    </div>
                                </div>
                            </div>



                        </div>

                    </div>


                </div>

    )


}

export default EmpireScreen