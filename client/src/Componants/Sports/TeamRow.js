import React, { useState, useEffect } from 'react';
import SportsModal from './SportsModal'
import {FcExpand} from 'react-icons/fc'

const TeamRow = ({ team, tableIndex, rowIndex, isSelected, onTeamClick, teamSummaryData, selectedTeamFixtures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const pastelColors = [
      '#4363d8', '#aaffc3',    // sky blue
      '#f58231', '#911eb4',    // soft pink
      '#E0F9B5', '#D8BFD8',    // thistle
      '#A0CBE8', '#FFDAB9'     // peach puff
  ];

    let rowStyle = {};

    if (rowIndex === 0) {
        rowStyle = { backgroundColor: pastelColors[tableIndex * 2] };  // use table index to determine the color
    } else if (rowIndex === 1) {
        rowStyle = { backgroundColor: pastelColors[tableIndex * 2 + 1] };
    }


    const getOrdinalSuffix = (day) => {
        if (day === 1 || day === 21 || day === 31) {
            return "st";
        } else if (day === 2 || day === 22) {
            return "nd";
        } else if (day === 3 || day === 23) {
            return "rd";
        } else {
            return "th";
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
        return formattedDate;
    };

    const getTimeFromDateStr = (dateStr) => {
        const date = new Date(dateStr);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    

    const handleDateClick = (fixtureData) => {
      
      setIsModalOpen(true);
  };


    return (
        <React.Fragment>
          <tr onClick={() => onTeamClick(team)}>
            <td style={rowStyle} className={`tg-0la1 ${isSelected ? 'selected' : ''}`}>
              <div>
              <img
                src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[team]}.png`}
                alt={`${team} flag`}
                className="flag-icon" // Optional: add a class for styling
              />
              {team}
              </div>
              <FcExpand></FcExpand>
            </td>
            {teamSummaryData ? (
              <>
                <td className="tg-0lax">{teamSummaryData.played}</td>
                <td className="tg-0lat1">{teamSummaryData.win}</td>
                <td className="tg-0lax">{teamSummaryData.draw}</td>
                <td className="tg-0lat3">{teamSummaryData.loss}</td>
                <td className="tg-0lax">{teamSummaryData.for}</td>
                <td className="tg-0lax">{teamSummaryData.against}</td>
                <td className="tg-0lax">{teamSummaryData.ptsDiff}</td>
                <td className="tg-0lax">{teamSummaryData.bonus}</td>
                <td className="tg-0lat8">{teamSummaryData.pts}</td>
              </>
            ) : (
              <>
                <td className="tg-0lax">Loading...</td>
                {/* Repeat this line for each column */}
              </>
            )}
          </tr>
          {isSelected && selectedTeamFixtures.length > 0 && (
            <tr>
              <td className='tablewrapper' colSpan="9">
                <table className="tg-fixtures">
                  <thead>
                    <tr>
                      <th className="tg-0pkt">Date</th>
                      <th className="tg-0pkt">KO</th>
                      <th className="tg-0pkt">Team</th>
                      <th className="tg-0pkt">For</th>
                      <th className="tg-0pkt">Against</th>
                      <th className="tg-0pkt">Diff</th>
                      <th className="tg-0pkt">Bonus</th>
                      <th className="tg-0pkt">Win/loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeamFixtures.map((fixture, idx) => (
                      <tr key={idx}>
                        <td className="tg-0la1" onClick={() => handleDateClick(fixture)}>{formatDate(fixture.dataTime)}</td>
                        <td className="tg-0lax">{getTimeFromDateStr(fixture.dataTime)}</td>
                        <td className="tg-0la3">
                          <img src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[fixture.opponent]}.png`} className="flag-icon" />
                          {fixture.opponent}
                        </td>
                        <td className="tg-0lax">{fixture.F === "" ? "0" : fixture.F}</td>
                        <td className="tg-0lax">{fixture.A === "" ? "0" : fixture.A}</td>
                        <td className="tg-0lax">{(fixture.F) - (fixture.A)}</td>
                        <td className="tg-0lax">{fixture.bonus}</td>
                        <td className="tg-0lax">{fixture.F === "" && fixture.A === "" ? "NP" : fixture.F > fixture.A ? 'Win' : fixture.F < fixture.A ? 'Loss' : 'Draw'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
          <SportsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </React.Fragment>
      );
    };

export default TeamRow;