import React, { useState } from 'react';
import "../CSS/Mob/MapMenuMob.css"
import {AiOutlineMenu} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr' 

const MapMenu = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    props.setSelectedOption(option);
    setShowOptions(false); // This will close the menu
  };

  return (
    <div className="map-menu">
      <button onClick={handleButtonClick}>
        {showOptions ? <GrClose></GrClose> : <AiOutlineMenu></AiOutlineMenu>}
      </button>
      {showOptions && (
        <div className="map-menu-options">
          <button onClick={() => handleOptionClick('hourly')}>Hourly</button>
          <button onClick={() => handleOptionClick('3day')}>3 Day</button>
          <button className='disabled'>7 Day</button>
        </div>
      )}
    </div>
  );
};

export default MapMenu;
