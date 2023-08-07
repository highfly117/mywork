import React, { useState, useEffect } from 'react';





const TeamRow = ({ team, isSelected, onTeamClick, teamSummaryData, selectedTeamFixtures }) => {

    console.log(selectedTeamFixtures)

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

    return (
        <React.Fragment>
          <tr onClick={() => onTeamClick(team)}>
            <td className={`tg-0la1 ${isSelected ? 'selected' : ''}`}>
              <img
                src={`https://flagpedia.net/data/flags/normal/${teamToCountryCode[team]}.png`}
                alt={`${team} flag`}
                className="flag-icon" // Optional: add a class for styling
              />
              {team}
            </td>
            {teamSummaryData ? (
              <>
                <td className="tg-0lax">{teamSummaryData.win}</td>
                <td className="tg-0lax">{teamSummaryData.draw}</td>
                <td className="tg-0lax">{teamSummaryData.loss}</td>
                <td className="tg-0lax">{teamSummaryData.for}</td>
                <td className="tg-0lax">{teamSummaryData.against}</td>
                <td className="tg-0lax">{teamSummaryData.ptsDiff}</td>
                <td className="tg-0lax">{teamSummaryData.bonus}</td>
                <td className="tg-0lax">{teamSummaryData.pts}</td>
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
              <td colSpan="9">
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
                        <td className="tg-0lax">{formatDate(fixture.date)}</td>
                        <td className="tg-0lax">{getTimeFromDateStr(fixture.date)}</td>
                        <td className="tg-0lax">{fixture.team}</td>
                        <td className="tg-0lax">{fixture.for}</td>
                        <td className="tg-0lax">{fixture.against}</td>
                        <td className="tg-0lax">{fixture.diff}</td>
                        <td className="tg-0lax">{fixture.bonus}</td>
                        <td className="tg-0lax">{fixture.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    };

export default TeamRow;