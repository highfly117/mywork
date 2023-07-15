import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from 'axios'
import TopBar from './TopBarold';
import GameSideBar from "./GameSideBar";
import EmpireScreen from "./EmpireScreen";
import CombatScreen from "./CombatScreen";


import "../CSS/Game/Game.css"

function Game() {
    const [ActiveScreen, SetActiveScreen] = useState(null)


    const ChangeActiveScreen = (Screen) => {
        SetActiveScreen(Screen);
    };

    useEffect(() => {



    }, [ActiveScreen])


    return (
        <div className="Game">
            <GameSideBar ScreenLoad={ActiveScreen} ChangeActiveScreen={ChangeActiveScreen} ></GameSideBar>
            <TopBar className="home_content"></TopBar>

            <div className="row GamePanels background" >
                {(() => {
                    switch (ActiveScreen) {
                        case null: return <div>Welcome to my site</div>;
                        case 'Combat': return <CombatScreen />;
                        case 'Empire': return <EmpireScreen />
                        default: return null;
                    }
                })()}

                


            </div>

        </div>

    );
}

export default Game;
