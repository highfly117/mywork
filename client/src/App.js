import React, { useState, useEffect, useRef } from "react";
import SideNav from './Componants/SideNav'
import WeatherApp from "./Componants/WeatherApp";
import Game from "./Componants/Game/Game";
import FitnessQuest from "./Componants/Fitness/FitnessGame";
import Sports from "./Componants/Sports/Sports";


import './App.css';





function App() {
  const [panelLoad, SetPanelLoad] = useState(null)


  const changePanel = (panel) => {
    SetPanelLoad(panel);
  };

  useEffect(() => { }, [panelLoad])

  console.log(panelLoad)


  return (
    <div className="App">

      <SideNav panelLoad={panelLoad} changePanel={changePanel}></SideNav>
      {(() => {
        switch (panelLoad) {
          case null: return <div>Welcome to my site</div>;
          case 'Weather': return <WeatherApp />;
          case 'Game' : return <Game/>
          case 'Fitness' : return <FitnessQuest/>
          case 'Sports' : return <Sports/>
          default: return null;
        }
      })()}

    </div>

  );
}

export default App;
