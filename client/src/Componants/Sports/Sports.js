import React, { useState, useEffect, useRef } from 'react';

import '../CSS/Sports/Sports.css';
import Group from './Group'
import QuarterFinals from './QuarterFinals';
import SemiFinals from './semiFinals';
import Finals from './Finals'
import MatchTicker from './MatchTicker';
import MatchesTable from './MatchesTable'

const Sports = () => {

  

  return (
    <div className="Sports">
      <div className="SportsPanel">
        
        <MatchTicker team1="England" team2="New Zealand" dateAndTime="2023-08-14 - KO - 16:00" />

        <div className="infoPanel">

          <Group />

          <QuarterFinals />


          <SemiFinals />

          <Finals />

          <MatchesTable />



        </div>
      </div>
    </div>
  );
}

export default Sports;
