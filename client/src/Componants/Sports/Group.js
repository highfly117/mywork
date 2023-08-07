import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamRow from './TeamRow';

import '../CSS/Sports/SportsGroup.css';



const calculateTeamSummary = (fixtures) => {
  let summary = {
    win: 0,
    draw: 0,
    loss: 0,
    for: 0,
    against: 0,
    ptsDiff: 0,
    bonus: 0,
    pts: 0
  };
  fixtures.forEach(fixture => {
    summary.for += fixture.F;
    summary.against += fixture.A;
    summary.ptsDiff += fixture.F - fixture.A;
    summary.bonus += fixture.bonus;
    if (fixture.F > fixture.A) {
      summary.win++;
      summary.pts += 4;
    } else if (fixture.F < fixture.A) {
      summary.loss++;
    } else {
      summary.draw++;
      summary.pts += 2;
    }
    summary.pts += summary.bonus
  });
  //console.log(summary)
  return summary;
};

const teamToCountryCode = {
  'New Zealand': 'nz',
  'France': 'fr',
  'Italy': 'it',
  'Uruguay': 'uy',
  'Namibia': 'na',
  'South Africa': 'za',
  'Ireland': 'ie',
  'Scotland': 'gb-sct',
  'Tonga': 'to',
  'Romania': 'ro',
  'Wales': 'gb-wls',
  'Australia': 'au',
  'Fiji': 'fj',
  'Georgia': 'ge',
  'Portugal': 'pt',
  'England': 'gb-eng',
  'Japan': 'jp',
  'Argentina': 'ar',
  'Samoa': 'ws',
  'Chile': 'cl',
};

function Group() {
  const [groupData, setGroupData] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamFixtures, setSelectedTeamFixtures] = useState([]);
  const [teamSummaryData, setTeamSummaryData] = useState({});


  useEffect(() => {
    const fetchGroupData = async () => {
      try {
       // const response = await axios.get('http://localhost:5000/api/v1/matches');
        const response = await axios.get(`https://express-api-git-master-highfly117.vercel.app/api/v1/matches
        setGroupData(response.data.groups);

        // Fetch summary data for all teams
        let newTeamSummaryData = {};
        for (const group in response.data.groups) {
          for (const team of response.data.groups[group]) {
            try {
              //const teamResponse = await axios.get(`http://localhost:5000/api/v1/matches/groups/${group}/${team}`);
              const teamResponse = await axios.get(`https://express-api-git-master-highfly117.vercel.app/api/v1/matches/groups/${group}/${team}`);
              newTeamSummaryData[team] = calculateTeamSummary(teamResponse.data);
            } catch (error) {
              console.error(`Error fetching team ${team} fixtures:`, error);
            }
          }
        }

        // Update the state
        setTeamSummaryData(newTeamSummaryData);

      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, []);

  useEffect(() => {
    console.log(selectedTeam);
  }, [selectedTeam]);


  if (!groupData) {
    return <div>Loading...</div>;
  }

  const findGroupByTeam = (team) => {
    // Loop through each group in groupData
    for (const group in groupData) {
      // Check if the team exists in the current group
      if (groupData[group].includes(team)) {
        return group; // Return the name of the group
      }
    }
    return null; // Return null if the team is not found in any group
  };




  const handleTeamClick = async (team) => {
    

    if (selectedTeam === team) {
      setSelectedTeam(null);
      setSelectedTeamFixtures([]);
    } else {
      setSelectedTeam(team);
      const group = findGroupByTeam(team);
      if (group) {
        try {
          //const response = await axios.get(`http://localhost:5000/api/v1/matches/groups/${group}/${team}`);
          const response = await axios.get(`https://express-api-git-master-highfly117.vercel.app/api/v1/matches/groups/${group}/${team}`);
          setSelectedTeamFixtures(response.data);
          //console.log('Group:', group);
          //console.log('Team:', team);
          //console.log(response.data);

          let teamSummary = calculateTeamSummary(response.data);
          let newTeamSummaryData = { ...teamSummaryData, [team]: teamSummary };

          setTeamSummaryData(newTeamSummaryData);
        } catch (error) {
          console.error('Error fetching team fixtures:', error);
        }
      } else {
        console.error(`Team "${team}" not found in any group.`);
      }
    }
  };


 return (
    <div className='Groups'>
      {Object.keys(groupData).map((group, index) => (
        <div key={index} className="table-container">
          <h2>Group {group}</h2>
          <table className="tg">
            <thead>
              <tr>
                <th className="tg-0pkt">Team</th>
                <th className="tg-0pkt">Win</th>
                <th className="tg-lboi">Draw</th>
                <th className="tg-0lax">Loss</th>
                <th className="tg-0lax">For</th>
                <th className="tg-0lax">Against</th>
                <th className="tg-0lax">Pts Diff</th>
                <th className="tg-0lax">Bonus</th>
                <th className="tg-0lax">pts</th>
              </tr>
            </thead>
            <tbody>
              {groupData[group].map((team, idx) => (
                <TeamRow 
                  key={idx} 
                  team={team} 
                  isSelected={selectedTeam === team} 
                  onTeamClick={handleTeamClick} 
                  teamSummaryData={teamSummaryData[team]} 
                  selectedTeamFixtures={selectedTeam === team ? selectedTeamFixtures : []} 
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}


export default Group;
