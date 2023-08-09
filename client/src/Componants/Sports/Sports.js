import React, { useState, useEffect, useRef } from 'react';

import '../CSS/Sports/Sports.css';
import Group from './Group'
import QuarterFinals from './QuarterFinals';
import SemiFinals from './semiFinals';
import Finals from './Finals'

const Sports = () => {





  return (
    <div className="Sports">
      <div className="SportsPanel">
        <div className="infoPanel">

          <Group />

          <QuarterFinals />


          <SemiFinals />

          <Finals />



        </div>
      </div>
    </div>
  );
}

export default Sports;
